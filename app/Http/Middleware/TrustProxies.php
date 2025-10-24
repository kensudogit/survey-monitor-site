<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

/**
 * プロキシ信頼ミドルウェア
 * 
 * リバースプロキシやロードバランサーからのリクエストを信頼するミドルウェア
 * HTTPS、クライアントIP、ホスト情報の正確な取得を可能にする
 */
class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * @var array<int, string>|string|null
     */
    protected $proxies;

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_AWS_ELB;
}
