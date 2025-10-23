<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyInsight extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'insight_type',
        'title',
        'description',
        'confidence_score',
        'data_points',
        'recommendations',
        'generated_by_ai',
        'created_at',
    ];

    protected $casts = [
        'data_points' => 'array',
        'recommendations' => 'array',
        'generated_by_ai' => 'boolean',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
}
