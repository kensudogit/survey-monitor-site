@extends('layouts.app')

@section('title', 'Survey Monitor - 現代的で魅力的なアンケートモニターサイト')

@section('content')
<!-- Hero Section -->
<section class="bg-gradient-primary text-white py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
                あなたの意見が<br>
                <span class="text-yellow-300">価値</span>になります
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-blue-100">
                現代的で魅力的なアンケートモニターサイト<br>
                簡単に参加してポイントを獲得しよう
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                @auth
                    <a href="{{ route('dashboard') }}" class="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
                        ダッシュボードへ
                    </a>
                @else
                    <a href="{{ route('register') }}" class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
                        無料で始める
                    </a>
                    <a href="{{ route('surveys.index') }}" class="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
                        アンケートを見る
                    </a>
                @endauth
            </div>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
                <div class="text-4xl font-bold text-blue-600 mb-2">{{ number_format($stats['total_surveys']) }}</div>
                <div class="text-gray-600">開催中アンケート</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-green-600 mb-2">{{ number_format($stats['total_users']) }}</div>
                <div class="text-gray-600">登録モニター</div>
            </div>
            <div class="text-center">
                <div class="text-4xl font-bold text-purple-600 mb-2">{{ number_format($stats['total_responses']) }}</div>
                <div class="text-gray-600">総回答数</div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Surveys Section -->
@if($featuredSurveys->count() > 0)
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">おすすめアンケート</h2>
            <p class="text-lg text-gray-600">今すぐ参加できる注目のアンケート</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($featuredSurveys as $survey)
            <div class="survey-card group">
                <div class="flex items-start justify-between mb-4">
                    <div class="category-badge" style="background-color: {{ $survey->category->color }}20; color: {{ $survey->category->color }};">
                        {{ $survey->category->name }}
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="points-badge">{{ number_format($survey->reward_points) }}pt</span>
                        <span class="time-badge">{{ $survey->estimated_time }}分</span>
                    </div>
                </div>
                
                <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {{ $survey->title }}
                </h3>
                
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                    {{ Str::limit($survey->description, 100) }}
                </p>
                
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-500">
                        残り: {{ $survey->max_responses - $survey->current_responses }}名
                    </div>
                    <a href="{{ route('survey.show', $survey) }}" class="btn-primary text-sm">
                        詳細を見る
                    </a>
                </div>
            </div>
            @endforeach
        </div>
        
        <div class="text-center mt-8">
            <a href="{{ route('surveys.index') }}" class="btn-secondary">
                すべてのアンケートを見る
            </a>
        </div>
    </div>
</section>
@endif

<!-- Categories Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">カテゴリから探す</h2>
            <p class="text-lg text-gray-600">興味のある分野のアンケートを見つけよう</p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @foreach($categories as $category)
            <a href="{{ route('surveys.index', ['category' => $category->id]) }}" 
               class="card text-center hover:shadow-md transition-shadow duration-200 group">
                <div class="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                    @switch($category->icon)
                        @case('home')
                            🏠
                            @break
                        @case('shopping-cart')
                            🛒
                            @break
                        @case('laptop')
                            💻
                            @break
                        @case('music')
                            🎵
                            @break
                        @case('heart')
                            ❤️
                            @break
                        @case('book')
                            📚
                            @break
                        @case('map')
                            🗺️
                            @break
                        @default
                            📋
                    @endswitch
                </div>
                <h3 class="font-semibold text-gray-900 mb-2">{{ $category->name }}</h3>
                <p class="text-sm text-gray-600">{{ Str::limit($category->description, 60) }}</p>
            </a>
            @endforeach
        </div>
    </div>
</section>

<!-- How it Works Section -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">簡単3ステップ</h2>
            <p class="text-lg text-gray-600">アンケートに参加してポイントを獲得</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
                <div class="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">無料登録</h3>
                <p class="text-gray-600">メールアドレスで簡単登録。ウェルカムボーナス1000ポイントをプレゼント！</p>
            </div>
            <div class="text-center">
                <div class="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">アンケート回答</h3>
                <p class="text-gray-600">興味のあるアンケートを選んで回答。所要時間は5〜30分程度です。</p>
            </div>
            <div class="text-center">
                <div class="bg-yellow-100 text-yellow-600 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">ポイント獲得</h3>
                <p class="text-gray-600">回答完了でポイントを獲得。1000ポイントから現金化可能です。</p>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
@guest
<section class="py-16 bg-blue-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">今すぐ始めよう！</h2>
        <p class="text-xl text-blue-100 mb-8">無料登録でウェルカムボーナス1000ポイントをプレゼント</p>
        <a href="{{ route('register') }}" class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200">
            無料で登録する
        </a>
    </div>
</section>
@endguest
@endsection

