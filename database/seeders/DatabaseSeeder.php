<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\SurveyCategory;
use App\Models\Survey;
use App\Models\SurveyQuestion;
use App\Models\SurveyQuestionOption;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // カテゴリの作成
        $categories = [
            [
                'name' => 'ライフスタイル',
                'description' => '日常生活やライフスタイルに関するアンケート',
                'icon' => 'home',
                'color' => '#3B82F6',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'ショッピング',
                'description' => '買い物や商品に関するアンケート',
                'icon' => 'shopping-cart',
                'color' => '#10B981',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'テクノロジー',
                'description' => 'IT・テクノロジーに関するアンケート',
                'icon' => 'laptop',
                'color' => '#8B5CF6',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'エンターテイメント',
                'description' => '映画、音楽、ゲームなどのエンターテイメント',
                'icon' => 'music',
                'color' => '#F59E0B',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => '健康・美容',
                'description' => '健康、美容、フィットネスに関するアンケート',
                'icon' => 'heart',
                'color' => '#EF4444',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => '教育・学習',
                'description' => '教育、学習、スキルアップに関するアンケート',
                'icon' => 'book',
                'color' => '#06B6D4',
                'is_active' => true,
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $categoryData) {
            SurveyCategory::create($categoryData);
        }

        // テストユーザーの作成
        $user = User::create([
            'name' => 'テストユーザー',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'points' => 5000,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // サンプルアンケートの作成
        $surveys = [
            [
                'title' => '日常生活の満足度調査',
                'description' => 'あなたの日常生活について、満足度を教えてください。生活の質向上のための貴重なご意見をお聞かせください。',
                'category_id' => 1,
                'reward_points' => 500,
                'estimated_time' => 10,
                'max_responses' => 100,
                'current_responses' => 23,
                'is_active' => true,
                'is_featured' => true,
                'priority' => 10,
                'start_date' => now()->subDays(5),
                'end_date' => now()->addDays(25),
            ],
            [
                'title' => 'オンラインショッピングの利用実態',
                'description' => 'オンラインショッピングの利用頻度や購入商品について調査します。ECサイトの改善に役立てます。',
                'category_id' => 2,
                'reward_points' => 800,
                'estimated_time' => 15,
                'max_responses' => 80,
                'current_responses' => 45,
                'is_active' => true,
                'is_featured' => true,
                'priority' => 9,
                'start_date' => now()->subDays(3),
                'end_date' => now()->addDays(17),
            ],
            [
                'title' => 'スマートフォンアプリの使用状況',
                'description' => 'スマートフォンアプリの使用状況や好みについて調査します。新しいアプリ開発の参考にします。',
                'category_id' => 3,
                'reward_points' => 600,
                'estimated_time' => 12,
                'max_responses' => 120,
                'current_responses' => 67,
                'is_active' => true,
                'is_featured' => true,
                'priority' => 8,
                'start_date' => now()->subDays(7),
                'end_date' => now()->addDays(23),
            ],
            [
                'title' => '動画配信サービスの利用実態',
                'description' => 'Netflix、Amazon Prime、Disney+などの動画配信サービスの利用状況を調査します。',
                'category_id' => 4,
                'reward_points' => 700,
                'estimated_time' => 8,
                'max_responses' => 90,
                'current_responses' => 34,
                'is_active' => true,
                'is_featured' => false,
                'priority' => 7,
                'start_date' => now()->subDays(2),
                'end_date' => now()->addDays(18),
            ],
            [
                'title' => '健康管理アプリの需要調査',
                'description' => '健康管理やフィットネスアプリの需要について調査します。新しいサービスの開発に役立てます。',
                'category_id' => 5,
                'reward_points' => 900,
                'estimated_time' => 20,
                'max_responses' => 60,
                'current_responses' => 12,
                'is_active' => true,
                'is_featured' => true,
                'priority' => 6,
                'start_date' => now()->subDays(1),
                'end_date' => now()->addDays(29),
            ],
            [
                'title' => 'オンライン学習の効果について',
                'description' => 'オンライン学習やeラーニングの効果について調査します。教育サービスの改善に役立てます。',
                'category_id' => 6,
                'reward_points' => 750,
                'estimated_time' => 18,
                'max_responses' => 70,
                'current_responses' => 28,
                'is_active' => true,
                'is_featured' => false,
                'priority' => 5,
                'start_date' => now()->subDays(4),
                'end_date' => now()->addDays(26),
            ],
        ];

        foreach ($surveys as $surveyData) {
            $survey = Survey::create($surveyData);

            // 各アンケートに質問を追加
            $questions = [
                [
                    'question_text' => 'あなたの年齢層を教えてください。',
                    'question_type' => 'single_choice',
                    'is_required' => true,
                    'sort_order' => 1,
                ],
                [
                    'question_text' => 'このサービスについてどの程度満足していますか？',
                    'question_type' => 'single_choice',
                    'is_required' => true,
                    'sort_order' => 2,
                ],
                [
                    'question_text' => '改善してほしい点があれば教えてください。',
                    'question_type' => 'text',
                    'is_required' => false,
                    'sort_order' => 3,
                ],
            ];

            foreach ($questions as $questionData) {
                $question = SurveyQuestion::create(array_merge($questionData, [
                    'survey_id' => $survey->id,
                ]));

                // 選択肢の質問にオプションを追加
                if ($question->question_type === 'single_choice') {
                    $options = $question->sort_order === 1 ? [
                        '20歳未満',
                        '20-29歳',
                        '30-39歳',
                        '40-49歳',
                        '50-59歳',
                        '60歳以上',
                    ] : [
                        '非常に満足',
                        '満足',
                        '普通',
                        '不満',
                        '非常に不満',
                    ];

                    foreach ($options as $index => $optionText) {
                        SurveyQuestionOption::create([
                            'question_id' => $question->id,
                            'option_text' => $optionText,
                            'sort_order' => $index + 1,
                        ]);
                    }
                }
            }
        }

        // 追加のテストユーザーを作成
        for ($i = 1; $i <= 10; $i++) {
            User::create([
                'name' => "ユーザー{$i}",
                'email' => "user{$i}@example.com",
                'password' => Hash::make('password'),
                'points' => rand(1000, 10000),
                'is_active' => true,
                'email_verified_at' => now(),
            ]);
        }
    }
}
