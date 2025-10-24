<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * アンケート質問モデル
 * 
 * アンケートの質問情報を管理するモデルクラス
 * 質問文、質問タイプ、選択肢、必須フラグなどの情報を保持
 */
class SurveyQuestion extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'survey_id',      // アンケートID
        'question_text',  // 質問文
        'question_type',  // 質問タイプ（text, radio, checkbox等）
        'options',        // 選択肢（JSON形式）
        'is_required',    // 必須回答フラグ
        'order_index',    // 表示順序
    ];

    /**
     * 型キャスト設定
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'options' => 'array',        // 選択肢を配列として扱う
        'is_required' => 'boolean',  // 必須フラグ
    ];

    /**
     * アンケートとの関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * 回答との関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }
}
