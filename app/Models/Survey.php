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
        'category',
        'points',
        'estimated_time',
        'image_url',
        'questions',
        'status',
    ];

    /**
     * 属性のキャスト
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'questions' => 'array',
        'points' => 'integer',
        'estimated_time' => 'integer',
    ];

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
        return $this->belongsTo(SurveyCategory::class, 'category', 'name');
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
     * @param string $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
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