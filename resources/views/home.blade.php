@extends('layouts.app')

@section('title', 'Survey Monitor - ホーム')

@section('content')
<!-- Hero Section -->
<section class="gradient-bg text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-6xl font-bold mb-6 hero-title">アンケートでポイントを獲得</h2>
        <p class="text-xl md:text-2xl mb-8 opacity-90 hero-subtitle">あなたの意見が価値に変わります</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            @auth
                <a href="/dashboard" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    ダッシュボードへ
                </a>
            @else
                <a href="/register" class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    今すぐ始める
                </a>
            @endauth
            <a href="/surveys" class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                アンケートを見る
            </a>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div class="stats-card">
                <div class="text-3xl font-bold text-blue-600 mb-2">{{ $stats['totalSurveys'] ?? 71 }}</div>
                <div class="text-gray-600">利用可能なアンケート</div>
            </div>
            <div class="stats-card">
                <div class="text-3xl font-bold text-green-600 mb-2">{{ $stats['totalUsers'] ?? 1250 }}</div>
                <div class="text-gray-600">登録ユーザー数</div>
            </div>
            <div class="stats-card">
                <div class="text-3xl font-bold text-purple-600 mb-2">{{ $stats['totalPoints'] ?? 15680 }}</div>
                <div class="text-gray-600">獲得ポイント総数</div>
            </div>
            <div class="stats-card">
                <div class="text-3xl font-bold text-orange-600 mb-2">{{ $stats['avgCompletionTime'] ?? '6.5分' }}</div>
                <div class="text-gray-600">平均回答時間</div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Surveys -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-3xl font-bold text-gray-900 mb-8 text-center">おすすめアンケート</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            @foreach($featuredSurveys as $survey)
            <div class="survey-card">
                <img src="{{ $survey['image'] }}" alt="{{ $survey['title'] }}" class="w-full h-48 object-cover">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="category-badge bg-blue-100 text-blue-800">{{ $survey['category'] }}</span>
                        <span class="text-sm text-gray-500">{{ $survey['duration'] }}</span>
                    </div>
                    <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ $survey['title'] }}</h4>
                    <p class="text-gray-600 text-sm mb-4">{{ $survey['description'] }}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold text-green-600">{{ $survey['points'] }}pt</span>
                        <a href="/surveys/{{ $survey['id'] }}" class="btn-primary">回答する</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>

<!-- Categories -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-3xl font-bold text-gray-900 mb-8 text-center">カテゴリー</h3>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            @foreach($categories as $category)
            <div class="{{ $category['color'] }} text-white p-6 rounded-lg text-center hover:opacity-90 transition-opacity cursor-pointer">
                <i class="{{ $category['icon'] ?? 'fas fa-folder' }} text-2xl mb-2"></i>
                <div class="font-semibold">{{ $category['name'] }}</div>
                <div class="text-sm opacity-90">{{ $category['count'] }}件</div>
            </div>
            @endforeach
        </div>
    </div>
</section>

<!-- How it Works -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-3xl font-bold text-gray-900 mb-8 text-center">使い方</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
                <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-user-plus text-2xl text-blue-600"></i>
                </div>
                <h4 class="text-xl font-semibold text-gray-900 mb-2">1. アカウント作成</h4>
                <p class="text-gray-600">無料でアカウントを作成して、アンケートに参加しましょう</p>
            </div>
            <div class="text-center">
                <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-clipboard-list text-2xl text-green-600"></i>
                </div>
                <h4 class="text-xl font-semibold text-gray-900 mb-2">2. アンケート回答</h4>
                <p class="text-gray-600">興味のあるアンケートを選んで、簡単に回答できます</p>
            </div>
            <div class="text-center">
                <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-gift text-2xl text-purple-600"></i>
                </div>
                <h4 class="text-xl font-semibold text-gray-900 mb-2">3. ポイント獲得</h4>
                <p class="text-gray-600">回答完了でポイントが付与され、様々な特典と交換できます</p>
            </div>
        </div>
    </div>
</section>
@endsection