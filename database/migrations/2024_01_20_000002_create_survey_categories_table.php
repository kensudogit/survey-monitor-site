<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * アンケートカテゴリーテーブルの作成マイグレーション
 * 
 * アンケートのカテゴリー情報を格納するテーブル
 */
return new class extends Migration
{
    /**
     * マイグレーション実行
     */
    public function up(): void
    {
        Schema::create('survey_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // カテゴリー名
            $table->string('slug')->unique(); // URL用スラッグ
            $table->text('description')->nullable(); // カテゴリー説明
            $table->string('color')->default('#3B82F6'); // カテゴリー色
            $table->string('icon')->nullable(); // アイコン
            $table->boolean('is_active')->default(true); // アクティブ状態
            $table->integer('sort_order')->default(0); // 並び順
            $table->timestamps();
            
            // インデックス
            $table->index(['is_active', 'sort_order']);
        });
    }

    /**
     * マイグレーションロールバック
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_categories');
    }
};
