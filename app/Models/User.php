<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'birth_date',
        'gender',
        'points',
        'total_earnings',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'birth_date' => 'date',
        'total_earnings' => 'decimal:2',
    ];

    public function surveys()
    {
        return $this->hasMany(Survey::class, 'created_by');
    }

    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }

    public function pointsTransactions()
    {
        return $this->hasMany(PointsTransaction::class);
    }

    public function earnings()
    {
        return $this->hasMany(Earning::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
