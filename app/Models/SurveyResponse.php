<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'survey_id',
        'status',
        'started_at',
        'completed_at',
        'total_time_spent',
        'points_earned',
        'amount_earned',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'total_time_spent' => 'integer',
        'points_earned' => 'integer',
        'amount_earned' => 'decimal:2',
    ];

    /**
     * Get the user that owns the response
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the survey that owns the response
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * Get answers for this response
     */
    public function answers()
    {
        return $this->hasMany(SurveyAnswer::class);
    }

    /**
     * Mark response as completed
     */
    public function markAsCompleted()
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
            'total_time_spent' => $this->started_at->diffInSeconds(now()),
        ]);

        // Award points and earnings to user
        if ($this->points_earned > 0) {
            $this->user->addPoints($this->points_earned, 'earned', 'アンケート回答報酬', $this->survey_id);
        }

        if ($this->amount_earned > 0) {
            $this->user->addEarnings($this->amount_earned, 'survey_reward', 'アンケート回答報酬', $this->survey_id);
        }

        // Increment survey response count
        $this->survey->incrementResponses();
    }

    /**
     * Get completion percentage
     */
    public function getCompletionPercentageAttribute()
    {
        $totalQuestions = $this->survey->questions()->count();
        $answeredQuestions = $this->answers()->count();
        
        return $totalQuestions > 0 ? round(($answeredQuestions / $totalQuestions) * 100, 2) : 0;
    }

    /**
     * Scope for completed responses
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope for in progress responses
     */
    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }
}

