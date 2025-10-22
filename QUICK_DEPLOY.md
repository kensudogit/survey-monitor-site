# Survey Monitor - Vercel Quick Deploy

## 🚀 ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kensudogit/survey-monitor-site)

## 📋 デプロイ手順

### 1. Vercelボタンをクリック
上記の「Deploy with Vercel」ボタンをクリック

### 2. GitHubリポジトリをインポート
- GitHubアカウントでログイン
- `kensudogit/survey-monitor-site` リポジトリを選択
- 「Import」をクリック

### 3. プロジェクト設定
- **Project Name**: `survey-monitor-site`
- **Framework Preset**: `Other`
- **Root Directory**: `./`
- **Build Command**: `composer install --no-dev --optimize-autoloader`
- **Output Directory**: `public`

### 4. 環境変数の設定
「Environment Variables」タブで以下を追加：

#### 必須設定
```
APP_KEY=base64:your-generated-key-here
APP_ENV=production
APP_DEBUG=false
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

### 5. デプロイ実行
「Deploy」ボタンをクリック

## 🗄️ データベースの準備

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

## 🔧 デプロイ後の設定

### 1. カスタムドメイン（オプション）
- Vercelダッシュボード > Domains
- ドメインを追加
- DNS設定を更新

### 2. 環境変数の更新
- Production環境で環境変数を設定
- Preview環境でも同様に設定

### 3. データベースマイグレーション
デプロイ後、以下のSQLを実行：
```sql
-- database/schema.sql の内容を実行
```

## 📊 監視・分析

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

## 💰 コスト

### Vercel
- Hobby: 無料（制限あり）
- Pro: $20/月

### データベース
- PlanetScale: 無料枠あり
- Supabase: 無料枠あり

## 🎯 次のステップ

1. **デプロイ完了後**
   - サイトの動作確認
   - ユーザー登録テスト
   - アンケート機能テスト

2. **機能追加**
   - データ分析ダッシュボード
   - リアルタイム通知
   - モバイルアプリ

3. **最適化**
   - パフォーマンス改善
   - SEO最適化
   - セキュリティ強化
