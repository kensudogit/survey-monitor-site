<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * アンケートレポートモデル
 * 
 * アンケートの分析レポートを管理するモデルクラス
 * PDF、Excel、CSVなどの形式で生成されたレポート情報を保持
 */
class SurveyReport extends Model
{
    use HasFactory;

    /**
     * 一括代入可能な属性
     * 
     * @var array<string>
     */
    protected $fillable = [
        'survey_id',      // アンケートID
        'report_type',    // レポートタイプ（comprehensive等）
        'title',          // レポートタイトル
        'description',    // レポート説明
        'file_path',      // ファイルパス
        'file_format',    // ファイル形式（PDF、Excel等）
        'generated_by',   // 生成者ID
        'parameters',     // 生成パラメータ
        'status',         // 生成状態
        'generated_at',   // 生成日時
    ];

    /**
     * 型キャスト設定
     * 
     * @var array<string, string>
     */
    protected $casts = [
        'parameters' => 'array',     // 生成パラメータ（配列）
        'generated_at' => 'datetime', // 生成日時
    ];

    /**
     * アンケートとの関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    /**
     * 生成者との関連
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function generator()
    {
        return $this->belongsTo(User::class, 'generated_by');
    }
}
