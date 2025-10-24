<?php

namespace App\Services;

use App\Models\Survey;
use App\Models\SurveyAnalytics;
use App\Models\SurveyInsight;
use App\Models\SurveyResponse;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

/**
 * アンケート分析サービス
 * 
 * アンケートの包括的な分析処理を行うサービスクラス
 * 完了率計算、品質スコア算出、感情分析、AI洞察生成などの機能を提供
 */
class SurveyAnalyticsService
{
    public function generateSurveyAnalytics($surveyId)
    {
        $survey = Survey::with(['responses', 'questions', 'responses.user'])->findOrFail($surveyId);
        
        $analytics = [
            'total_responses' => $survey->responses->count(),
            'completion_rate' => $this->calculateCompletionRate($survey),
            'average_completion_time' => $this->calculateAverageCompletionTime($survey),
            'response_quality_score' => $this->calculateResponseQualityScore($survey),
            'demographic_breakdown' => $this->getDemographicBreakdown($survey),
            'question_analytics' => $this->getQuestionAnalytics($survey),
            'sentiment_analysis' => $this->performSentimentAnalysis($survey),
            'trend_data' => $this->getTrendData($survey),
        ];

        return SurveyAnalytics::updateOrCreate(
            ['survey_id' => $surveyId],
            array_merge($analytics, ['generated_at' => now()])
        );
    }

    private function calculateCompletionRate($survey)
    {
        $totalQuestions = $survey->questions->count();
        if ($totalQuestions === 0) return 0;

        $completedResponses = $survey->responses()
            ->select('user_id')
            ->groupBy('user_id')
            ->havingRaw('COUNT(*) = ?', [$totalQuestions])
            ->count();

        $totalUsers = $survey->responses()->distinct('user_id')->count();
        
        if ($totalUsers > 0) {
            return ($completedResponses / $totalUsers) * 100;
        }
        return 0;
    }

    private function calculateAverageCompletionTime($survey)
    {
        $completionTimes = $survey->responses()
            ->select('user_id', DB::raw('MIN(created_at) as start_time'), DB::raw('MAX(created_at) as end_time'))
            ->groupBy('user_id')
            ->get()
            ->map(function ($response) {
                return Carbon::parse($response->end_time)->diffInMinutes(Carbon::parse($response->start_time));
            });

        $average = $completionTimes->avg();
        return $average ?? 0;
    }

    private function calculateResponseQualityScore($survey)
    {
        $qualityFactors = [
            'completion_rate' => $this->calculateCompletionRate($survey),
            'response_length' => $this->calculateAverageResponseLength($survey),
            'response_consistency' => $this->calculateResponseConsistency($survey),
        ];

        return array_sum($qualityFactors) / count($qualityFactors);
    }

    private function calculateAverageResponseLength($survey)
    {
        $textResponses = $survey->responses()
            ->whereIn('question_id', $survey->questions()->whereIn('question_type', ['text', 'textarea'])->pluck('id'))
            ->get()
            ->pluck('answer')
            ->filter()
            ->map(function ($answer) {
                return strlen($answer);
            });

        return $textResponses->avg() ?? 0;
    }

    private function calculateResponseConsistency($survey)
    {
        // Calculate consistency based on similar responses across users
        $consistencyScore = 0;
        $totalQuestions = $survey->questions->count();
        
        foreach ($survey->questions as $question) {
            if (in_array($question->question_type, ['radio', 'select', 'rating'])) {
                $responses = $survey->responses()->where('question_id', $question->id)->pluck('answer');
                $responseCounts = $responses->countBy();
                $maxCount = $responseCounts->max();
                $totalResponses = $responses->count();
                
                if ($totalResponses > 0) {
                    $consistencyScore += ($maxCount / $totalResponses) * 100;
                }
            }
        }

        return $totalQuestions > 0 ? $consistencyScore / $totalQuestions : 0;
    }

