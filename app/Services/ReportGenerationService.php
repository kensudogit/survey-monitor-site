<?php

namespace App\Services;

use App\Models\Survey;
use App\Models\SurveyReport;
use App\Models\SurveyAnalytics;
use App\Models\SurveyInsight;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

/**
 * レポート生成サービス
 * 
 * アンケート分析レポートの自動生成を行うサービスクラス
 * PDF、Excel、CSV、JSON形式でのレポート生成とスケジュール機能を提供
 */
class ReportGenerationService
{
    public function generateComprehensiveReport($surveyId, $format = 'pdf', $options = [])
    {
        $survey = Survey::with(['category', 'questions', 'responses.user'])->findOrFail($surveyId);
        $analytics = SurveyAnalytics::where('survey_id', $surveyId)->first();
        $insights = SurveyInsight::where('survey_id', $surveyId)->get();

        $reportData = [
            'survey' => $survey,
            'analytics' => $analytics,
            'insights' => $insights,
            'options' => $options,
            'generated_at' => now(),
        ];

        $fileName = 'survey_report_' . $surveyId . '_' . time();
        $filePath = 'reports/' . $fileName . '.' . $format;

        // Create report record
        $report = SurveyReport::create([
            'survey_id' => $surveyId,
            'report_type' => $format,
            'title' => $survey->title . ' - 包括的分析レポート',
            'description' => 'Domo.AI パワード アンケート分析レポート',
            'file_path' => $filePath,
            'file_format' => $format,
            'generated_by' => auth()->id(),
            'parameters' => $options,
            'status' => 'generating',
        ]);

        try {
            $content = $this->generateReportContent($reportData, $format);
            Storage::put($filePath, $content);
            
            $report->update(['status' => 'completed']);
            
            return $report;
        } catch (\Exception $e) {
            $report->update(['status' => 'failed']);
            throw $e;
        }
    }

    private function generateReportContent($reportData, $format)
    {
        switch ($format) {
            case 'csv':
                return $this->generateCSVReport($reportData);
            case 'excel':
                return $this->generateExcelReport($reportData);
            case 'pdf':
                return $this->generatePDFReport($reportData);
            case 'json':
                return $this->generateJSONReport($reportData);
            default:
                throw new \InvalidArgumentException('Unsupported report format: ' . $format);
        }
    }

    private function generateCSVReport($reportData)
    {
        $csv = "Survey Report: {$reportData['survey']->title}\n";
        $csv .= "Generated: {$reportData['generated_at']}\n\n";
        
        // Survey Overview
        $csv .= "SURVEY OVERVIEW\n";
        $csv .= "Title,{$reportData['survey']->title}\n";
        $csv .= "Description,{$reportData['survey']->description}\n";
        $csv .= "Category,{$reportData['survey']->category->name}\n";
        $csv .= "Points,{$reportData['survey']->points}\n";
        $csv .= "Duration,{$reportData['survey']->duration_minutes} minutes\n";
        $csv .= "Status,{$reportData['survey']->status}\n";
        $csv .= "Created,{$reportData['survey']->created_at}\n\n";

        // Analytics Summary
        if ($reportData['analytics']) {
            $csv .= "ANALYTICS SUMMARY\n";
            $csv .= "Total Responses,{$reportData['analytics']->total_responses}\n";
            $csv .= "Completion Rate,{$reportData['analytics']->completion_rate}%\n";
            $csv .= "Average Completion Time,{$reportData['analytics']->average_completion_time} minutes\n";
            $csv .= "Response Quality Score,{$reportData['analytics']->response_quality_score}\n\n";
        }

        // Question Analysis
        $csv .= "QUESTION ANALYSIS\n";
        $csv .= "Question ID,Question Text,Question Type,Response Count,Most Common Answer\n";
        
        foreach ($reportData['survey']->questions as $question) {
            $responses = $reportData['survey']->responses->where('question_id', $question->id);
            $mostCommonAnswer = $responses->pluck('answer')->mode()->first() ?? 'N/A';
            
            $csv .= "{$question->id},\"{$question->question_text}\",{$question->question_type},{$responses->count()},\"{$mostCommonAnswer}\"\n";
        }

        $csv .= "\n";

        // Individual Responses
        $csv .= "INDIVIDUAL RESPONSES\n";
        $csv .= "Response ID,User ID,Question ID,Question Text,Answer,Response Date\n";
        
        foreach ($reportData['survey']->responses as $response) {
            $question = $reportData['survey']->questions->find($response->question_id);
            $csv .= "{$response->id},{$response->user_id},{$response->question_id},\"{$question->question_text}\",\"{$response->answer}\",{$response->created_at}\n";
        }

        return $csv;
    }

