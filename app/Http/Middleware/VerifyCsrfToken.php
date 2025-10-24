<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

/**
 * CSRFトークン検証ミドルウェア
 * 
 * CSRF攻撃を防ぐためのトークン検証を行うミドルウェア
 * POST、PUT、DELETEリクエストのCSRFトークンを検証
 */
class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}
