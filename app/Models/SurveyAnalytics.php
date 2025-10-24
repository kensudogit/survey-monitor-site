<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * アンケート分析モデル
 * 
 * アンケートの分析データを管理するモデルクラス
 * 完了率、品質スコア、感情分析、トレンドデータなどの分析結果を保持
 */
class SurveyAnalytics extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'survey_id',                // アンケートID
        'total_responses',          // 総回答数
        'completion_rate',          // 完了率
        'average_completion_time',  // 平均完了時間
        'response_quality_score',   // 回答品質スコア
        'demographic_breakdown',    // デモグラフィック分析
        'question_analytics',       // 質問別分析
        'sentiment_analysis',       // 感情分析
        'trend_data',               // トレンドデータ
        'generated_at',             // 生成日時
    ];

    /**
     * 型キャスト設定
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'demographic_breakdown' => 'array',  // デモグラフィック分析（配列）
        'question_analytics' => 'array',     // 質問別分析（配列）
        'sentiment_analysis' => 'array',     // 感情分析（配列）
        'trend_data' => 'array',             // トレンドデータ（配列）
        'generated_at' => 'datetime',        // 生成日時
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
