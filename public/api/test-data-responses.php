<?php
// Test Data Responses API Endpoint
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$testDataPath = __DIR__ . '/test-data.json';

if (!file_exists($testDataPath)) {
    http_response_code(404);
    echo json_encode(['error' => 'Test data not found']);
    exit;
}

$testData = json_decode(file_get_contents($testDataPath), true);
echo json_encode($testData['survey_responses'] ?? []);
