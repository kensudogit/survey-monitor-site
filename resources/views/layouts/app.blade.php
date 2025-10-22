<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Survey Monitor')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <div class="flex items-center">
                    <a href="/" class="text-2xl font-bold text-gray-900">Survey Monitor</a>
                </div>
                <nav class="hidden md:flex space-x-8">
                    <a href="/" class="nav-link">ホーム</a>
                    <a href="/surveys" class="nav-link">アンケート一覧</a>
                    @auth
                        <a href="/dashboard" class="nav-link">ダッシュボード</a>
                    @endauth
                </nav>
                <div class="flex items-center space-x-4">
                    @auth
                        <span class="text-gray-700">{{ Auth::user()->name }}さん</span>
                        <a href="/profile" class="nav-link">プロフィール</a>
                        <form method="POST" action="/logout" class="inline">
                            @csrf
                            <button type="submit" class="btn-secondary">ログアウト</button>
                        </form>
                    @else
                        <a href="/login" class="nav-link">ログイン</a>
                        <a href="/register" class="btn-primary">新規登録</a>
                    @endauth
                </div>
            </div>
        </div>
    </header>

    <!-- Flash Messages -->
    @if(session('success'))
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 mx-4">
            {{ session('success') }}
        </div>
    @endif

    @if(session('error'))
        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
            {{ session('error') }}
        </div>
    @endif

    <!-- Main Content -->
    <main>
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h4 class="text-lg font-semibold mb-4">Survey Monitor</h4>
                    <p class="text-gray-400">あなたの意見が価値に変わります。アンケートでポイントを獲得しましょう。</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">サービス</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="/surveys" class="hover:text-white">アンケート一覧</a></li>
                        <li><a href="/dashboard" class="hover:text-white">ダッシュボード</a></li>
                        <li><a href="/profile" class="hover:text-white">プロフィール</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">サポート</h4>
                    <ul class="space-y-2 text-gray-400">
                        <li><a href="#" class="hover:text-white">ヘルプセンター</a></li>
                        <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
                        <li><a href="#" class="hover:text-white">利用規約</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">フォローする</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Survey Monitor. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>
