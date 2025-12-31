<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * アンケート回答モデル
 * 
 * ユーザーのアンケート回答データを管理
 */
class SurveyResponse extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'survey_id',
        'user_id',
        'question_id',
        'answer',
    ];

    /**
     * 属性のキャスト
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'responses' => 'array',
        'completion_time' => 'integer',
        'completed_at' => 'datetime',
    ];

    /**
     * アンケートとのリレーション
     * 
     * @return BelongsTo
     */
    public function survey(): BelongsTo
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * ユーザーとのリレーション
     * 
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * 質問とのリレーション
     * 
     * @return BelongsTo
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(SurveyQuestion::class);
    }

    /**
     * 完了時間を分単位で取得
     * 
     * @return float|null
     */
    public function getCompletionTimeInMinutesAttribute(): ?float
    {
        return $this->completion_time ? round($this->completion_time / 60, 2) : null;
    }
}