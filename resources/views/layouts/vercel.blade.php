<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Survey Monitor - 現代的で魅力的なアンケートモニターサイト')</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'sans': ['Inter', 'system-ui', 'sans-serif'],
                    },
                    colors: {
                        primary: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            200: '#bfdbfe',
                            300: '#93c5fd',
                            400: '#60a5fa',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a',
                        }
                    }
                }
            }
        }
    </script>
    
    <!-- Alpine.js -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    
    <!-- Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <!-- Additional styles -->
    @stack('styles')
</head>
<body class="bg-gray-50 font-sans">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="{{ route('home') }}" class="flex items-center">
                        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                            SM
                        </div>
                        <span class="ml-3 text-xl font-semibold text-gray-900">Survey Monitor</span>
                    </a>
                </div>

                <div class="flex items-center space-x-4">
                    <a href="{{ route('surveys.index') }}" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                        アンケート一覧
                    </a>
                    
                    @auth
                        <div class="flex items-center space-x-4">
                            <span class="text-sm text-gray-600">
                                ポイント: <span class="font-semibold text-yellow-600">{{ number_format(auth()->user()->points) }}</span>
                            </span>
                            <a href="{{ route('dashboard') }}" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                ダッシュボード
                            </a>
                            <form method="POST" action="{{ route('logout') }}" class="inline">
                                @csrf
                                <button type="submit" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                                    ログアウト
                                </button>
                            </form>
                        </div>
                    @else
                        <a href="{{ route('login') }}" class="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                            ログイン
                        </a>
                        <a href="{{ route('register') }}" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                            新規登録
                        </a>
                    @endauth
                </div>
            </div>
        </div>
    </nav>

    <!-- Flash Messages -->
    @if(session('success'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
            <span class="block sm:inline">{{ session('success') }}</span>
        </div>
    @endif

    @if(session('error'))
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mt-4" role="alert">
            <span class="block sm:inline">{{ session('error') }}</span>
        </div>
    @endif

    <!-- Main Content -->
    <main class="min-h-screen">
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">Survey Monitor</h3>
                    <p class="text-gray-300 text-sm">
                        現代的で魅力的なアンケートモニターサイト。あなたの意見が価値になります。
                    </p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">サービス</h4>
                    <ul class="space-y-2 text-sm text-gray-300">
                        <li><a href="{{ route('surveys.index') }}" class="hover:text-white">アンケート一覧</a></li>
                        <li><a href="#" class="hover:text-white">利用規約</a></li>
                        <li><a href="#" class="hover:text-white">プライバシーポリシー</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">サポート</h4>
                    <ul class="space-y-2 text-sm text-gray-300">
                        <li><a href="#" class="hover:text-white">よくある質問</a></li>
                        <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
                        <li><a href="#" class="hover:text-white">ヘルプ</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">アカウント</h4>
                    <ul class="space-y-2 text-sm text-gray-300">
                        @auth
                            <li><a href="{{ route('dashboard') }}" class="hover:text-white">ダッシュボード</a></li>
                            <li><a href="{{ route('profile') }}" class="hover:text-white">プロフィール</a></li>
                        @else
                            <li><a href="{{ route('login') }}" class="hover:text-white">ログイン</a></li>
                            <li><a href="{{ route('register') }}" class="hover:text-white">新規登録</a></li>
                        @endauth
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
                <p>&copy; {{ date('Y') }} Survey Monitor. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Scripts -->
    @stack('scripts')
</body>
</html>
