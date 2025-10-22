<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

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

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_featured' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(SurveyCategory::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }

    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }
}
