<?php

// Vercel用の環境設定
if (getenv('VERCEL')) {
    // Vercel環境での設定
    $_ENV['APP_ENV'] = 'production';
    $_ENV['APP_DEBUG'] = 'false';
    $_ENV['APP_URL'] = 'https://survey-monitor-site.vercel.app';
    
    // データベース設定（PlanetScaleやSupabaseなど）
    $_ENV['DB_CONNECTION'] = 'mysql';
    $_ENV['DB_HOST'] = getenv('DB_HOST') ?: 'localhost';
    $_ENV['DB_PORT'] = getenv('DB_PORT') ?: '3306';
    $_ENV['DB_DATABASE'] = getenv('DB_DATABASE') ?: 'survey_monitor';
    $_ENV['DB_USERNAME'] = getenv('DB_USERNAME') ?: 'root';
    $_ENV['DB_PASSWORD'] = getenv('DB_PASSWORD') ?: '';
    
    // Redis設定（Upstashなど）
    $_ENV['REDIS_HOST'] = getenv('REDIS_HOST') ?: 'localhost';
    $_ENV['REDIS_PORT'] = getenv('REDIS_PORT') ?: '6379';
    $_ENV['REDIS_PASSWORD'] = getenv('REDIS_PASSWORD') ?: '';
    
    // セッション設定
    $_ENV['SESSION_DRIVER'] = 'file';
    $_ENV['CACHE_DRIVER'] = 'file';
}

// Laravelアプリケーションの起動
require_once __DIR__ . '/../vendor/autoload.php';

$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::capture();

$response = $kernel->handle($request);

$response->send();

$kernel->terminate($request, $response);
