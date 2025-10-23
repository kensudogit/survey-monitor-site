<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SurveyAnalyticsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

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