    private function generateExcelReport($reportData)
    {
        // For a full implementation, use PhpSpreadsheet
        // This is a simplified version that generates CSV format
        return $this->generateCSVReport($reportData);
    }

    private function generatePDFReport($reportData)
    {
        $html = $this->generateHTMLReport($reportData);
        
        // For a full implementation, use DomPDF or similar
        // This is a simplified version that returns HTML
        return $html;
    }

    private function generateJSONReport($reportData)
    {
        return json_encode([
            'report_metadata' => [
                'title' => $reportData['survey']->title . ' - Analysis Report',
                'generated_at' => $reportData['generated_at'],
                'format' => 'json',
                'version' => '1.0',
            ],
            'survey' => [
                'id' => $reportData['survey']->id,
                'title' => $reportData['survey']->title,
                'description' => $reportData['survey']->description,
                'category' => $reportData['survey']->category->name,
                'points' => $reportData['survey']->points,
                'duration_minutes' => $reportData['survey']->duration_minutes,
                'status' => $reportData['survey']->status,
                'created_at' => $reportData['survey']->created_at,
            ],
            'analytics' => $reportData['analytics'] ? [
                'total_responses' => $reportData['analytics']->total_responses,
                'completion_rate' => $reportData['analytics']->completion_rate,
                'average_completion_time' => $reportData['analytics']->average_completion_time,
                'response_quality_score' => $reportData['analytics']->response_quality_score,
                'demographic_breakdown' => $reportData['analytics']->demographic_breakdown,
                'question_analytics' => $reportData['analytics']->question_analytics,
                'sentiment_analysis' => $reportData['analytics']->sentiment_analysis,
                'trend_data' => $reportData['analytics']->trend_data,
            ] : null,
            'insights' => $reportData['insights']->map(function ($insight) {
                return [
                    'type' => $insight->insight_type,
                    'title' => $insight->title,
                    'description' => $insight->description,
                    'confidence_score' => $insight->confidence_score,
                    'recommendations' => $insight->recommendations,
                    'generated_by_ai' => $insight->generated_by_ai,
                ];
            }),
            'questions' => $reportData['survey']->questions->map(function ($question) {
                return [
                    'id' => $question->id,
                    'text' => $question->question_text,
                    'type' => $question->question_type,
                    'options' => $question->options,
                    'is_required' => $question->is_required,
                    'order_index' => $question->order_index,
                ];
            }),
            'responses' => $reportData['survey']->responses->map(function ($response) {
                return [
                    'id' => $response->id,
                    'user_id' => $response->user_id,
                    'question_id' => $response->question_id,
                    'answer' => $response->answer,
                    'created_at' => $response->created_at,
                ];
            }),
        ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    }

    private function generateHTMLReport($reportData)
    {
        $html = '<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . htmlspecialchars($reportData['survey']->title) . ' - Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; background: #f8f9fa; border-radius: 8px; text-align: center; min-width: 120px; }
        .metric-value { font-size: 24px; font-weight: bold; color: #667eea; }
        .metric-label { font-size: 12px; color: #666; margin-top: 5px; }
        .insight { background: #e8f4fd; border-left: 4px solid #2196F3; padding: 15px; margin: 10px 0; }
        .recommendation { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f8f9fa; font-weight: bold; }
        .chart-placeholder { background: #f8f9fa; border: 2px dashed #ccc; padding: 40px; text-align: center; margin: 20px 0; }
    </style>
</head>
<body>';

        // Header
        $html .= '<div class="header">
            <h1>' . htmlspecialchars($reportData['survey']->title) . '</h1>
            <p>Domo.AI パワード アンケート分析レポート</p>
            <p>生成日時: ' . $reportData['generated_at']->format('Y年m月d日 H:i') . '</p>
        </div>';

        // Survey Overview
        $html .= '<div class="section">
            <h2>📊 アンケート概要</h2>
            <table>
                <tr><th>項目</th><th>値</th></tr>
                <tr><td>タイトル</td><td>' . htmlspecialchars($reportData['survey']->title) . '</td></tr>
                <tr><td>説明</td><td>' . htmlspecialchars($reportData['survey']->description) . '</td></tr>
                <tr><td>カテゴリ</td><td>' . htmlspecialchars($reportData['survey']->category->name) . '</td></tr>
                <tr><td>ポイント</td><td>' . $reportData['survey']->points . 'pt</td></tr>
                <tr><td>所要時間</td><td>' . $reportData['survey']->duration_minutes . '分</td></tr>
                <tr><td>ステータス</td><td>' . $reportData['survey']->status . '</td></tr>
                <tr><td>作成日</td><td>' . $reportData['survey']->created_at->format('Y年m月d日') . '</td></tr>
            </table>
        </div>';

        // Analytics Summary
        if ($reportData['analytics']) {
            $html .= '<div class="section">
                <h2>📈 分析サマリー</h2>
                <div class="metric">
                    <div class="metric-value">' . $reportData['analytics']->total_responses . '</div>
                    <div class="metric-label">総回答数</div>
                </div>
                <div class="metric">
                    <div class="metric-value">' . number_format($reportData['analytics']->completion_rate, 1) . '%</div>
                    <div class="metric-label">完了率</div>
                </div>
                <div class="metric">
                    <div class="metric-value">' . number_format($reportData['analytics']->average_completion_time, 1) . '分</div>
                    <div class="metric-label">平均完了時間</div>
                </div>
                <div class="metric">
                    <div class="metric-value">' . number_format($reportData['analytics']->response_quality_score, 1) . '</div>
                    <div class="metric-label">品質スコア</div>
                </div>
            </div>';
        }

        // AI Insights
        if ($reportData['insights']->count() > 0) {
            $html .= '<div class="section">
                <h2>🤖 AI インサイト</h2>';
            
            foreach ($reportData['insights'] as $insight) {
                $html .= '<div class="insight">
                    <h3>' . htmlspecialchars($insight->title) . '</h3>
                    <p>' . htmlspecialchars($insight->description) . '</p>
                    <p><strong>信頼度:</strong> ' . $insight->confidence_score . '%</p>';
                
                if ($insight->recommendations) {
                    $html .= '<h4>推奨事項:</h4><ul>';
                    foreach ($insight->recommendations as $recommendation) {
                        $html .= '<li>' . htmlspecialchars($recommendation) . '</li>';
                    }
                    $html .= '</ul>';
                }
                
                $html .= '</div>';
            }
            
            $html .= '</div>';
        }

        // Question Analysis
        $html .= '<div class="section">
            <h2>❓ 質問分析</h2>
            <table>
                <tr><th>質問ID</th><th>質問文</th><th>タイプ</th><th>回答数</th><th>最も多い回答</th></tr>';
        
        foreach ($reportData['survey']->questions as $question) {
            $responses = $reportData['survey']->responses->where('question_id', $question->id);
            $mostCommonAnswer = $responses->pluck('answer')->mode()->first() ?? 'N/A';
            
            $html .= '<tr>
                <td>' . $question->id . '</td>
                <td>' . htmlspecialchars($question->question_text) . '</td>
                <td>' . $question->question_type . '</td>
                <td>' . $responses->count() . '</td>
                <td>' . htmlspecialchars($mostCommonAnswer) . '</td>
            </tr>';
        }
        
        $html .= '</table></div>';

        // Response Trend Chart Placeholder
        $html .= '<div class="section">
            <h2>📊 回答トレンド</h2>
            <div class="chart-placeholder">
                <p>📈 チャート表示エリア</p>
                <p>実際の実装では、Chart.js や D3.js を使用してグラフを生成します</p>
            </div>
        </div>';

        $html .= '</body></html>';
        
        return $html;
    }

    public function generateAutomatedReports()
    {
        $surveys = Survey::where('status', 'active')
            ->where('created_at', '>=', now()->subDays(7))
            ->get();

        $reports = [];
        
        foreach ($surveys as $survey) {
            try {
                $report = $this->generateComprehensiveReport($survey->id, 'pdf', [
                    'automated' => true,
                    'include_charts' => true,
                    'include_insights' => true,
                ]);
                
                $reports[] = $report;
            } catch (\Exception $e) {
                \Log::error("Failed to generate automated report for survey {$survey->id}: " . $e->getMessage());
            }
        }

        return $reports;
    }

    public function scheduleReportGeneration($surveyId, $schedule)
    {
        // This would integrate with Laravel's task scheduling
        // For now, we'll just log the request
        \Log::info("Scheduled report generation for survey {$surveyId} with schedule: " . json_encode($schedule));
        
        return true;
    }
}
