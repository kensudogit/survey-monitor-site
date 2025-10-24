<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * アンケート洞察モデル
 * 
 * AI分析によるアンケートの洞察情報を管理するモデルクラス
 * 感情分析、行動パターン、推奨事項などのAI生成洞察を保持
 */
class SurveyInsight extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'survey_id',         // アンケートID
        'insight_type',      // 洞察タイプ（sentiment_analysis等）
        'title',             // 洞察タイトル
        'description',       // 洞察説明
        'confidence_score',  // 信頼度スコア
        'data_points',       // データポイント
        'recommendations',   // 推奨事項
        'generated_by_ai',   // AI生成フラグ
        'created_at',        // 作成日時
    ];

    /**
     * 型キャスト設定
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'data_points' => 'array',      // データポイント（配列）
        'recommendations' => 'array',  // 推奨事項（配列）
        'generated_by_ai' => 'boolean', // AI生成フラグ
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
}
