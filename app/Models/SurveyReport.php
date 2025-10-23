<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'report_type',
        'title',
        'description',
        'file_path',
        'file_format',
        'generated_by',
        'parameters',
        'status',
        'generated_at',
    ];

    protected $casts = [
        'parameters' => 'array',
        'generated_at' => 'datetime',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function generator()
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
