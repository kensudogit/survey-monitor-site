<?php
// Test Data Dashboard API Endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Load test data
$testDataPath = __DIR__ . '/test-data.json';

if (!file_exists($testDataPath)) {
    http_response_code(404);
    echo json_encode(['error' => 'Test data not found']);
    exit;
}

$testData = json_decode(file_get_contents($testDataPath), true);

// Generate dashboard data
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
    'topCategories' => getTopCategories($testData),
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

echo json_encode($dashboardData);

function getTopCategories($testData) {
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
