<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Survey Analytics table
        Schema::create('survey_analytics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained()->onDelete('cascade');
            $table->integer('total_responses')->default(0);
            $table->decimal('completion_rate', 5, 2)->default(0);
            $table->decimal('average_completion_time', 8, 2)->default(0);
            $table->decimal('response_quality_score', 5, 2)->default(0);
            $table->json('demographic_breakdown')->nullable();
            $table->json('question_analytics')->nullable();
            $table->json('sentiment_analysis')->nullable();
            $table->json('trend_data')->nullable();
            $table->timestamp('generated_at');
            $table->timestamps();
            
            $table->index(['survey_id', 'generated_at']);
        });

        // Survey Insights table
        Schema::create('survey_insights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained()->onDelete('cascade');
            $table->string('insight_type');
            $table->string('title');
            $table->text('description');
            $table->decimal('confidence_score', 5, 2)->default(0);
            $table->json('data_points')->nullable();
            $table->json('recommendations')->nullable();
            $table->boolean('generated_by_ai')->default(false);
            $table->timestamps();
            
            $table->index(['survey_id', 'insight_type']);
        });

        // Survey Reports table
        Schema::create('survey_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained()->onDelete('cascade');
            $table->string('report_type');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('file_path');
            $table->string('file_format');
            $table->foreignId('generated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->json('parameters')->nullable();
            $table->enum('status', ['generating', 'completed', 'failed'])->default('generating');
            $table->timestamp('generated_at');
            $table->timestamps();
            
            $table->index(['survey_id', 'status']);
        });

        // Survey Response Quality table for advanced quality tracking
        Schema::create('survey_response_quality', function (Blueprint $table) {
            $table->id();
            $table->foreignId('response_id')->constrained('survey_responses')->onDelete('cascade');
            $table->decimal('quality_score', 5, 2)->default(0);
            $table->json('quality_factors')->nullable();
            $table->text('quality_notes')->nullable();
            $table->timestamps();
            
            $table->index(['response_id', 'quality_score']);
        });

        // Survey Performance Metrics table
        Schema::create('survey_performance_metrics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained()->onDelete('cascade');
            $table->date('metric_date');
            $table->integer('daily_responses')->default(0);
            $table->decimal('daily_completion_rate', 5, 2)->default(0);
            $table->decimal('daily_quality_score', 5, 2)->default(0);
            $table->decimal('daily_sentiment_score', 5, 2)->default(0);
            $table->timestamps();
            
            $table->unique(['survey_id', 'metric_date']);
            $table->index(['survey_id', 'metric_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('survey_performance_metrics');
        Schema::dropIfExists('survey_response_quality');
        Schema::dropIfExists('survey_reports');
        Schema::dropIfExists('survey_insights');
        Schema::dropIfExists('survey_analytics');
    }
};
