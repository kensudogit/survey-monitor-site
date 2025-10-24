<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * ユーザーモデル
 * 
 * アンケートモニターサイトのユーザー情報を管理するモデルクラス
 * 認証機能、ポイント管理、収益管理などの機能を提供
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'name',           // ユーザー名
        'email',          // メールアドレス
        'password',       // パスワード
        'phone',          // 電話番号
        'birth_date',     // 生年月日
        'gender',         // 性別
        'points',         // 保有ポイント数
        'total_earnings', // 総収益額
        'status',         // アカウント状態
    ];

    /**
     * 非表示にする属性
     * 
     * @var array<string>
     */
    protected $hidden = [
        'password',        // パスワード
        'remember_token',  // リメンバートークン
    ];

    /**
     * 型キャスト設定
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',  // メール認証日時
        'password' => 'hashed',             // パスワードハッシュ化
        'birth_date' => 'date',             // 生年月日
        'total_earnings' => 'decimal:2',    // 総収益額（小数点以下2桁）
    ];

    /**
     * 作成したアンケートとの関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function surveys()
    {
        return $this->hasMany(Survey::class, 'created_by');
    }

    /**
     * 回答したアンケートとの関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }

    /**
     * ポイント取引履歴との関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pointsTransactions()
    {
        return $this->hasMany(PointsTransaction::class);
    }

    /**
     * 収益履歴との関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function earnings()
    {
        return $this->hasMany(Earning::class);
    }

    /**
     * 通知との関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
