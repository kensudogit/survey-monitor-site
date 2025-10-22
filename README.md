# Survey Monitor Site - Docker Setup

## 概要
現代的で魅力的なアンケートモニターサイトのDocker環境です。
Laravel、MySQL、Nginx、Redisを使用した完全な開発環境を提供します。

## 技術スタック
- **Backend**: Laravel 10.x, PHP 8.2
- **Database**: MySQL 8.0
- **Web Server**: Nginx
- **Cache/Session**: Redis
- **Frontend**: Tailwind CSS, Alpine.js, Chart.js
- **Container**: Docker & Docker Compose

## セットアップ手順

### 1. Docker環境の起動
```bash
# Docker Composeでサービスを起動
docker-compose up -d

# ログを確認
docker-compose logs -f
```

### 2. Laravelアプリケーションの初期設定
```bash
# コンテナ内でLaravelの初期設定を実行
docker-compose exec app composer install
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed
```

### 3. フロントエンドアセットのビルド
```bash
# Node.js依存関係のインストールとビルド
docker-compose exec app npm install
docker-compose exec app npm run build
```

### 4. アクセスURL
- **メインサイト**: http://localhost
- **phpMyAdmin**: http://localhost:8080
- **MySQL**: localhost:3306

## サービス構成

### MySQL (ポート: 3306)
- データベース名: `survey_monitor`
- ユーザー名: `laravel_user`
- パスワード: `laravel_password`
- 初期データ: `database/schema.sql`が自動実行されます

### Nginx (ポート: 80)
- LaravelアプリケーションのWebサーバー
- 静的ファイルの配信
- PHP-FPMとの連携

### Redis (ポート: 6379)
- セッション管理
- キャッシュ
- キュー管理

### PHP-FPM (ポート: 9000)
- Laravelアプリケーションの実行環境
- PHP 8.2 + 必要な拡張機能

## 開発コマンド

### コンテナ操作
```bash
# サービス起動
docker-compose up -d

# サービス停止
docker-compose down

# ログ確認
docker-compose logs -f [service_name]

# コンテナ内でコマンド実行
docker-compose exec app [command]
```

### Laravel Artisan コマンド
```bash
# マイグレーション実行
docker-compose exec app php artisan migrate

# シーダー実行
docker-compose exec app php artisan db:seed

# キャッシュクリア
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan route:clear
docker-compose exec app php artisan view:clear

# アプリケーションキー生成
docker-compose exec app php artisan key:generate
```

### フロントエンド開発
```bash
# 開発モード（ホットリロード）
docker-compose exec app npm run dev

# プロダクションビルド
docker-compose exec app npm run build

# ファイル監視ビルド
docker-compose exec app npm run watch
```

## データベース設計

### 主要テーブル
- `users`: ユーザー情報（拡張プロフィール含む）
- `survey_categories`: アンケートカテゴリ
- `surveys`: アンケート情報
- `survey_questions`: アンケート質問
- `survey_responses`: ユーザーの回答
- `survey_answers`: 個別質問への回答
- `user_points_history`: ポイント履歴
- `user_earnings_history`: 収益履歴
- `notifications`: 通知
- `site_settings`: サイト設定

## セキュリティ設定

### Nginx
- セキュリティヘッダーの設定
- 隠しファイルへのアクセス拒否
- Gzip圧縮の有効化

### PHP
- OPcacheの最適化
- セッションセキュリティの強化
- エラー表示の無効化

## トラブルシューティング

### よくある問題

1. **ポート競合**
   ```bash
   # 使用中のポートを確認
   netstat -an | findstr :80
   netstat -an | findstr :3306
   ```

2. **権限エラー**
   ```bash
   # ストレージディレクトリの権限設定
   docker-compose exec app chmod -R 755 storage
   docker-compose exec app chmod -R 755 bootstrap/cache
   ```

3. **データベース接続エラー**
   ```bash
   # MySQLコンテナの状態確認
   docker-compose ps mysql
   docker-compose logs mysql
   ```

4. **キャッシュ問題**
   ```bash
   # 全キャッシュをクリア
   docker-compose exec app php artisan optimize:clear
   ```

## 本番環境へのデプロイ

### 環境変数の設定
```bash
# .envファイルを本番用に編集
APP_ENV=production
APP_DEBUG=false
DB_HOST=your_production_db_host
# その他の本番設定...
```

### 最適化
```bash
# アプリケーションの最適化
docker-compose exec app php artisan config:cache
docker-compose exec app php artisan route:cache
docker-compose exec app php artisan view:cache
```

## 開発ワークフロー

1. **機能開発**
   - ブランチ作成
   - 機能実装
   - テスト実行
   - プルリクエスト

2. **データベース変更**
   - マイグレーション作成
   - マイグレーション実行
   - シーダー更新

3. **フロントエンド変更**
   - CSS/JSファイル編集
   - ビルド実行
   - ブラウザで確認

## サポート

問題が発生した場合は、以下の情報を含めて報告してください：
- Docker Composeのログ
- エラーメッセージ
- 実行したコマンド
- 環境情報（OS、Dockerバージョンなど）

"# survey-monitor-site" 
