<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'question_text',
        'question_type',
        'options',
        'is_required',
        'sort_order',
        'validation_rules',
    ];

    protected $casts = [
        'options' => 'array',
        'is_required' => 'boolean',
        'sort_order' => 'integer',
        'validation_rules' => 'array',
    ];

    /**
     * Get the survey that owns the question
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * Get answers for this question
     */
    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class);
    }

    /**
     * Scope for ordered questions
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }

    /**
     * Get question type options
     */
    public static function getQuestionTypes()
    {
        return [
            'single_choice' => '単一選択',
            'multiple_choice' => '複数選択',
            'text' => 'テキスト入力',
            'rating' => '評価（5段階）',
            'date' => '日付',
            'number' => '数値',
            'file_upload' => 'ファイルアップロード',
        ];
    }
}

