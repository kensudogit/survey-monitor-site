<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/surveys', [HomeController::class, 'surveys'])->name('surveys.index');
Route::get('/survey/{survey}', [HomeController::class, 'showSurvey'])->name('survey.show');

// Authentication routes
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Protected routes
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [DashboardController::class, 'profile'])->name('profile');
    Route::post('/profile', [DashboardController::class, 'updateProfile']);
    Route::get('/points-history', [DashboardController::class, 'pointsHistory'])->name('points.history');
    Route::get('/earnings-history', [DashboardController::class, 'earningsHistory'])->name('earnings.history');
    
    // Survey routes
    Route::post('/survey/{survey}/start', [SurveyController::class, 'start'])->name('survey.start');
    Route::get('/survey/{survey}/take', [SurveyController::class, 'take'])->name('survey.take');
    Route::post('/survey/{survey}/submit', [SurveyController::class, 'submit'])->name('survey.submit');
    Route::get('/survey/{survey}/completed', [SurveyController::class, 'completed'])->name('survey.completed');
});

