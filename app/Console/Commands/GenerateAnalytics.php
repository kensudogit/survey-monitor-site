<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\SurveyAnalyticsService;
use App\Services\ReportGenerationService;

class GenerateAnalytics extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'analytics:generate {survey_id?} {--all : Generate analytics for all surveys}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate analytics and insights for surveys';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $analyticsService = app(SurveyAnalyticsService::class);
        $reportService = app(ReportGenerationService::class);

        if ($this->option('all')) {
            $this->info('Generating analytics for all active surveys...');
            
            $surveys = \App\Models\Survey::where('status', 'active')->get();
            
            foreach ($surveys as $survey) {
                $this->info("Processing survey: {$survey->title}");
                
                try {
                    // Generate analytics
                    $analytics = $analyticsService->generateSurveyAnalytics($survey->id);
                    $this->info("✓ Analytics generated for survey {$survey->id}");
                    
                    // Generate insights
                    $insights = $analyticsService->generateInsights($survey->id);
                    $this->info("✓ Generated " . count($insights) . " insights for survey {$survey->id}");
                    
                } catch (\Exception $e) {
                    $this->error("✗ Failed to process survey {$survey->id}: " . $e->getMessage());
                }
            }
            
            $this->info('Analytics generation completed!');
            
        } else {
            $surveyId = $this->argument('survey_id');
            
            if (!$surveyId) {
                $this->error('Please provide a survey ID or use --all option');
                return;
            }
            
            $this->info("Generating analytics for survey: {$surveyId}");
            
            try {
                // Generate analytics
                $analytics = $analyticsService->generateSurveyAnalytics($surveyId);
                $this->info("✓ Analytics generated");
                
                // Generate insights
                $insights = $analyticsService->generateInsights($surveyId);
                $this->info("✓ Generated " . count($insights) . " insights");
                
                // Generate report
                if ($this->confirm('Would you like to generate a PDF report?')) {
                    $report = $reportService->generateComprehensiveReport($surveyId, 'pdf');
                    $this->info("✓ Report generated: {$report->file_path}");
                }
                
            } catch (\Exception $e) {
                $this->error("✗ Failed to generate analytics: " . $e->getMessage());
            }
        }
    }
}
