<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyAnalyticsController;
use App\Http\Controllers\TestDataController;
use App\Http\Controllers\SurveyController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Survey API Routes
Route::prefix('surveys')->group(function () {
    // 公開API（認証不要）
    Route::get('/', [SurveyController::class, 'index']); // アンケート一覧
    Route::get('/categories', [SurveyController::class, 'categories']); // カテゴリー一覧
    Route::get('/{id}', [SurveyController::class, 'show']); // アンケート詳細
    Route::get('/{id}/stats', [SurveyController::class, 'stats']); // アンケート統計
    Route::get('/dashboard/stats', [SurveyController::class, 'dashboardStats']); // ダッシュボード統計
    
    // 認証が必要なAPI
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/{id}/response', [SurveyController::class, 'submitResponse']); // 回答送信
        Route::get('/user/responses', [SurveyController::class, 'userResponses']); // ユーザーの回答履歴
    });
});

// Test Data API Routes (for development and demonstration)
Route::prefix('test-data')->group(function () {
    Route::get('/', [TestDataController::class, 'getTestData']);
    Route::get('/users', [TestDataController::class, 'getUsers']);
    Route::get('/surveys', [TestDataController::class, 'getSurveys']);
    Route::get('/categories', [TestDataController::class, 'getCategories']);
    Route::get('/responses', [TestDataController::class, 'getResponses']);
    Route::get('/analytics', [TestDataController::class, 'getAnalytics']);
    Route::get('/insights', [TestDataController::class, 'getInsights']);
    Route::get('/reports', [TestDataController::class, 'getReports']);
    Route::get('/dashboard', [TestDataController::class, 'getDashboardData']);
});

// Survey Analytics API Routes
Route::prefix('analytics')->middleware('auth:sanctum')->group(function () {
    // Dashboard and overview data
    Route::get('/dashboard', [SurveyAnalyticsController::class, 'getDashboardData']);
    
    // Survey-specific analytics
    Route::get('/survey/{surveyId}/analytics', [SurveyAnalyticsController::class, 'getSurveyAnalytics']);
    Route::get('/survey/{surveyId}/insights', [SurveyAnalyticsController::class, 'getSurveyInsights']);
    Route::get('/survey/{surveyId}/performance', [SurveyAnalyticsController::class, 'getSurveyPerformance']);
    Route::get('/survey/{surveyId}/filtered-data', [SurveyAnalyticsController::class, 'getFilteredSurveyData']);
    
    // Report generation
    Route::post('/survey/{surveyId}/generate-report', [SurveyAnalyticsController::class, 'generateReport']);
    Route::get('/report/{reportId}/download', [SurveyAnalyticsController::class, 'downloadReport'])
        ->name('analytics.download-report');
});
