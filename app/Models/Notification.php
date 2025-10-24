<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 通知モデル
 * 
 * ユーザーへの通知情報を管理するモデルクラス
 * アンケート通知、システム通知、お知らせなどの情報を保持
 */
class Notification extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'user_id',    // ユーザーID
        'title',      // 通知タイトル
        'message',    // 通知メッセージ
        'type',       // 通知タイプ（info, success, warning, error）
        'is_read',    // 既読フラグ
    ];

    /**
     * 型キャスト設定
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'is_read' => 'boolean',  // 既読フラグ
    ];

    /**
     * ユーザーとの関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
