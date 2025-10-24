<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * ホームコントローラー
 * 
 * サイトのトップページを表示するコントローラー
 * おすすめアンケート、カテゴリ一覧、統計情報を提供
 */
class HomeController extends Controller
{
    public function index()
    {
        // サンプルデータ
        $featuredSurveys = [
            [
                'id' => 1,
                'title' => 'スマートフォンアプリの使用状況調査',
                'description' => '日常的なスマートフォンアプリの利用状況について調査します',
                'points' => 100,
                'duration' => '5分',
                'category' => 'テクノロジー',
                'image' => 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'
            ],
            [
                'id' => 2,
                'title' => 'オンラインショッピングの満足度調査',
                'description' => 'ECサイトでの買い物体験についてお聞きします',
                'points' => 150,
                'duration' => '7分',
                'category' => 'ショッピング',
                'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
            ],
            [
                'id' => 3,
                'title' => '働き方改革に関する意識調査',
                'description' => 'リモートワークや働き方についての意識を調査します',
                'points' => 200,
                'duration' => '10分',
                'category' => 'ビジネス',
                'image' => 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=200&fit=crop'
            ]
        ];

        $categories = [
            ['name' => 'テクノロジー', 'count' => 15, 'color' => 'bg-blue-500'],
            ['name' => 'ショッピング', 'count' => 12, 'color' => 'bg-green-500'],
            ['name' => 'ビジネス', 'count' => 8, 'color' => 'bg-purple-500'],
            ['name' => 'ライフスタイル', 'count' => 20, 'color' => 'bg-pink-500'],
            ['name' => 'エンターテイメント', 'count' => 10, 'color' => 'bg-yellow-500'],
            ['name' => 'ヘルスケア', 'count' => 6, 'color' => 'bg-red-500']
        ];

        $stats = [
            'totalSurveys' => 71,
            'totalUsers' => 1250,
            'totalPoints' => 15680,
            'avgCompletionTime' => '6.5分'
        ];

        return view('home', compact('featuredSurveys', 'categories', 'stats'));
    }
}
