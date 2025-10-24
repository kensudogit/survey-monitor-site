<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * アンケートテーブルの作成マイグレーション
 * 
 * アンケートの基本情報を格納するテーブル
 */
return new class extends Migration
{
    /**
     * マイグレーション実行
     */
    public function up(): void
    {
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // アンケートタイトル
            $table->text('description'); // アンケート説明
            $table->string('category'); // カテゴリー
            $table->integer('points'); // 獲得ポイント
            $table->integer('estimated_time'); // 推定所要時間（分）
            $table->string('image_url')->nullable(); // 画像URL
            $table->json('questions'); // 質問データ（JSON）
            $table->enum('status', ['active', 'inactive', 'draft'])->default('active'); // ステータス
            $table->timestamps();
            
            // インデックス
            $table->index(['status', 'category']);
            $table->index('created_at');
        });
    }

    /**
     * マイグレーションロールバック
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