    private function getDemographicBreakdown($survey)
    {
        $users = User::whereIn('id', $survey->responses()->distinct('user_id')->pluck('user_id'))->get();
        
        return [
            'gender' => $users->groupBy('gender')->map->count(),
            'age_groups' => $this->getAgeGroups($users),
            'registration_period' => $this->getRegistrationPeriods($users),
        ];
    }

    private function getAgeGroups($users)
    {
        return $users->groupBy(function ($user) {
            if (!$user->birth_date) return 'unknown';
            
            $age = Carbon::parse($user->birth_date)->age;
            if ($age < 20) return 'under_20';
            if ($age < 30) return '20s';
            if ($age < 40) return '30s';
            if ($age < 50) return '40s';
            if ($age < 60) return '50s';
            return 'over_60';
        })->map->count();
    }

    private function getRegistrationPeriods($users)
    {
        return $users->groupBy(function ($user) {
            $monthsAgo = Carbon::parse($user->created_at)->diffInMonths(now());
            if ($monthsAgo < 1) return 'last_month';
            if ($monthsAgo < 3) return 'last_3_months';
            if ($monthsAgo < 6) return 'last_6_months';
            if ($monthsAgo < 12) return 'last_year';
            return 'over_year';
        })->map->count();
    }

    private function getQuestionAnalytics($survey)
    {
        $questionAnalytics = [];

        foreach ($survey->questions as $question) {
            $responses = $survey->responses()->where('question_id', $question->id)->get();
            
            $analytics = [
                'question_id' => $question->id,
                'question_text' => $question->question_text,
                'question_type' => $question->question_type,
                'response_count' => $responses->count(),
                'response_rate' => $responses->count() / $survey->responses()->distinct('user_id')->count() * 100,
            ];

            if (in_array($question->question_type, ['radio', 'select', 'checkbox', 'rating'])) {
                $analytics['answer_distribution'] = $responses->pluck('answer')->countBy();
                $analytics['most_common_answer'] = $responses->pluck('answer')->mode()->first();
            }

            if ($question->question_type === 'rating') {
                $ratings = $responses->pluck('answer')->filter()->map(function ($rating) {
                    return (float) $rating;
                });
                $analytics['average_rating'] = $ratings->avg();
                $analytics['rating_distribution'] = $ratings->countBy();
            }

            $questionAnalytics[] = $analytics;
        }

        return $questionAnalytics;
    }

    private function performSentimentAnalysis($survey)
    {
        $textResponses = $survey->responses()
            ->whereIn('question_id', $survey->questions()->whereIn('question_type', ['text', 'textarea'])->pluck('id'))
            ->pluck('answer')
            ->filter();

        // Simple sentiment analysis based on Japanese keywords
        $positiveKeywords = ['良い', '満足', '素晴らしい', '便利', '使いやすい', 'おすすめ', '気に入り', '最高'];
        $negativeKeywords = ['悪い', '不満', '不便', '使いにくい', '問題', '困る', '最悪', '嫌い'];

        $sentimentScores = $textResponses->map(function ($response) use ($positiveKeywords, $negativeKeywords) {
            $positiveCount = 0;
            $negativeCount = 0;

            foreach ($positiveKeywords as $keyword) {
                $positiveCount += substr_count($response, $keyword);
            }

            foreach ($negativeKeywords as $keyword) {
                $negativeCount += substr_count($response, $keyword);
            }

            if ($positiveCount > $negativeCount) return 'positive';
            if ($negativeCount > $positiveCount) return 'negative';
            return 'neutral';
        });

        return [
            'positive' => $sentimentScores->filter(function ($sentiment) { return $sentiment === 'positive'; })->count(),
            'negative' => $sentimentScores->filter(function ($sentiment) { return $sentiment === 'negative'; })->count(),
            'neutral' => $sentimentScores->filter(function ($sentiment) { return $sentiment === 'neutral'; })->count(),
            'total_text_responses' => $textResponses->count(),
        ];
    }

    private function getTrendData($survey)
    {
        $responses = $survey->responses()
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return [
            'daily_responses' => $responses->pluck('count', 'date'),
            'total_responses_over_time' => $responses->cumsum('count'),
        ];
    }

