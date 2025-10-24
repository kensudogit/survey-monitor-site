<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SurveyCategory;
use App\Models\Survey;

/**
 * アンケートデータシーダー
 * 
 * アンケートカテゴリーとサンプルアンケートデータを投入
 */
class SurveySeeder extends Seeder
{
    /**
     * シーダー実行
     */
    public function run(): void
    {
        // カテゴリーデータの作成
        $categories = [
            [
                'name' => 'テクノロジー',
                'slug' => 'technology',
                'description' => 'IT・テクノロジー関連のアンケート',
                'color' => '#3B82F6',
                'icon' => 'fas fa-laptop',
                'sort_order' => 1,
            ],
            [
                'name' => 'ショッピング',
                'slug' => 'shopping',
                'description' => '買い物・EC関連のアンケート',
                'color' => '#10B981',
                'icon' => 'fas fa-shopping-cart',
                'sort_order' => 2,
            ],
            [
                'name' => 'ビジネス',
                'slug' => 'business',
                'description' => 'ビジネス・働き方関連のアンケート',
                'color' => '#F59E0B',
                'icon' => 'fas fa-briefcase',
                'sort_order' => 3,
            ],
            [
                'name' => 'ライフスタイル',
                'slug' => 'lifestyle',
                'description' => '生活・ライフスタイル関連のアンケート',
                'color' => '#EF4444',
                'icon' => 'fas fa-heart',
                'sort_order' => 4,
            ],
            [
                'name' => 'エンターテイメント',
                'slug' => 'entertainment',
                'description' => 'エンターテイメント・ゲーム関連のアンケート',
                'color' => '#8B5CF6',
                'icon' => 'fas fa-gamepad',
                'sort_order' => 5,
            ],
            [
                'name' => 'ヘルスケア',
                'slug' => 'healthcare',
                'description' => '健康・医療関連のアンケート',
                'color' => '#06B6D4',
                'icon' => 'fas fa-heartbeat',
                'sort_order' => 6,
            ],
        ];

        foreach ($categories as $categoryData) {
            SurveyCategory::create($categoryData);
        }

        // サンプルアンケートデータの作成
        $surveys = [
            [
                'title' => 'スマートフォンアプリの使用状況調査',
                'description' => '日常的なスマートフォンアプリの利用状況について調査します',
                'category' => 'テクノロジー',
                'points' => 100,
                'estimated_time' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => '普段使用しているスマートフォンのOSは何ですか？',
                        'options' => ['iOS', 'Android', 'その他', '使用していない']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'multiple',
                        'question' => 'よく使用するアプリの種類を選択してください（複数選択可）',
                        'options' => ['SNS', 'ゲーム', '動画配信', 'ニュース', '買い物', 'その他']
                    ],
                    [
                        'id' => 'q3',
                        'type' => 'text',
                        'question' => 'スマートフォンアプリで改善してほしい機能があれば教えてください'
                    ]
                ],
                'status' => 'active',
            ],
            [
                'title' => 'オンラインショッピングの満足度調査',
                'description' => 'ECサイトでの買い物体験についてお聞きします',
                'category' => 'ショッピング',
                'points' => 150,
                'estimated_time' => 7,
                'image_url' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => 'オンラインショッピングの頻度はどのくらいですか？',
                        'options' => ['毎日', '週に数回', '月に数回', '年に数回', 'ほとんどしない']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'single',
                        'question' => 'よく利用するECサイトはどれですか？',
                        'options' => ['Amazon', '楽天市場', 'Yahoo!ショッピング', 'その他']
                    ],
                    [
                        'id' => 'q3',
                        'type' => 'rating',
                        'question' => 'オンラインショッピングの満足度を5段階で評価してください',
                        'scale' => 5
                    ]
                ],
                'status' => 'active',
            ],
            [
                'title' => '働き方改革に関する意識調査',
                'description' => 'リモートワークや働き方についての意識を調査します',
                'category' => 'ビジネス',
                'points' => 200,
                'estimated_time' => 10,
                'image_url' => 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => '現在の働き方はどれに近いですか？',
                        'options' => ['完全出社', 'ハイブリッド（出社とリモート）', '完全リモート', 'その他']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'multiple',
                        'question' => 'リモートワークのメリットを選択してください（複数選択可）',
                        'options' => ['通勤時間の削減', '集中力の向上', 'ワークライフバランスの改善', 'コスト削減', 'その他']
                    ],
                    [
                        'id' => 'q3',
                        'type' => 'text',
                        'question' => '働き方改革についてご意見をお聞かせください'
                    ]
                ],
                'status' => 'active',
            ],
            [
                'title' => 'ライフスタイルと健康習慣調査',
                'description' => '日常生活の習慣と健康管理について調査します',
                'category' => 'ライフスタイル',
                'points' => 120,
                'estimated_time' => 8,
                'image_url' => 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => '1日の睡眠時間はどのくらいですか？',
                        'options' => ['6時間未満', '6-7時間', '7-8時間', '8時間以上']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'multiple',
                        'question' => '日常的に行っている健康習慣を選択してください（複数選択可）',
                        'options' => ['運動', 'バランスの良い食事', '十分な睡眠', 'ストレス管理', 'その他']
                    ]
                ],
                'status' => 'active',
            ],
            [
                'title' => 'ゲームとエンターテイメント調査',
                'description' => 'ゲームやエンターテイメントの利用状況について調査します',
                'category' => 'エンターテイメント',
                'points' => 80,
                'estimated_time' => 6,
                'image_url' => 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => 'ゲームをプレイする頻度はどのくらいですか？',
                        'options' => ['毎日', '週に数回', '月に数回', 'ほとんどしない']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'single',
                        'question' => '好きなゲームジャンルはどれですか？',
                        'options' => ['RPG', 'アクション', 'パズル', 'シミュレーション', 'その他']
                    ]
                ],
                'status' => 'active',
            ],
            [
                'title' => '健康管理アプリの利用調査',
                'description' => '健康管理アプリやウェアラブルデバイスの利用状況を調査します',
                'category' => 'ヘルスケア',
                'points' => 90,
                'estimated_time' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => '健康管理アプリを使用していますか？',
                        'options' => ['使用している', '使用していない', '興味がある', '興味がない']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'multiple',
                        'question' => '健康管理で重視している項目を選択してください（複数選択可）',
                        'options' => ['運動記録', '食事管理', '睡眠管理', '体重管理', 'その他']
                    ]
                ],
                'status' => 'active',
            ],
            [
                'title' => 'AIとテクノロジーの未来調査',
                'description' => '人工知能や最新テクノロジーに対する意識を調査します',
                'category' => 'テクノロジー',
                'points' => 180,
                'estimated_time' => 12,
                'image_url' => 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => 'AI技術についてどの程度関心がありますか？',
                        'options' => ['非常に高い', '高い', '普通', '低い', '全くない']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'text',
                        'question' => 'AI技術の活用で期待している分野があれば教えてください'
                    ]
                ],
                'status' => 'active',
            ],
            [
                'title' => 'サステナブルショッピング調査',
                'description' => '環境に配慮した買い物についての意識を調査します',
                'category' => 'ショッピング',
                'points' => 110,
                'estimated_time' => 7,
                'image_url' => 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop',
                'questions' => [
                    [
                        'id' => 'q1',
                        'type' => 'single',
                        'question' => '環境に配慮した商品を選ぶ頻度はどのくらいですか？',
                        'options' => ['いつも', '時々', 'まれに', '全くない']
                    ],
                    [
                        'id' => 'q2',
                        'type' => 'multiple',
                        'question' => '環境配慮で重視している点を選択してください（複数選択可）',
                        'options' => ['リサイクル素材', '省エネ', '地産地消', '包装の簡素化', 'その他']
                    ]
                ],
                'status' => 'active',
            ],
        ];

        foreach ($surveys as $surveyData) {
            Survey::create($surveyData);
        }
    }
}
