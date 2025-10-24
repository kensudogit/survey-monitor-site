<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TestDataController extends Controller
{
    /**
     * テストデータを取得
     */
    public function getTestData(): JsonResponse
    {
        $testDataPath = public_path('api/test-data.json');
        
        if (!file_exists($testDataPath)) {
            return response()->json(['error' => 'Test data not found'], 404);
        }
        
        $testData = json_decode(file_get_contents($testDataPath), true);
        
        return response()->json($testData);
    }
    
    /**
     * ユーザーデータを取得
     */
    public function getUsers(): JsonResponse
    {
        $testData = $this->loadTestData();
        return response()->json($testData['users'] ?? []);
    }
    
    /**
     * アンケートデータを取得
     */
    public function getSurveys(): JsonResponse
    {
        $testData = $this->loadTestData();
        return response()->json($testData['surveys'] ?? []);
    }
    
    /**
     * カテゴリーデータを取得
     */
    public function getCategories(): JsonResponse
    {
        $testData = $this->loadTestData();
        return response()->json($testData['survey_categories'] ?? []);
    }
    
    /**
     * アンケート回答データを取得
     */
    public function getResponses(): JsonResponse
    {
        $testData = $this->loadTestData();
        return response()->json($testData['survey_responses'] ?? []);
    }
    
    /**
     * 分析データを取得
     */
    public function getAnalytics(): JsonResponse
    {
        $testData = $this->loadTestData();
        return response()->json($testData['survey_analytics'] ?? []);
    }
    
    /**
     * AI洞察データを取得
     */
    public function getInsights(): JsonResponse
    {
        $testData = $this->loadTestData();
        return response()->json($testData['survey_insights'] ?? []);
    }
    
    /**
     * レポートデータを取得
     */
    public function getReports(): JsonResponse
    {
        $testData = $this->loadTestData();
        return response()->json($testData['survey_reports'] ?? []);
    }
    
    /**
     * ダッシュボードデータを取得
     */
    public function getDashboardData(): JsonResponse
    {
        $testData = $this->loadTestData();
        
        $dashboardData = [
            'overview' => [
                'totalUsers' => count($testData['users'] ?? []),
                'totalSurveys' => count($testData['surveys'] ?? []),
                'totalResponses' => count($testData['survey_responses'] ?? []),
                'totalPoints' => array_sum(array_column($testData['users'] ?? [], 'points')),
                'completionRate' => 85.2,
                'averageRating' => 4.2
            ],
            'recentSurveys' => array_slice($testData['surveys'] ?? [], 0, 5),
            'topCategories' => $this->getTopCategories($testData),
            'aiInsights' => array_slice($testData['survey_insights'] ?? [], 0, 3),
            'analytics' => $testData['survey_analytics'] ?? [],
            'charts' => [
                'responseTrend' => [
                    ['label' => '1月', 'value' => 120],
                    ['label' => '2月', 'value' => 150],
                    ['label' => '3月', 'value' => 180],
                    ['label' => '4月', 'value' => 200],
                    ['label' => '5月', 'value' => 220]
                ],
                'categoryDistribution' => [
                    ['label' => 'テクノロジー', 'value' => 35],
                    ['label' => 'ショッピング', 'value' => 25],
                    ['label' => 'ビジネス', 'value' => 20],
                    ['label' => 'ライフスタイル', 'value' => 15],
                    ['label' => 'その他', 'value' => 5]
                ],
                'satisfactionScore' => [
                    ['label' => '非常に満足', 'value' => 45],
                    ['label' => '満足', 'value' => 35],
                    ['label' => '普通', 'value' => 15],
                    ['label' => '不満', 'value' => 3],
                    ['label' => '非常に不満', 'value' => 2]
                ]
            ]
        ];
        
        return response()->json($dashboardData);
    }
    
    /**
     * テストデータを読み込み
     */
    private function loadTestData(): array
    {
        $testDataPath = public_path('api/test-data.json');
        
        if (!file_exists($testDataPath)) {
            return [];
        }
        
        return json_decode(file_get_contents($testDataPath), true);
    }
    
    /**
     * トップカテゴリーを取得
     */
    private function getTopCategories(array $testData): array
    {
        $categories = $testData['survey_categories'] ?? [];
        $surveys = $testData['surveys'] ?? [];
        
        $categoryCounts = [];
        foreach ($surveys as $survey) {
            $categoryId = $survey['category_id'];
            if (!isset($categoryCounts[$categoryId])) {
                $categoryCounts[$categoryId] = 0;
            }
            $categoryCounts[$categoryId]++;
        }
        
        $topCategories = [];
        foreach ($categories as $category) {
            $count = $categoryCounts[$category['id']] ?? 0;
            $topCategories[] = [
                'id' => $category['id'],
                'name' => $category['name'],
                'count' => $count,
                'color' => $category['color'],
                'icon' => $category['icon']
            ];
        }
        
        usort($topCategories, function($a, $b) {
            return $b['count'] - $a['count'];
        });
        
        return array_slice($topCategories, 0, 5);
    }
}
