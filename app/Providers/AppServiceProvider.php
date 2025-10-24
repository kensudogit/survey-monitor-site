<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

/**
 * アプリケーションサービスプロバイダー
 * 
 * アプリケーション全体のサービス登録とブートストラップ処理を管理
 * カスタムサービス、バインディング、設定の初期化を行う
 */
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}