<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;

/**
 * 文字列トリムミドルウェア
 * 
 * リクエストデータの文字列から前後の空白を自動削除するミドルウェア
 * パスワードフィールドなど特定の属性は除外して処理
 */
class TrimStrings extends Middleware
{
    /**
     * The names of the attributes that should not be trimmed.
     *
     * @var array<int, string>
     */
    protected $except = [
        'current_password',
        'password',
        'password_confirmation',
    ];
}
