<?php
// API Entry Point for Vercel
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the request URI
$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);

// Remove /api prefix
$path = str_replace('/api/', '', $path);

// Route to appropriate controller
switch ($path) {
    case 'test-data':
    case 'test-data/':
        include __DIR__ . '/test-data.php';
        break;
    case 'test-data/dashboard':
        include __DIR__ . '/test-data-dashboard.php';
        break;
    case 'test-data/users':
        include __DIR__ . '/test-data-users.php';
        break;
    case 'test-data/surveys':
        include __DIR__ . '/test-data-surveys.php';
        break;
    case 'test-data/categories':
        include __DIR__ . '/test-data-categories.php';
        break;
    case 'test-data/responses':
        include __DIR__ . '/test-data-responses.php';
        break;
    case 'test-data/analytics':
        include __DIR__ . '/test-data-analytics.php';
        break;
    case 'test-data/insights':
        include __DIR__ . '/test-data-insights.php';
        break;
    case 'test-data/reports':
        include __DIR__ . '/test-data-reports.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'API endpoint not found']);
        break;
}
