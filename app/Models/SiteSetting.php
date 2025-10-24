<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * サイト設定モデル
 * 
 * サイト全体の設定情報を管理するモデルクラス
 * サイト名、ポイント設定、制限値などの設定を保持
 */
class SiteSetting extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'key_name',    // 設定キー名
        'value',       // 設定値
        'description', // 設定説明
    ];
}
