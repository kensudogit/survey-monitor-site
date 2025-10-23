<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyAnalytics extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'total_responses',
        'completion_rate',
        'average_completion_time',
        'response_quality_score',
        'demographic_breakdown',
        'question_analytics',
        'sentiment_analysis',
        'trend_data',
        'generated_at',
    ];

    protected $casts = [
        'demographic_breakdown' => 'array',
        'question_analytics' => 'array',
        'sentiment_analysis' => 'array',
        'trend_data' => 'array',
        'generated_at' => 'datetime',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}
