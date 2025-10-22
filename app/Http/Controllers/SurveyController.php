<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SurveyController extends Controller
{
    public function index()
    {
        $surveys = \App\Models\Survey::with('category')
            ->where('status', 'active')
            ->orderBy('is_featured', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        $categories = \App\Models\SurveyCategory::where('is_active', true)->get();

        return view('surveys.index', compact('surveys', 'categories'));
    }

    public function show($id)
    {
        $survey = \App\Models\Survey::with(['category', 'questions'])
            ->where('id', $id)
            ->where('status', 'active')
            ->firstOrFail();

        return view('surveys.show', compact('survey'));
    }

    public function respond(Request $request, $id)
    {
        $survey = \App\Models\Survey::findOrFail($id);
        
        // Validate responses
        $request->validate([
            'responses' => 'required|array',
            'responses.*' => 'required'
        ]);

        // Save responses
        foreach ($request->responses as $questionId => $answer) {
            \App\Models\SurveyResponse::create([
                'survey_id' => $survey->id,
                'user_id' => auth()->id(),
                'question_id' => $questionId,
                'answer' => $answer
            ]);
        }

        // Award points
        \App\Models\PointsTransaction::create([
            'user_id' => auth()->id(),
            'survey_id' => $survey->id,
            'points' => $survey->points,
            'transaction_type' => 'earned',
            'description' => "アンケート「{$survey->title}」への回答"
        ]);

        // Update user points
        $user = auth()->user();
        $user->increment('points', $survey->points);

        return redirect()->route('surveys.show', $id)
            ->with('success', 'アンケートに回答しました！' . $survey->points . 'ポイントを獲得しました。');
    }
}
