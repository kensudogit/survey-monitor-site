<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 収益モデル
 * 
 * ユーザーの収益情報を管理するモデルクラス
 * 銀行振込、PayPal、ギフトカードなどの支払い方法と状態を管理
 */
class Earning extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'user_id',         // ユーザーID
        'amount',          // 金額
        'currency',        // 通貨（JPY等）
        'payment_method',  // 支払い方法（bank_transfer, paypal, gift_card）
        'status',          // 支払い状態（pending, processing, completed, failed）
        'transaction_id', // 取引ID
        'processed_at',    // 処理日時
    ];

    /**
     * 型キャスト設定
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'amount' => 'decimal:2',      // 金額（小数点以下2桁）
        'processed_at' => 'datetime',  // 処理日時
    ];

    /**
     * ユーザーとの関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
