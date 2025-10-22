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
        'client_name',
        'target_gender',
        'target_age_min',
        'target_age_max',
        'target_prefectures',
        'target_occupations',
        'target_income_ranges',
        'target_family_structures',
        'required_points',
        'reward_points',
        'reward_amount',
        'estimated_time',
        'max_responses',
        'current_responses',
        'start_date',
        'end_date',
        'is_active',
        'is_featured',
        'priority',
    ];

    protected $casts = [
        'target_prefectures' => 'array',
        'target_occupations' => 'array',
        'target_income_ranges' => 'array',
        'target_family_structures' => 'array',
        'required_points' => 'integer',
        'reward_points' => 'integer',
        'reward_amount' => 'decimal:2',
        'estimated_time' => 'integer',
        'max_responses' => 'integer',
        'current_responses' => 'integer',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'priority' => 'integer',
    ];

    /**
     * Get the category that owns the survey
     */
    public function category()
    {
        return $this->belongsTo(SurveyCategory::class);
    }

    /**
     * Get questions for this survey
     */
    public function questions()
    {
        return $this->hasMany(SurveyQuestion::class)->orderBy('sort_order');
    }

    /**
     * Get responses for this survey
     */
    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }

    /**
     * Scope for active surveys
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for featured surveys
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for available surveys (not expired and not full)
     */
    public function scopeAvailable($query)
    {
        return $query->where('start_date', '<=', now())
                    ->where(function ($q) {
                        $q->whereNull('end_date')
                          ->orWhere('end_date', '>=', now());
                    })
                    ->whereRaw('current_responses < max_responses');
    }

    /**
     * Scope for surveys matching user criteria
     */
    public function scopeForUser($query, User $user)
    {
        return $query->where(function ($q) use ($user) {
            $q->where('target_gender', 'all')
              ->orWhere('target_gender', $user->gender);
        })
        ->where(function ($q) use ($user) {
            if ($user->age) {
                $q->where(function ($subQ) use ($user) {
                    $subQ->whereNull('target_age_min')
                         ->orWhere('target_age_min', '<=', $user->age);
                })->where(function ($subQ) use ($user) {
                    $subQ->whereNull('target_age_max')
                         ->orWhere('target_age_max', '>=', $user->age);
                });
            }
        })
        ->where(function ($q) use ($user) {
            if ($user->prefecture) {
                $q->where(function ($subQ) use ($user) {
                    $subQ->whereNull('target_prefectures')
                         ->orWhereJsonContains('target_prefectures', $user->prefecture);
                });
            }
        });
    }

    /**
     * Increment response count
     */
    public function incrementResponses()
    {
        $this->increment('current_responses');
    }

    /**
     * Check if survey is available for user
     */
    public function isAvailableForUser(User $user)
    {
        // Check if user already responded
        if ($this->responses()->where('user_id', $user->id)->exists()) {
            return false;
        }

        // Check if survey is active and available
        if (!$this->is_active || $this->current_responses >= $this->max_responses) {
            return false;
        }

        // Check date range
        if ($this->start_date && $this->start_date > now()) {
            return false;
        }
        if ($this->end_date && $this->end_date < now()) {
            return false;
        }

        // Check target criteria
        if ($this->target_gender !== 'all' && $this->target_gender !== $user->gender) {
            return false;
        }

        if ($user->age) {
            if ($this->target_age_min && $user->age < $this->target_age_min) {
                return false;
            }
            if ($this->target_age_max && $user->age > $this->target_age_max) {
                return false;
            }
        }

        if ($user->prefecture && $this->target_prefectures) {
            if (!in_array($user->prefecture, $this->target_prefectures)) {
                return false;
            }
        }

        return true;
    }
}

