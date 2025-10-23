<?php

namespace App\Http\Controllers;

use App\Services\SurveyAnalyticsService;
use App\Models\Survey;
use App\Models\SurveyAnalytics;
use App\Models\SurveyInsight;
use App\Models\SurveyReport;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class SurveyAnalyticsController extends Controller
{
    protected $analyticsService;

    public function __construct(SurveyAnalyticsService $analyticsService)
    {
        $this->analyticsService = $analyticsService;
    }

    /**
     * Get comprehensive analytics for a survey
     */
    public function getSurveyAnalytics($surveyId): JsonResponse
    {
        try {
            $analytics = $this->analyticsService->generateSurveyAnalytics($surveyId);
            
            return response()->json([
                'success' => true,
                'data' => $analytics,
                'message' => 'アンケート分析データを取得しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => '分析データの取得に失敗しました: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get AI-powered insights for a survey
     */
    public function getSurveyInsights($surveyId): JsonResponse
    {
        try {
            $insights = $this->analyticsService->generateInsights($surveyId);
            
            return response()->json([
                'success' => true,
                'data' => $insights,
                'message' => 'AI分析インサイトを生成しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'インサイト生成に失敗しました: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get survey performance metrics and KPIs
     */
    public function getSurveyPerformance($surveyId): JsonResponse
    {
        try {
            $performance = $this->analyticsService->getSurveyPerformanceMetrics($surveyId);
            
            return response()->json([
                'success' => true,
                'data' => $performance,
                'message' => 'パフォーマンス指標を取得しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'パフォーマンス指標の取得に失敗しました: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get real-time dashboard data
     */
    public function getDashboardData(): JsonResponse
    {
        try {
            $dashboardData = [
                'overview' => $this->getOverviewMetrics(),
                'recent_surveys' => $this->getRecentSurveys(),
                'top_performing_surveys' => $this->getTopPerformingSurveys(),
                'response_trends' => $this->getResponseTrends(),
                'demographic_insights' => $this->getDemographicInsights(),
                'ai_recommendations' => $this->getAIRecommendations(),
            ];

            return response()->json([
                'success' => true,
                'data' => $dashboardData,
                'message' => 'ダッシュボードデータを取得しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'ダッシュボードデータの取得に失敗しました: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate and download survey report
     */
    public function generateReport(Request $request, $surveyId): JsonResponse
    {
        try {
            $request->validate([
                'report_type' => 'required|in:pdf,excel,csv',
                'include_charts' => 'boolean',
                'include_insights' => 'boolean',
            ]);

            $survey = Survey::findOrFail($surveyId);
            $analytics = SurveyAnalytics::where('survey_id', $surveyId)->first();
            $insights = SurveyInsight::where('survey_id', $surveyId)->get();

            $reportData = [
                'survey' => $survey,
                'analytics' => $analytics,
                'insights' => $insights,
                'include_charts' => $request->boolean('include_charts', true),
                'include_insights' => $request->boolean('include_insights', true),
            ];

            $report = $this->generateReportFile($reportData, $request->report_type);
            
            return response()->json([
                'success' => true,
                'data' => [
                    'report_id' => $report->id,
                    'download_url' => route('analytics.download-report', $report->id),
                    'file_name' => $report->title,
                ],
                'message' => 'レポートを生成しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'レポート生成に失敗しました: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Download generated report
     */
    public function downloadReport($reportId)
    {
        $report = SurveyReport::findOrFail($reportId);
        
        if (!Storage::exists($report->file_path)) {
            abort(404, 'レポートファイルが見つかりません');
        }

        return Storage::download($report->file_path, $report->title . '.' . $report->file_format);
    }

    /**
     * Get filtered survey data with advanced segmentation
     */
    public function getFilteredSurveyData(Request $request, $surveyId): JsonResponse
    {
        try {
            $filters = $request->only([
                'date_range', 'demographics', 'response_quality', 
                'completion_status', 'sentiment', 'question_types'
            ]);

            $survey = Survey::findOrFail($surveyId);
            $query = $survey->responses()->with(['user', 'question']);

            // Apply filters
            if (isset($filters['date_range'])) {
                $query->whereBetween('created_at', [
                    $filters['date_range']['start'],
                    $filters['date_range']['end']
                ]);
            }

            if (isset($filters['demographics'])) {
                $query->whereHas('user', function ($q) use ($filters) {
                    if (isset($filters['demographics']['gender'])) {
                        $q->whereIn('gender', $filters['demographics']['gender']);
                    }
                    if (isset($filters['demographics']['age_range'])) {
                        $q->whereBetween('birth_date', [
                            $filters['demographics']['age_range']['min'],
                            $filters['demographics']['age_range']['max']
                        ]);
                    }
                });
            }

            $responses = $query->get();
            $analytics = $this->analyticsService->generateSurveyAnalytics($surveyId);

            return response()->json([
                'success' => true,
                'data' => [
                    'filtered_responses' => $responses,
                    'analytics' => $analytics,
                    'filter_summary' => $this->getFilterSummary($filters),
                ],
                'message' => 'フィルタリングされたデータを取得しました'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'データフィルタリングに失敗しました: ' . $e->getMessage()
            ], 500);
        }
    }

    private function getOverviewMetrics()
    {
        return [
            'total_surveys' => Survey::count(),
            'active_surveys' => Survey::where('status', 'active')->count(),
            'total_responses' => DB::table('survey_responses')->count(),
            'total_users' => DB::table('users')->count(),
            'average_completion_rate' => SurveyAnalytics::avg('completion_rate') ?? 0,
            'average_response_quality' => SurveyAnalytics::avg('response_quality_score') ?? 0,
        ];
    }

    private function getRecentSurveys()
    {
        return Survey::with(['category', 'responses'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($survey) {
                return [
                    'id' => $survey->id,
                    'title' => $survey->title,
                    'category' => $survey->category->name,
                    'response_count' => $survey->responses->count(),
                    'completion_rate' => $this->calculateCompletionRate($survey),
                    'created_at' => $survey->created_at,
                ];
            });
    }

    private function getTopPerformingSurveys()
    {
        return SurveyAnalytics::with('survey')
            ->orderBy('completion_rate', 'desc')
            ->orderBy('response_quality_score', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($analytics) {
                return [
                    'survey_id' => $analytics->survey_id,
                    'title' => $analytics->survey->title,
                    'completion_rate' => $analytics->completion_rate,
                    'quality_score' => $analytics->response_quality_score,
                    'total_responses' => $analytics->total_responses,
                ];
            });
    }

    private function getResponseTrends()
    {
        return DB::table('survey_responses')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    private function getDemographicInsights()
    {
        $users = DB::table('users')->select('gender', 'birth_date')->get();
        
        return [
            'gender_distribution' => $users->groupBy('gender')->map->count(),
            'age_distribution' => $this->getAgeDistribution($users),
        ];
    }

    private function getAIRecommendations()
    {
        $lowPerformingSurveys = SurveyAnalytics::where('completion_rate', '<', 70)
            ->with('survey')
            ->limit(3)
            ->get();

        return $lowPerformingSurveys->map(function ($analytics) {
            return [
                'survey_id' => $analytics->survey_id,
                'survey_title' => $analytics->survey->title,
                'issue' => '完了率が低い',
                'recommendation' => '質問数を減らし、インセンティブを増やすことを推奨します',
                'priority' => 'high',
            ];
        });
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
        
        return $totalUsers > 0 ? ($completedResponses / $totalUsers) * 100 : 0;
    }

    private function getAgeDistribution($users)
    {
        return $users->groupBy(function ($user) {
            if (!$user->birth_date) return 'unknown';
            
            $age = \Carbon\Carbon::parse($user->birth_date)->age;
            if ($age < 20) return 'under_20';
            if ($age < 30) return '20s';
            if ($age < 40) return '30s';
            if ($age < 50) return '40s';
            if ($age < 60) return '50s';
            return 'over_60';
        })->map->count();
    }

    private function generateReportFile($reportData, $format)
    {
        $fileName = 'survey_report_' . $reportData['survey']->id . '_' . time();
        $filePath = 'reports/' . $fileName . '.' . $format;

        // Create report record
        $report = SurveyReport::create([
            'survey_id' => $reportData['survey']->id,
            'report_type' => $format,
            'title' => $reportData['survey']->title . ' レポート',
            'description' => 'アンケート分析レポート',
            'file_path' => $filePath,
            'file_format' => $format,
            'generated_by' => auth()->id(),
            'parameters' => $reportData,
            'status' => 'generating',
        ]);

        // Generate file content based on format
        $content = $this->generateReportContent($reportData, $format);
        
        // Save file
        Storage::put($filePath, $content);
        
        // Update report status
        $report->update(['status' => 'completed']);

        return $report;
    }

    private function generateReportContent($reportData, $format)
    {
        switch ($format) {
            case 'csv':
                return $this->generateCSVContent($reportData);
            case 'excel':
                return $this->generateExcelContent($reportData);
            case 'pdf':
                return $this->generatePDFContent($reportData);
            default:
                throw new \InvalidArgumentException('Unsupported report format');
        }
    }

    private function generateCSVContent($reportData)
    {
        $csv = "Survey ID,Question ID,Question Text,Answer,User ID,Response Date\n";
        
        foreach ($reportData['survey']->responses as $response) {
            $csv .= sprintf(
                "%s,%s,%s,%s,%s,%s\n",
                $response->survey_id,
                $response->question_id,
                $response->question->question_text,
                $response->answer,
                $response->user_id,
                $response->created_at
            );
        }
        
        return $csv;
    }

    private function generateExcelContent($reportData)
    {
        // Simplified Excel generation - in production, use PhpSpreadsheet
        return $this->generateCSVContent($reportData);
    }

    private function generatePDFContent($reportData)
    {
        // Simplified PDF generation - in production, use DomPDF or similar
        $html = "<h1>{$reportData['survey']->title}</h1>";
        $html .= "<p>Description: {$reportData['survey']->description}</p>";
        
        if ($reportData['analytics']) {
            $html .= "<h2>Analytics</h2>";
            $html .= "<p>Total Responses: {$reportData['analytics']->total_responses}</p>";
            $html .= "<p>Completion Rate: {$reportData['analytics']->completion_rate}%</p>";
        }
        
        return $html;
    }

    private function getFilterSummary($filters)
    {
        $summary = [];
        
        if (isset($filters['date_range'])) {
            $summary['date_range'] = $filters['date_range'];
        }
        
        if (isset($filters['demographics'])) {
            $summary['demographics'] = $filters['demographics'];
        }
        
        return $summary;
    }
}
