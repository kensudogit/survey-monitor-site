<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

/**
 * クッキー暗号化ミドルウェア
 * 
 * クッキーの暗号化・復号化を処理するミドルウェア
 * セキュリティ向上のためクッキー値を自動暗号化
 */
class EncryptCookies extends Middleware
{
    /**
     * The names of the cookies that should not be encrypted.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}
