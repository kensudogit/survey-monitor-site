<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

/**
 * ブロードキャストサービスプロバイダー
 * 
 * リアルタイム通信機能を管理するプロバイダー
 * WebSocket、Pusher、Redisなどのブロードキャスト設定を初期化
 */
class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Broadcast::routes();

        require base_path('routes/channels.php');
    }
}
