<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * アンケートモデル
 * 
 * アンケートの基本情報と関連データを管理
 */
class Survey extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'category_id',
        'points',
        'duration_minutes',
        'max_responses',
        'current_responses',
        'status',
        'start_date',
        'end_date',
        'image_url',
        'is_featured',
        'created_by',
    ];

    /**
     * 属性のキャスト
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'points' => 'integer',
        'duration_minutes' => 'integer',
        'max_responses' => 'integer',
        'current_responses' => 'integer',
        'is_featured' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    /**
     * アンケート質問とのリレーション
     * 
     * @return HasMany
     */
    public function questions(): HasMany
    {
        return $this->hasMany(SurveyQuestion::class);
    }

    /**
     * アンケート回答とのリレーション
     * 
     * @return HasMany
     */
    public function responses(): HasMany
    {
        return $this->hasMany(SurveyResponse::class);
    }

    /**
     * アンケートカテゴリーとのリレーション
     * 
     * @return BelongsTo
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(SurveyCategory::class, 'category_id');
    }

    /**
     * アクティブなアンケートのみを取得するスコープ
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * カテゴリー別でアンケートを取得するスコープ
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $categoryId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, int $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    /**
     * 回答数を取得
     * 
     * @return int
     */
    public function getResponseCountAttribute(): int
    {
        return $this->responses()->count();
    }

    /**
     * 完了率を取得
     * 
     * @return float
     */
    public function getCompletionRateAttribute(): float
    {
        // 仮の計算（実際の実装では適切なロジックを実装）
        return min(100, $this->response_count * 10);
    }
}