    public function generateInsights($surveyId)
    {
        $analytics = SurveyAnalytics::where('survey_id', $surveyId)->first();
        if (!$analytics) {
            $analytics = $this->generateSurveyAnalytics($surveyId);
        }

        $insights = [];

        // Completion rate insight
        if ($analytics->completion_rate < 70) {
            $insights[] = [
                'survey_id' => $surveyId,
                'insight_type' => 'completion_rate',
                'title' => '完了率が低いです',
                'description' => "現在の完了率は{$analytics->completion_rate}%です。質問数を減らすか、インセンティブを増やすことを検討してください。",
                'confidence_score' => 85,
                'data_points' => ['completion_rate' => $analytics->completion_rate],
                'recommendations' => [
                    '質問数を10問以下に減らす',
                    'ポイントを20%増加させる',
                    '完了時間を5分以内に設定する'
                ],
                'generated_by_ai' => true,
            ];
        }

        // Response quality insight
        if ($analytics->response_quality_score < 60) {
            $insights[] = [
                'survey_id' => $surveyId,
                'insight_type' => 'response_quality',
                'title' => '回答品質が低いです',
                'description' => "回答品質スコアが{$analytics->response_quality_score}点です。質問の明確化や回答オプションの改善が必要です。",
                'confidence_score' => 80,
                'data_points' => ['quality_score' => $analytics->response_quality_score],
                'recommendations' => [
                    '質問文をより具体的にする',
                    '回答オプションを明確にする',
                    '必須回答を適切に設定する'
                ],
                'generated_by_ai' => true,
            ];
        }

        // Demographic insight
        $demographics = $analytics->demographic_breakdown;
        if (isset($demographics['gender'])) {
            $totalGender = array_sum($demographics['gender']);
            foreach ($demographics['gender'] as $gender => $count) {
                $percentage = ($count / $totalGender) * 100;
                if ($percentage > 70) {
                    $insights[] = [
                        'survey_id' => $surveyId,
                        'insight_type' => 'demographic_bias',
                        'title' => '回答者の性別に偏りがあります',
                        'description' => "回答者の{$percentage}%が{$gender}です。より多様な回答を得るために、ターゲット層を拡大することを検討してください。",
                        'confidence_score' => 75,
                        'data_points' => ['gender_distribution' => $demographics['gender']],
                        'recommendations' => [
                            '異なるチャネルでのプロモーション',
                            'インセンティブの調整',
                            'ターゲット層の見直し'
                        ],
                        'generated_by_ai' => true,
                    ];
                    break;
                }
            }
        }

        // Save insights
        foreach ($insights as $insight) {
            SurveyInsight::create($insight);
        }

        return $insights;
    }

    public function getSurveyPerformanceMetrics($surveyId)
    {
        $survey = Survey::findOrFail($surveyId);
        $analytics = SurveyAnalytics::where('survey_id', $surveyId)->first();

        return [
            'survey_id' => $surveyId,
            'survey_title' => $survey->title,
            'total_responses' => $analytics->total_responses ?? 0,
            'completion_rate' => $analytics->completion_rate ?? 0,
            'average_completion_time' => $analytics->average_completion_time ?? 0,
            'response_quality_score' => $analytics->response_quality_score ?? 0,
            'sentiment_score' => $this->calculateSentimentScore($analytics->sentiment_analysis ?? []),
            'response_trend' => $analytics->trend_data['daily_responses'] ?? [],
            'insights_count' => SurveyInsight::where('survey_id', $surveyId)->count(),
            'last_updated' => $analytics->generated_at ?? null,
        ];
    }

    private function calculateSentimentScore($sentimentAnalysis)
    {
        if (empty($sentimentAnalysis) || $sentimentAnalysis['total_text_responses'] === 0) {
            return 50; // Neutral
        }

        $positive = $sentimentAnalysis['positive'] ?? 0;
        $negative = $sentimentAnalysis['negative'] ?? 0;
        $total = $sentimentAnalysis['total_text_responses'];

        return (($positive - $negative) / $total) * 100 + 50;
    }
}
