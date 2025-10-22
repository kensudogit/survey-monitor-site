# Survey Monitor - Vercel完全公開デプロイ

## 🚀 ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kensudogit/survey-monitor-site)

## 📋 完全公開モードでのデプロイ手順

### 1. Vercelボタンをクリック
上記の「Deploy with Vercel」ボタンをクリック

### 2. GitHubリポジトリをインポート
- GitHubアカウントでログイン
- `kensudogit/survey-monitor-site` リポジトリを選択
- 「Import」をクリック

### 3. プロジェクト設定（完全公開モード）
- **Project Name**: `survey-monitor-site`
- **Framework Preset**: `Other`
- **Root Directory**: `./`
- **Build Command**: `composer install --no-dev --optimize-autoloader --no-interaction && npm run build`
- **Output Directory**: `public`
- **Install Command**: `composer install --no-dev --optimize-autoloader --no-interaction`

### 4. 環境変数の設定（必須）
「Environment Variables」タブで以下を追加：

#### 基本設定
```
APP_NAME=Survey Monitor
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:your-generated-key-here
```

#### データベース設定（PlanetScale推奨）
```
DB_CONNECTION=mysql
DB_HOST=your-planetscale-host
DB_PORT=3306
DB_DATABASE=survey_monitor
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

#### ログ設定
```
LOG_CHANNEL=stack
LOG_LEVEL=error
```

### 5. デプロイ実行
「Deploy」ボタンをクリック

## 🗄️ データベースの準備（完全公開用）

### PlanetScale（推奨）
1. [planetscale.com](https://planetscale.com) でアカウント作成
2. 「Create database」をクリック
3. データベース名: `survey_monitor`
4. 「Create database」をクリック
5. 「Connect」をクリックして接続情報を取得
6. Vercel環境変数に設定

### Supabase（代替案）
1. [supabase.com](https://supabase.com) でアカウント作成
2. 「New project」をクリック
3. プロジェクト名: `survey-monitor`
4. データベースパスワードを設定
5. 「Create new project」をクリック
6. Settings > Database で接続情報を取得

## 🔧 完全公開モードの設定

### 1. カスタムドメイン設定
- Vercelダッシュボード > Domains
- ドメインを追加（例: `survey-monitor.com`）
- DNS設定を更新

### 2. 環境変数の本番設定
- Production環境で環境変数を設定
- Preview環境でも同様に設定

### 3. データベースマイグレーション
デプロイ後、以下のSQLを実行：
```sql
-- database/schema.sql の内容を実行
```

### 4. サンプルデータの投入
```bash
# データベースにサンプルデータを投入
php artisan db:seed
```

## 📊 監視・分析（完全公開用）

### Vercel Analytics
- 自動でページビューを追跡
- パフォーマンスメトリクス
- エラー追跡

### 外部ツール連携
- Google Analytics
- Hotjar
- Sentry

## 🚨 トラブルシューティング

### よくある問題

1. **Build Error**
   - composer.jsonの確認
   - PHPバージョンの確認

2. **Database Connection Error**
   - 環境変数の確認
   - データベースの接続テスト

3. **404 Error**
   - vercel.jsonの設定確認
   - ルーティングの確認

### ログの確認
- Vercelダッシュボード > Functions
- ログを確認してエラーを特定

## 💰 コスト（完全公開）

### Vercel
- Hobby: 無料（制限あり）
- Pro: $20/月（推奨）

### データベース
- PlanetScale: 無料枠あり
- Supabase: 無料枠あり

## 🎯 完全公開後の確認事項

1. **サイトの動作確認**
   - ホームページが表示される
   - レスポンシブデザインが機能する
   - アンケート一覧が表示される

2. **データベース接続確認**
   - ユーザー登録ができる
   - アンケート機能が動作する

3. **パフォーマンス確認**
   - ページ読み込み速度
   - CDN配信の確認

4. **セキュリティ確認**
   - HTTPS接続
   - セキュリティヘッダー

## 🔗 公開URL

デプロイ完了後、以下のURLでアクセス可能：
- `https://survey-monitor-site.vercel.app`
- カスタムドメイン（設定した場合）

## 📞 サポート

問題が発生した場合は、GitHubのIssuesで報告してください。
