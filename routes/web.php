<?php

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/surveys', function () {
    return view('surveys.index');
})->name('surveys.index');

Route::get('/surveys/{id}', function ($id) {
    return view('surveys.show', compact('id'));
})->name('surveys.show');

Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::get('/register', function () {
    return view('auth.register');
})->name('register');

Route::post('/logout', function () {
    return redirect('/');
})->name('logout');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
    
    Route::get('/profile', function () {
        return view('profile');
    })->name('profile');
    
    Route::post('/surveys/{id}/respond', function ($id) {
        return redirect('/surveys/' . $id)->with('success', 'アンケートに回答しました！');
    })->name('surveys.respond');
});