<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * アンケート回答テーブルの作成マイグレーション
 * 
 * ユーザーのアンケート回答を格納するテーブル
 */
return new class extends Migration
{
    /**
     * マイグレーション実行
     */
    public function up(): void
    {
        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained()->onDelete('cascade'); // アンケートID
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ユーザーID
            $table->json('responses'); // 回答データ（JSON）
            $table->integer('completion_time')->nullable(); // 完了時間（秒）
            $table->timestamp('completed_at'); // 完了日時
            $table->timestamps();
            
            // インデックス
            $table->index(['survey_id', 'user_id']);
            $table->index('completed_at');
        });
    }

    /**
     * マイグレーションロールバック
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
    }
};
