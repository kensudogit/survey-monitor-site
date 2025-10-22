<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\SurveyResponse;
use App\Models\SurveyAnswer;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{
    /**
     * Start a survey
     */
    public function start(Survey $survey)
    {
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'アンケートに参加するにはログインが必要です。');
        }

        $user = Auth::user();

        if (!$survey->isAvailableForUser($user)) {
            return redirect()->back()->with('error', 'このアンケートに参加できません。');
        }

        // Check if user already has a response
        $response = SurveyResponse::where('user_id', $user->id)
            ->where('survey_id', $survey->id)
            ->first();

        if ($response) {
            if ($response->status === 'completed') {
                return redirect()->back()->with('error', 'このアンケートは既に回答済みです。');
            }
            return redirect()->route('survey.take', $survey);
        }

        // Create new response
        $response = SurveyResponse::create([
            'user_id' => $user->id,
            'survey_id' => $survey->id,
            'status' => 'in_progress',
        ]);

        return redirect()->route('survey.take', $survey);
    }

    /**
     * Take a survey
     */
    public function take(Survey $survey)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $response = SurveyResponse::where('user_id', $user->id)
            ->where('survey_id', $survey->id)
            ->first();

        if (!$response || $response->status === 'completed') {
            return redirect()->route('surveys.index')->with('error', 'アンケートが見つかりません。');
        }

        $survey->load('questions.options');
        $answers = $response->answers()->get()->keyBy('question_id');

        return view('surveys.take', compact('survey', 'response', 'answers'));
    }

    /**
     * Submit survey answers
     */
    public function submit(Request $request, Survey $survey)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $response = SurveyResponse::where('user_id', $user->id)
            ->where('survey_id', $survey->id)
            ->first();

        if (!$response || $response->status === 'completed') {
            return redirect()->route('surveys.index')->with('error', 'アンケートが見つかりません。');
        }

        $validator = $this->validateSurveyAnswers($request, $survey);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Save answers
        foreach ($survey->questions as $question) {
            $answerValue = $request->input('question_' . $question->id);
            
            if ($answerValue !== null) {
                SurveyAnswer::updateOrCreate(
                    [
                        'response_id' => $response->id,
                        'question_id' => $question->id,
                    ],
                    [
                        'answer_text' => is_string($answerValue) ? $answerValue : null,
                        'answer_value' => is_array($answerValue) ? $answerValue : null,
                    ]
                );
            }
        }

        // Mark as completed and award points
        $response->update([
            'status' => 'completed',
            'completed_at' => now(),
            'total_time_spent' => $response->started_at->diffInSeconds(now()),
            'points_earned' => $survey->reward_points,
            'amount_earned' => $survey->reward_amount,
        ]);

        $response->markAsCompleted();

        return redirect()->route('survey.completed', $survey)
            ->with('success', 'アンケートが完了しました！' . $survey->reward_points . 'ポイントを獲得しました。');
    }

    /**
     * Show completed survey page
     */
    public function completed(Survey $survey)
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        $response = SurveyResponse::where('user_id', $user->id)
            ->where('survey_id', $survey->id)
            ->where('status', 'completed')
            ->first();

        if (!$response) {
            return redirect()->route('surveys.index');
        }

        return view('surveys.completed', compact('survey', 'response'));
    }

    /**
     * Validate survey answers
     */
    private function validateSurveyAnswers(Request $request, Survey $survey)
    {
        $rules = [];
        $messages = [];

        foreach ($survey->questions as $question) {
            $fieldName = 'question_' . $question->id;
            
            if ($question->is_required) {
                $rules[$fieldName] = 'required';
                $messages[$fieldName . '.required'] = 'この質問は必須です。';
            } else {
                $rules[$fieldName] = 'nullable';
            }

            // Add specific validation based on question type
            switch ($question->question_type) {
                case 'single_choice':
                    $rules[$fieldName] .= '|in:' . implode(',', array_keys($question->options ?? []));
                    break;
                case 'multiple_choice':
                    $rules[$fieldName] .= '|array';
                    $rules[$fieldName . '.*'] = 'in:' . implode(',', array_keys($question->options ?? []));
                    break;
                case 'rating':
                    $rules[$fieldName] .= '|integer|min:1|max:5';
                    break;
                case 'number':
                    $rules[$fieldName] .= '|numeric';
                    break;
                case 'date':
                    $rules[$fieldName] .= '|date';
                    break;
            }
        }

        return \Illuminate\Support\Facades\Validator::make($request->all(), $rules, $messages);
    }
}

