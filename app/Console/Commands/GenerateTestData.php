<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Survey;
use App\Models\SurveyCategory;
use App\Models\SurveyQuestion;
use App\Models\SurveyResponse;
use App\Models\User;
use App\Models\SurveyAnalytics;
use App\Models\SurveyInsight;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * テストデータ生成コマンド
 * 
 * AI分析機能の検証用に包括的なテストデータを生成するArtisanコマンド
 * 日本人名、リアルなアンケート内容、感情分析データなどを含む複雑なテストデータを作成
 */
class GenerateTestData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test-data:generate {--surveys=10 : Number of surveys to create} {--users=500 : Number of users to create} {--responses=2000 : Number of responses to create}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate comprehensive test data for AI analytics validation';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🚀 Starting comprehensive test data generation...');
        \Log::info('Starting comprehensive test data generation');
        
        $surveysCount = $this->option('surveys');
        $usersCount = $this->option('users');
        $responsesCount = $this->option('responses');
        
        \Log::info("Test data parameters - Surveys: {$surveysCount}, Users: {$usersCount}, Responses: {$responsesCount}");

        // 既存データをクリア
        $this->clearExistingData();

        // テストデータ生成
        $this->generateCategories();
        $this->generateUsers($usersCount);
        $surveys = $this->generateSurveys($surveysCount);
        $this->generateResponses($surveys, $responsesCount);
        
        // AI分析データ生成
        \Log::info('Starting AI analytics data generation...');
        $this->generateAnalyticsData($surveys);
        \Log::info('Starting AI insights data generation...');
        $this->generateInsightsData($surveys);

        $this->info('✅ Test data generation completed successfully!');
        \Log::info('Test data generation completed successfully');
        $this->displaySummary();
    }

    private function clearExistingData()
    {
        $this->info('🧹 Clearing existing test data...');
        \Log::info('Clearing existing test data...');
        
        // Disable foreign key constraints for SQLite
        if (DB::getDriverName() === 'sqlite') {
            \Log::info('Disabling foreign key constraints for SQLite');
            DB::statement('PRAGMA foreign_keys = OFF;');
        }
        
        // Use delete instead of truncate for better SQLite compatibility
        \Log::info('Deleting existing data from all tables...');
        SurveyInsight::query()->delete();
        SurveyAnalytics::query()->delete();
        SurveyResponse::query()->delete();
        SurveyQuestion::query()->delete();
        Survey::query()->delete();
        User::query()->delete();
        
        // Reset auto-increment for SQLite
        if (DB::getDriverName() === 'sqlite') {
            \Log::info('Resetting auto-increment sequences for SQLite');
            DB::statement('DELETE FROM sqlite_sequence');
            DB::statement('PRAGMA foreign_keys = ON;');
        }
        
        \Log::info('Data clearing completed');
    }

    private function generateCategories()
    {
        $this->info('📂 Generating survey categories...');
        
        $categories = [
            [
                'name' => 'テクノロジー・IT',
                'description' => 'IT・テクノロジー関連のアンケート',
                'color' => '#3B82F6',
                'icon' => 'fas fa-laptop-code'
            ],
            [
                'name' => 'ショッピング・EC',
                'description' => '買い物・ECサイト関連のアンケート',
                'color' => '#10B981',
                'icon' => 'fas fa-shopping-cart'
            ],
            [
                'name' => 'ビジネス・働き方',
                'description' => 'ビジネス・働き方関連のアンケート',
                'color' => '#8B5CF6',
                'icon' => 'fas fa-briefcase'
            ],
            [
                'name' => 'ライフスタイル',
                'description' => '生活・ライフスタイル関連のアンケート',
                'color' => '#EC4899',
                'icon' => 'fas fa-heart'
            ],
            [
                'name' => 'エンターテイメント',
                'description' => 'エンターテイメント・娯楽関連のアンケート',
                'color' => '#F59E0B',
                'icon' => 'fas fa-gamepad'
            ],
            [
                'name' => 'ヘルスケア・医療',
                'description' => '健康・医療関連のアンケート',
                'color' => '#EF4444',
                'icon' => 'fas fa-heartbeat'
            ],
            [
                'name' => '教育・学習',
                'description' => '教育・学習関連のアンケート',
                'color' => '#06B6D4',
                'icon' => 'fas fa-graduation-cap'
            ],
            [
                'name' => '金融・投資',
                'description' => '金融・投資関連のアンケート',
                'color' => '#84CC16',
                'icon' => 'fas fa-chart-line'
            ]
        ];

        foreach ($categories as $category) {
            SurveyCategory::create($category);
        }
    }

    private function generateUsers($count)
    {
        $this->info("👥 Generating {$count} test users...");
        
        $genders = ['male', 'female', 'other'];
        $statuses = ['active', 'active', 'active', 'inactive']; // 75% active
        
        for ($i = 0; $i < $count; $i++) {
            $age = rand(18, 80);
            $birthDate = Carbon::now()->subYears($age)->subDays(rand(0, 365));
            
            User::create([
                'name' => $this->generateJapaneseName(),
                'email' => "testuser{$i}@example.com",
                'password' => bcrypt('password'),
                'phone' => $this->generatePhoneNumber(),
                'birth_date' => $birthDate,
                'gender' => $genders[array_rand($genders)],
                'points' => rand(0, 5000),
                'total_earnings' => rand(0, 50000) / 100,
                'status' => $statuses[array_rand($statuses)],
                'created_at' => Carbon::now()->subDays(rand(1, 365)),
                'updated_at' => Carbon::now()->subDays(rand(0, 30))
            ]);
        }
    }

    private function generateSurveys($count)
    {
        $this->info("📊 Generating {$count} test surveys...");
        
        $surveys = [];
        $categories = SurveyCategory::all();
        
        $surveyTemplates = [
            [
                'title' => 'スマートフォンアプリの使用状況調査',
                'description' => 'スマートフォンアプリの利用状況と満足度について調査します。',
                'category_id' => 1,
                'points' => 50,
                'duration_minutes' => 5,
                'questions' => [
                    ['text' => '普段使用しているスマートフォンのOSは何ですか？', 'type' => 'radio', 'options' => ['iOS', 'Android', 'その他']],
                    ['text' => '1日にスマートフォンを使用する時間はどのくらいですか？', 'type' => 'radio', 'options' => ['1時間未満', '1-3時間', '3-5時間', '5時間以上']],
                    ['text' => 'よく使用するアプリの種類を教えてください（複数選択可）', 'type' => 'checkbox', 'options' => ['SNS', 'ゲーム', '動画', 'ニュース', 'ショッピング', 'その他']],
                    ['text' => 'アプリの使いやすさについてどう思いますか？', 'type' => 'rating', 'options' => ['1', '2', '3', '4', '5']],
                    ['text' => 'アプリの改善点があれば教えてください', 'type' => 'textarea', 'options' => null]
                ]
            ],
            [
                'title' => 'オンラインショッピングの利用実態',
                'description' => 'オンラインショッピングの利用状況と満足度について調査します。',
                'category_id' => 2,
                'points' => 40,
                'duration_minutes' => 7,
                'questions' => [
                    ['text' => 'オンラインショッピングを利用する頻度は？', 'type' => 'radio', 'options' => ['毎日', '週に数回', '月に数回', '年に数回', '利用しない']],
                    ['text' => 'よく利用するECサイトは？（複数選択可）', 'type' => 'checkbox', 'options' => ['Amazon', '楽天', 'Yahoo!ショッピング', 'メルカリ', 'その他']],
                    ['text' => 'オンラインショッピングで重視する要素は？', 'type' => 'rating', 'options' => ['価格', '配送速度', '商品品質', 'レビュー', '返品保証']],
                    ['text' => 'オンラインショッピングの満足度は？', 'type' => 'rating', 'options' => ['1', '2', '3', '4', '5']],
                    ['text' => '改善してほしい点があれば教えてください', 'type' => 'textarea', 'options' => null]
                ]
            ],
            [
                'title' => 'リモートワークの実態調査',
                'description' => 'リモートワークの実施状況と課題について調査します。',
                'category_id' => 3,
                'points' => 60,
                'duration_minutes' => 8,
                'questions' => [
                    ['text' => '現在の働き方は？', 'type' => 'radio', 'options' => ['完全リモート', 'ハイブリッド', '完全出社', 'その他']],
                    ['text' => 'リモートワークの頻度は？', 'type' => 'radio', 'options' => ['毎日', '週に3-4日', '週に1-2日', '月に数回', '実施していない']],
                    ['text' => 'リモートワークのメリットは？（複数選択可）', 'type' => 'checkbox', 'options' => ['通勤時間の削減', '集中力向上', 'ワークライフバランス', 'コスト削減', 'その他']],
                    ['text' => 'リモートワークの課題は？（複数選択可）', 'type' => 'checkbox', 'options' => ['コミュニケーション', '集中力維持', '技術的問題', '孤独感', 'その他']],
                    ['text' => 'リモートワークの満足度は？', 'type' => 'rating', 'options' => ['1', '2', '3', '4', '5']],
                    ['text' => 'リモートワークについてのご意見をお聞かせください', 'type' => 'textarea', 'options' => null]
                ]
            ],
            [
                'title' => '健康管理アプリの利用調査',
                'description' => '健康管理アプリの利用状況と効果について調査します。',
                'category_id' => 6,
                'points' => 45,
                'duration_minutes' => 6,
                'questions' => [
                    ['text' => '健康管理アプリを利用していますか？', 'type' => 'radio', 'options' => ['利用している', '過去に利用していた', '利用していない']],
                    ['text' => '利用しているアプリの種類は？（複数選択可）', 'type' => 'checkbox', 'options' => ['歩数計', '睡眠管理', '食事管理', '運動記録', '体重管理', 'その他']],
                    ['text' => 'アプリの利用頻度は？', 'type' => 'radio', 'options' => ['毎日', '週に数回', '月に数回', 'たまに']],
                    ['text' => 'アプリの効果を感じていますか？', 'type' => 'rating', 'options' => ['1', '2', '3', '4', '5']],
                    ['text' => '健康管理についてのご意見をお聞かせください', 'type' => 'textarea', 'options' => null]
                ]
            ],
            [
                'title' => '動画配信サービスの利用実態',
                'description' => '動画配信サービスの利用状況と満足度について調査します。',
                'category_id' => 5,
                'points' => 35,
                'duration_minutes' => 4,
                'questions' => [
                    ['text' => '利用している動画配信サービスは？（複数選択可）', 'type' => 'checkbox', 'options' => ['Netflix', 'Amazon Prime', 'Disney+', 'Hulu', 'YouTube Premium', 'その他']],
                    ['text' => '1週間の視聴時間は？', 'type' => 'radio', 'options' => ['5時間未満', '5-10時間', '10-20時間', '20時間以上']],
                    ['text' => 'よく視聴するコンテンツの種類は？（複数選択可）', 'type' => 'checkbox', 'options' => ['映画', 'ドラマ', 'アニメ', 'ドキュメンタリー', 'バラエティ', 'その他']],
                    ['text' => 'サービスの満足度は？', 'type' => 'rating', 'options' => ['1', '2', '3', '4', '5']],
                    ['text' => '改善してほしい点があれば教えてください', 'type' => 'textarea', 'options' => null]
                ]
            ]
        ];

        for ($i = 0; $i < $count; $i++) {
            $template = $surveyTemplates[array_rand($surveyTemplates)];
            $category = $categories->random();
            
            $survey = Survey::create([
                'title' => $template['title'] . " (テスト{$i})",
                'description' => $template['description'],
                'category_id' => $category->id,
                'points' => $template['points'] + rand(-10, 20),
                'duration_minutes' => $template['duration_minutes'] + rand(-2, 3),
                'max_responses' => rand(100, 1000),
                'current_responses' => 0,
                'status' => ['active', 'active', 'active', 'paused', 'completed'][array_rand(['active', 'active', 'active', 'paused', 'completed'])],
                'start_date' => Carbon::now()->subDays(rand(1, 30)),
                'end_date' => Carbon::now()->addDays(rand(1, 30)),
                'is_featured' => rand(0, 10) < 2, // 20% featured
                'created_by' => User::inRandomOrder()->first()->id,
                'created_at' => Carbon::now()->subDays(rand(1, 30)),
                'updated_at' => Carbon::now()->subDays(rand(0, 5))
            ]);

            // 質問を生成
            foreach ($template['questions'] as $index => $questionData) {
                SurveyQuestion::create([
                    'survey_id' => $survey->id,
                    'question_text' => $questionData['text'],
                    'question_type' => $questionData['type'],
                    'options' => $questionData['options'],
                    'is_required' => rand(0, 10) < 8, // 80% required
                    'order_index' => $index + 1
                ]);
            }

            $surveys[] = $survey;
        }

        return $surveys;
    }

    private function generateResponses($surveys, $count)
    {
        $this->info("📝 Generating {$count} test responses...");
        
        $users = User::all();
        $responseCount = 0;
        
        foreach ($surveys as $survey) {
            $questions = $survey->questions;
            $responseUsers = $users->random(min(rand(50, 200), $users->count()));
            
            foreach ($responseUsers as $user) {
                if ($responseCount >= $count) break;
                
                $startTime = Carbon::now()->subDays(rand(0, 30))->subMinutes(rand(0, 1440));
                $completionRate = rand(70, 100); // 70-100% completion rate
                
                foreach ($questions as $question) {
                    // 完了率に基づいて回答をスキップ
                    if (rand(1, 100) > $completionRate) continue;
                    
                    $answer = $this->generateAnswer($question, $user);
                    
                    SurveyResponse::create([
                        'survey_id' => $survey->id,
                        'user_id' => $user->id,
                        'question_id' => $question->id,
                        'answer' => $answer,
                        'created_at' => $startTime->addSeconds(rand(10, 120))
                    ]);
                }
                
                $responseCount++;
            }
            
            // アンケートの回答数を更新
            $survey->update([
                'current_responses' => $survey->responses()->distinct('user_id')->count()
            ]);
        }
    }

    private function generateAnswer($question, $user)
    {
        switch ($question->question_type) {
            case 'radio':
                $options = $question->options;
                return $options[array_rand($options)];
                
            case 'checkbox':
                $options = $question->options;
                $selectedCount = rand(1, min(3, count($options)));
                $selected = array_rand($options, $selectedCount);
                if (!is_array($selected)) $selected = [$selected];
                return json_encode(array_map(function($index) use ($options) {
                    return $options[$index];
                }, $selected));
                
            case 'rating':
                $options = $question->options;
                // 年齢に基づいた回答傾向
                $age = $user->birth_date ? Carbon::parse($user->birth_date)->age : 30;
                if ($age < 30) {
                    // 若年層は高評価傾向
                    $weights = [5, 10, 20, 30, 35];
                } elseif ($age > 50) {
                    // 高齢層は保守的
                    $weights = [10, 20, 30, 25, 15];
                } else {
                    // 中年層はバランス
                    $weights = [15, 20, 30, 20, 15];
                }
                return $this->weightedRandom($options, $weights);
                
            case 'textarea':
                return $this->generateJapaneseText($question, $user);
                
            case 'text':
                return $this->generateShortText($question, $user);
                
            default:
                return 'テスト回答';
        }
    }

    private function generateJapaneseText($question, $user)
    {
        $templates = [
            'スマートフォンアプリ' => [
                'とても使いやすくて気に入っています。',
                'もう少し軽量化してほしいです。',
                '機能が豊富で便利です。',
                'UIが分かりにくい部分があります。',
                'サポートが充実していて安心です。',
                'バグが多くて困っています。',
                'デザインが美しくて気に入っています。',
                '動作が重くてストレスを感じます。'
            ],
            'オンラインショッピング' => [
                '配送が早くて助かります。',
                '商品の品質にばらつきがあります。',
                '価格が安くてお得です。',
                '返品手続きが複雑です。',
                'レビューが参考になります。',
                '在庫切れが多いです。',
                'カスタマーサービスが親切です。',
                'サイトの使い勝手が悪いです。'
            ],
            'リモートワーク' => [
                '集中力が向上して効率的です。',
                'コミュニケーションが取りにくいです。',
                '通勤時間が削減されて助かります。',
                '孤独感を感じることがあります。',
                'ワークライフバランスが改善されました。',
                '技術的な問題で困ることがあります。',
                '自由度が高くて働きやすいです。',
                '管理が難しいと感じます。'
            ],
            '健康管理' => [
                '健康意識が高まりました。',
                'データの精度に疑問があります。',
                '継続しやすい仕組みが良いです。',
                '機能が複雑で使いにくいです。',
                'モチベーション維持に役立ちます。',
                'プライバシーが心配です。',
                '目標設定がしやすいです。',
                'バッテリー消費が激しいです。'
            ],
            '動画配信' => [
                'コンテンツが豊富で満足です。',
                '料金が高いと感じます。',
                '画質が良くて見やすいです。',
                '配信が不安定なことがあります。',
                'おすすめ機能が便利です。',
                '字幕の精度が悪いです。',
                'ダウンロード機能が便利です。',
                '検索機能が使いにくいです。'
            ],
            'その他' => [
                '全体的に満足しています。',
                '改善の余地があると思います。',
                '特に問題はありません。',
                'もう少し工夫が必要です。',
                '期待通りでした。',
                '予想以上でした。',
                '普通だと思います。',
                '良い点が多いです。'
            ]
        ];

        $questionText = $question->question_text;
        $templateKey = 'その他';
        
        foreach ($templates as $key => $responses) {
            if (strpos($questionText, $key) !== false) {
                $templateKey = $key;
                break;
            }
        }

        $responses = $templates[$templateKey] ?? $templates['その他'];
        $baseResponse = $responses[array_rand($responses)];
        
        // 感情分析用の追加テキスト
        $emotions = [
            'ポジティブ' => ['素晴らしい', '最高', '満足', '気に入り', '便利', 'おすすめ'],
            'ネガティブ' => ['問題', '困る', '不満', '改善', '悪い', '最悪'],
            'ニュートラル' => ['普通', 'まあまあ', '特に', 'それなり', '普通に', '特に問題なく']
        ];

        $emotionType = array_rand($emotions);
        $emotionWord = $emotions[$emotionType][array_rand($emotions[$emotionType])];
        
        return $baseResponse . ' ' . $emotionWord . 'です。';
    }

    private function generateShortText($question, $user)
    {
        $templates = [
            '名前' => ['田中太郎', '佐藤花子', '鈴木一郎', '高橋美咲', '山田健太'],
            '年齢' => [rand(18, 80)],
            '職業' => ['会社員', '学生', '主婦', 'フリーランス', '公務員', '自営業'],
            '居住地' => ['東京都', '大阪府', '愛知県', '神奈川県', '埼玉県', '千葉県']
        ];

        foreach ($templates as $key => $options) {
            if (strpos($question->question_text, $key) !== false) {
                return $options[array_rand($options)];
            }
        }

        return 'テスト回答';
    }

    private function generateAnalyticsData($surveys)
    {
        $this->info('📊 Generating analytics data...');
        \Log::info('Starting analytics data generation for ' . count($surveys) . ' surveys');
        
        foreach ($surveys as $survey) {
            \Log::info("Processing analytics for survey: {$survey->title} (ID: {$survey->id})");
            
            $responses = $survey->responses;
            $users = User::whereIn('id', $responses->pluck('user_id'))->get();
            
            \Log::info("Found {$responses->count()} responses and {$users->count()} users for survey {$survey->id}");
            
            // 完了率計算
            $totalQuestions = $survey->questions->count();
            $completedUsers = $responses->groupBy('user_id')
                ->filter(function($userResponses) use ($totalQuestions) {
                    return $userResponses->count() >= $totalQuestions;
                })->count();
            $totalUsers = $responses->unique('user_id')->count();
            $completionRate = $totalUsers > 0 ? ($completedUsers / $totalUsers) * 100 : 0;
            
            \Log::info("Completion rate calculation - Total questions: {$totalQuestions}, Completed users: {$completedUsers}, Total users: {$totalUsers}, Rate: {$completionRate}%");

            // 平均完了時間
            $completionTimes = $responses->groupBy('user_id')
                ->map(function($userResponses) {
                    $startTime = $userResponses->min('created_at');
                    $endTime = $userResponses->max('created_at');
                    return $endTime->diffInMinutes($startTime);
                });
            $averageCompletionTime = $completionTimes->avg() ?? 0;
            
            \Log::info("Average completion time: {$averageCompletionTime} minutes");

            // 品質スコア計算
            $qualityScore = $this->calculateQualityScore($survey);
            \Log::info("Quality score: {$qualityScore}");

            // デモグラフィック分析
            $demographicBreakdown = [
                'gender' => $users->groupBy('gender')->map->count(),
                'age_groups' => $this->getAgeGroups($users),
                'registration_period' => $this->getRegistrationPeriods($users)
            ];
            
            \Log::info("Demographic breakdown generated - Gender distribution: " . json_encode($demographicBreakdown['gender']));

            // 質問分析
            $questionAnalytics = [];
            foreach ($survey->questions as $question) {
                $questionResponses = $responses->where('question_id', $question->id);
                $analytics = [
                    'question_id' => $question->id,
                    'question_text' => $question->question_text,
                    'question_type' => $question->question_type,
                    'response_count' => $questionResponses->count(),
                    'response_rate' => $totalUsers > 0 ? ($questionResponses->count() / $totalUsers) * 100 : 0
                ];

                if (in_array($question->question_type, ['radio', 'select', 'checkbox', 'rating'])) {
                    $answers = $questionResponses->pluck('answer');
                    if ($question->question_type === 'checkbox') {
                        $allAnswers = [];
                        foreach ($answers as $answer) {
                            $decoded = json_decode($answer, true);
                            if (is_array($decoded)) {
                                $allAnswers = array_merge($allAnswers, $decoded);
                            }
                        }
                        $analytics['answer_distribution'] = array_count_values($allAnswers);
                    } else {
                        $analytics['answer_distribution'] = $answers->countBy()->toArray();
                    }
                    $analytics['most_common_answer'] = array_keys($analytics['answer_distribution'], max($analytics['answer_distribution']))[0] ?? null;
                }

                if ($question->question_type === 'rating') {
                    $ratings = $questionResponses->pluck('answer')->filter()->map(function($rating) {
                        return (float) $rating;
                    });
                    $analytics['average_rating'] = $ratings->avg();
                    $analytics['rating_distribution'] = $ratings->countBy()->toArray();
                }

                $questionAnalytics[] = $analytics;
            }
            
            \Log::info("Question analytics generated for " . count($questionAnalytics) . " questions");

            // 感情分析
            $sentimentAnalysis = $this->performSentimentAnalysis($survey);
            \Log::info("Sentiment analysis completed - Positive: {$sentimentAnalysis['positive']}, Negative: {$sentimentAnalysis['negative']}, Neutral: {$sentimentAnalysis['neutral']}");

            // トレンドデータ
            $dailyResponses = $responses->groupBy(function($response) {
                return $response->created_at->format('Y-m-d');
            })->map->count()->toArray();
            
            // 累積合計を計算
            $totalResponsesOverTime = [];
            $cumulativeSum = 0;
            foreach ($dailyResponses as $date => $count) {
                $cumulativeSum += $count;
                $totalResponsesOverTime[$date] = $cumulativeSum;
            }
            
            $trendData = [
                'daily_responses' => $dailyResponses,
                'total_responses_over_time' => $totalResponsesOverTime
            ];
            
            \Log::info("Trend data generated for " . count($dailyResponses) . " days");

            SurveyAnalytics::create([
                'survey_id' => $survey->id,
                'total_responses' => $responses->count(),
                'completion_rate' => $completionRate,
                'average_completion_time' => $averageCompletionTime,
                'response_quality_score' => $qualityScore,
                'demographic_breakdown' => $demographicBreakdown,
                'question_analytics' => $questionAnalytics,
                'sentiment_analysis' => $sentimentAnalysis,
                'trend_data' => $trendData,
                'generated_at' => Carbon::now()
            ]);
            
            \Log::info("Analytics data saved for survey {$survey->id}");
        }
        
        \Log::info('Analytics data generation completed');
    }

    private function generateInsightsData($surveys)
    {
        $this->info('🤖 Generating AI insights...');
        \Log::info('Starting AI insights generation for ' . count($surveys) . ' surveys');
        
        foreach ($surveys as $survey) {
            \Log::info("Processing insights for survey: {$survey->title} (ID: {$survey->id})");
            
            $analytics = SurveyAnalytics::where('survey_id', $survey->id)->first();
            if (!$analytics) {
                \Log::warning("No analytics found for survey {$survey->id}, skipping insights generation");
                continue;
            }

            $insights = [];

            // 完了率インサイト
            if ($analytics->completion_rate < 70) {
                $insights[] = [
                    'survey_id' => $survey->id,
                    'insight_type' => 'completion_rate',
                    'title' => '完了率が低いです',
                    'description' => "現在の完了率は{$analytics->completion_rate}%です。質問数を減らすか、インセンティブを増やすことを検討してください。",
                    'confidence_score' => 85,
                    'data_points' => ['completion_rate' => $analytics->completion_rate],
                    'recommendations' => [
                        '質問数を10問以下に減らす',
                        'ポイントを20%増加させる',
                        '完了時間を5分以内に設定する'
                    ],
                    'generated_by_ai' => true
                ];
            }

            // 品質スコアインサイト
            if ($analytics->response_quality_score < 60) {
                $insights[] = [
                    'survey_id' => $survey->id,
                    'insight_type' => 'response_quality',
                    'title' => '回答品質が低いです',
                    'description' => "回答品質スコアが{$analytics->response_quality_score}点です。質問の明確化や回答オプションの改善が必要です。",
                    'confidence_score' => 80,
                    'data_points' => ['quality_score' => $analytics->response_quality_score],
                    'recommendations' => [
                        '質問文をより具体的にする',
                        '回答オプションを明確にする',
                        '必須回答を適切に設定する'
                    ],
                    'generated_by_ai' => true
                ];
            }

            // 感情分析インサイト
            $sentiment = $analytics->sentiment_analysis;
            if ($sentiment && $sentiment['total_text_responses'] > 0) {
                $positivePercentage = ($sentiment['positive'] / $sentiment['total_text_responses']) * 100;
                $negativePercentage = ($sentiment['negative'] / $sentiment['total_text_responses']) * 100;

                if ($negativePercentage > 30) {
                    $insights[] = [
                        'survey_id' => $survey->id,
                        'insight_type' => 'sentiment_analysis',
                        'title' => 'ネガティブな感情が検出されています',
                        'description' => "回答者の{$negativePercentage}%がネガティブな感情を示しています。改善点を特定し、対応策を検討してください。",
                        'confidence_score' => 70,
                        'data_points' => [
                            'positive' => $positivePercentage,
                            'negative' => $negativePercentage,
                            'neutral' => (($sentiment['neutral'] / $sentiment['total_text_responses']) * 100)
                        ],
                        'recommendations' => [
                            'ネガティブな回答の詳細分析',
                            '改善点の特定',
                            'ユーザーフィードバックの収集'
                        ],
                        'generated_by_ai' => true
                    ];
                }
            }

            // デモグラフィックインサイト
            $demographics = $analytics->demographic_breakdown;
            if (isset($demographics['gender'])) {
                $totalGender = array_sum($demographics['gender']);
                foreach ($demographics['gender'] as $gender => $count) {
                    $percentage = ($count / $totalGender) * 100;
                    if ($percentage > 70) {
                        $insights[] = [
                            'survey_id' => $survey->id,
                            'insight_type' => 'demographic_bias',
                            'title' => '回答者の性別に偏りがあります',
                            'description' => "回答者の{$percentage}%が{$gender}です。より多様な回答を得るために、ターゲット層を拡大することを検討してください。",
                            'confidence_score' => 75,
                            'data_points' => ['gender_distribution' => $demographics['gender']],
                            'recommendations' => [
                                '異なるチャネルでのプロモーション',
                                'インセンティブの調整',
                                'ターゲット層の見直し'
                            ],
                            'generated_by_ai' => true
                        ];
                        break;
                    }
                }
            }

            // インサイトを保存
            \Log::info("Saving " . count($insights) . " insights for survey {$survey->id}");
            foreach ($insights as $insight) {
                SurveyInsight::create($insight);
            }
            \Log::info("Insights generation completed for survey {$survey->id}");
        }
        
        \Log::info('AI insights generation completed');
    }

    private function calculateQualityScore($survey)
    {
        $responses = $survey->responses;
        $questions = $survey->questions;
        
        $qualityFactors = [
            'completion_rate' => $this->calculateCompletionRate($survey),
            'response_length' => $this->calculateAverageResponseLength($responses, $questions),
            'response_consistency' => $this->calculateResponseConsistency($responses, $questions)
        ];

        return array_sum($qualityFactors) / count($qualityFactors);
    }

    private function calculateCompletionRate($survey)
    {
        $totalQuestions = $survey->questions->count();
        $completedResponses = $survey->responses()
            ->select('user_id')
            ->groupBy('user_id')
            ->havingRaw('COUNT(*) = ?', [$totalQuestions])
            ->count();
        $totalUsers = $survey->responses()->distinct('user_id')->count();
        
        return $totalUsers > 0 ? ($completedResponses / $totalUsers) * 100 : 0;
    }

    private function calculateAverageResponseLength($responses, $questions)
    {
        $textQuestions = $questions->whereIn('question_type', ['text', 'textarea']);
        $textResponses = $responses->whereIn('question_id', $textQuestions->pluck('id'));
        
        $lengths = $textResponses->pluck('answer')->filter()->map(function($answer) {
            return strlen($answer);
        });

        return $lengths->avg() ?? 0;
    }

    private function calculateResponseConsistency($responses, $questions)
    {
        $consistencyScore = 0;
        $totalQuestions = $questions->count();
        
        foreach ($questions as $question) {
            if (in_array($question->question_type, ['radio', 'select', 'rating'])) {
                $questionResponses = $responses->where('question_id', $question->id);
                $responseCounts = $questionResponses->pluck('answer')->countBy();
                $maxCount = $responseCounts->max();
                $totalResponses = $questionResponses->count();
                
                if ($totalResponses > 0) {
                    $consistencyScore += ($maxCount / $totalResponses) * 100;
                }
            }
        }

        return $totalQuestions > 0 ? $consistencyScore / $totalQuestions : 0;
    }

    private function performSentimentAnalysis($survey)
    {
        $textResponses = $survey->responses()
            ->whereIn('question_id', $survey->questions()->whereIn('question_type', ['text', 'textarea'])->pluck('id'))
            ->pluck('answer')
            ->filter();

        $positiveKeywords = ['良い', '満足', '素晴らしい', '便利', '使いやすい', 'おすすめ', '気に入り', '最高'];
        $negativeKeywords = ['悪い', '不満', '不便', '使いにくい', '問題', '困る', '最悪', '嫌い'];

        $sentimentScores = $textResponses->map(function ($response) use ($positiveKeywords, $negativeKeywords) {
            $positiveCount = 0;
            $negativeCount = 0;

            foreach ($positiveKeywords as $keyword) {
                $positiveCount += substr_count($response, $keyword);
            }

            foreach ($negativeKeywords as $keyword) {
                $negativeCount += substr_count($response, $keyword);
            }

            if ($positiveCount > $negativeCount) return 'positive';
            if ($negativeCount > $positiveCount) return 'negative';
            return 'neutral';
        });

        return [
            'positive' => $sentimentScores->filter(function ($sentiment) { return $sentiment === 'positive'; })->count(),
            'negative' => $sentimentScores->filter(function ($sentiment) { return $sentiment === 'negative'; })->count(),
            'neutral' => $sentimentScores->filter(function ($sentiment) { return $sentiment === 'neutral'; })->count(),
            'total_text_responses' => $textResponses->count()
        ];
    }

    private function getAgeGroups($users)
    {
        return $users->groupBy(function ($user) {
            if (!$user->birth_date) return 'unknown';
            
            $age = Carbon::parse($user->birth_date)->age;
            if ($age < 20) return 'under_20';
            if ($age < 30) return '20s';
            if ($age < 40) return '30s';
            if ($age < 50) return '40s';
            if ($age < 60) return '50s';
            return 'over_60';
        })->map->count();
    }

    private function getRegistrationPeriods($users)
    {
        return $users->groupBy(function ($user) {
            $monthsAgo = Carbon::parse($user->created_at)->diffInMonths(now());
            if ($monthsAgo < 1) return 'last_month';
            if ($monthsAgo < 3) return 'last_3_months';
            if ($monthsAgo < 6) return 'last_6_months';
            if ($monthsAgo < 12) return 'last_year';
            return 'over_year';
        })->map->count();
    }

    private function generateJapaneseName()
    {
        $lastNames = ['田中', '佐藤', '鈴木', '高橋', '山田', '渡辺', '伊藤', '中村', '小林', '加藤'];
        $firstNames = [
            'male' => ['太郎', '一郎', '健太', '大輔', '直樹', '慎一', '和也', '雄一', '正義', '博之'],
            'female' => ['花子', '美咲', '由美', '恵子', '智子', '真理', '優子', '香織', '麻衣', 'あい']
        ];
        
        $lastName = $lastNames[array_rand($lastNames)];
        $gender = ['male', 'female'][array_rand(['male', 'female'])];
        $firstName = $firstNames[$gender][array_rand($firstNames[$gender])];
        
        return $lastName . $firstName;
    }

    private function generatePhoneNumber()
    {
        return '090-' . rand(1000, 9999) . '-' . rand(1000, 9999);
    }

    private function weightedRandom($options, $weights)
    {
        $totalWeight = array_sum($weights);
        $random = rand(1, $totalWeight);
        $currentWeight = 0;
        
        foreach ($options as $index => $option) {
            $currentWeight += $weights[$index];
            if ($random <= $currentWeight) {
                return $option;
            }
        }
        
        return $options[0];
    }

    private function displaySummary()
    {
        $this->info('📊 Test Data Summary:');
        $this->line('  - Surveys: ' . Survey::count());
        $this->line('  - Users: ' . User::count());
        $this->line('  - Responses: ' . SurveyResponse::count());
        $this->line('  - Analytics Records: ' . SurveyAnalytics::count());
        $this->line('  - AI Insights: ' . SurveyInsight::count());
        
        $this->info('🎯 AI Analytics Features Demonstrated:');
        $this->line('  ✅ Real-time data processing');
        $this->line('  ✅ Sentiment analysis (Japanese)');
        $this->line('  ✅ Quality scoring');
        $this->line('  ✅ Demographic analysis');
        $this->line('  ✅ Trend analysis');
        $this->line('  ✅ AI-powered insights');
        $this->line('  ✅ Completion rate analysis');
        $this->line('  ✅ Response pattern detection');
    }
}
