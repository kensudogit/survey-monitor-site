<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * ポイント取引モデル
 * 
 * ユーザーのポイント取引履歴を管理するモデルクラス
 * 獲得、消費、ボーナス、ペナルティなどの取引を記録
 */
class PointsTransaction extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'user_id',           // ユーザーID
        'survey_id',         // アンケートID（獲得時のみ）
        'points',            // ポイント数（正負の値）
        'transaction_type',  // 取引タイプ（earned, spent, bonus, penalty）
        'description',       // 取引説明
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

    /**
     * アンケートとの関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}
