<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'birth_date',
        'gender',
        'prefecture',
        'city',
        'occupation',
        'annual_income',
        'family_structure',
        'interests',
        'profile_image',
        'is_active',
        'points',
        'total_earnings',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'birth_date' => 'date',
        'interests' => 'array',
        'is_active' => 'boolean',
        'points' => 'integer',
        'total_earnings' => 'decimal:2',
        'last_login_at' => 'datetime',
    ];

    /**
     * Get the user's age
     */
    public function getAgeAttribute()
    {
        return $this->birth_date ? $this->birth_date->age : null;
    }

    /**
     * Get surveys that the user can participate in
     */
    public function availableSurveys()
    {
        return Survey::where('is_active', true)
            ->where(function ($query) {
                $query->where('target_gender', 'all')
                      ->orWhere('target_gender', $this->gender);
            })
            ->where(function ($query) {
                if ($this->age) {
                    $query->where(function ($q) {
                        $q->whereNull('target_age_min')
                          ->orWhere('target_age_min', '<=', $this->age);
                    })->where(function ($q) {
                        $q->whereNull('target_age_max')
                          ->orWhere('target_age_max', '>=', $this->age);
                    });
                }
            })
            ->where(function ($query) {
                if ($this->prefecture) {
                    $query->where(function ($q) {
                        $q->whereNull('target_prefectures')
                          ->orWhereJsonContains('target_prefectures', $this->prefecture);
                    });
                }
            })
            ->where('start_date', '<=', now())
            ->where(function ($query) {
                $query->whereNull('end_date')
                      ->orWhere('end_date', '>=', now());
            })
            ->where('current_responses', '<', 'max_responses')
            ->whereNotIn('id', $this->surveyResponses()->pluck('survey_id'));
    }

    /**
     * Get surveys that the user has responded to
     */
    public function surveyResponses()
    {
        return $this->hasMany(SurveyResponse::class);
    }

    /**
     * Get user's points history
     */
    public function pointsHistory()
    {
        return $this->hasMany(UserPointsHistory::class);
    }

    /**
     * Get user's earnings history
     */
    public function earningsHistory()
    {
        return $this->hasMany(UserEarningsHistory::class);
    }

    /**
     * Get user's notifications
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    /**
     * Add points to user
     */
    public function addPoints($points, $type = 'earned', $description = null, $surveyId = null)
    {
        $this->increment('points', $points);
        
        $this->pointsHistory()->create([
            'points' => $points,
            'type' => $type,
            'description' => $description,
            'survey_id' => $surveyId,
        ]);
    }

    /**
     * Add earnings to user
     */
    public function addEarnings($amount, $type = 'survey_reward', $description = null, $surveyId = null)
    {
        $this->increment('total_earnings', $amount);
        
        $this->earningsHistory()->create([
            'amount' => $amount,
            'type' => $type,
            'description' => $description,
            'survey_id' => $surveyId,
        ]);
    }
}

