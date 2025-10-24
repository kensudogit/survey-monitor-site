<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

/**
 * メンテナンスモード制御ミドルウェア
 * 
 * メンテナンスモード中にリクエストを制限するミドルウェア
 * 特定のURIは除外してメンテナンス中でもアクセス可能にする
 */
class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}
