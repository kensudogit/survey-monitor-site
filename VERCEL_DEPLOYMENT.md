# Survey Monitor - Vercel Deployment Guide

## 🚀 Vercelデプロイ手順

### 1. Vercel CLIのインストール
```bash
npm install -g vercel
```

### 2. Vercelにログイン
```bash
vercel login
```

### 3. プロジェクトの初期化
```bash
cd C:\devlop\survey-monitor-site
vercel
```

### 4. 環境変数の設定
Vercelダッシュボードで以下の環境変数を設定：

#### データベース設定
```
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=survey_monitor
DB_USERNAME=your-username
DB_PASSWORD=your-password
```

#### アプリケーション設定
```
APP_KEY=your-app-key
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-project.vercel.app
```

#### Redis設定（オプション）
```
REDIS_HOST=your-redis-host
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password
```

### 5. データベースの準備

#### PlanetScale（推奨）
1. [PlanetScale](https://planetscale.com)でアカウント作成
2. 新しいデータベース作成
3. 接続文字列を取得
4. Vercel環境変数に設定

#### Supabase（代替案）
1. [Supabase](https://supabase.com)でアカウント作成
2. 新しいプロジェクト作成
3. PostgreSQL接続情報を取得
4. Laravel設定をPostgreSQL用に変更

### 6. デプロイ実行
```bash
vercel --prod
```

## 📁 ファイル構成

```
survey-monitor-site/
├── vercel.json          # Vercel設定
├── public/
│   └── index.php        # エントリーポイント
├── resources/
│   └── views/
│       ├── layouts/
│       │   └── vercel.blade.php  # Vercel用レイアウト
│       └── vercel-home.blade.php # Vercel用ホームページ
└── database/
    └── schema.sql       # データベーススキーマ
```

## 🔧 設定の最適化

### 1. パフォーマンス最適化
- CDN配信の活用
- 画像の最適化
- キャッシュの設定

### 2. セキュリティ設定
- HTTPS強制
- セキュリティヘッダーの設定
- CSRF保護

### 3. 監視・ログ
- Vercel Analytics
- Error Tracking
- Performance Monitoring

## 🌐 カスタムドメイン設定

### 1. ドメインの追加
```bash
vercel domains add your-domain.com
```

### 2. DNS設定
- Aレコード: 76.76.19.61
- CNAME: cname.vercel-dns.com

## 📊 監視・分析

### Vercel Analytics
- ページビュー
- パフォーマンス
- エラー追跡

### 外部ツール連携
- Google Analytics
- Hotjar
- Sentry

## 🔄 CI/CD設定

### GitHub連携
1. GitHubリポジトリにプッシュ
2. 自動デプロイ実行
3. プレビューデプロイ

### 環境分離
- Production: mainブランチ
- Staging: developブランチ
- Preview: featureブランチ

## 💰 コスト最適化

### Vercel料金プラン
- Hobby: 無料（制限あり）
- Pro: $20/月
- Enterprise: カスタム

### データベース料金
- PlanetScale: 無料枠あり
- Supabase: 無料枠あり

## 🚨 トラブルシューティング

### よくある問題
1. **環境変数が読み込まれない**
   - Vercelダッシュボードで再設定
   - デプロイ後の再起動

2. **データベース接続エラー**
   - 接続文字列の確認
   - ファイアウォール設定

3. **静的ファイルが表示されない**
   - publicディレクトリの確認
   - パスの設定

### ログの確認
```bash
vercel logs
```
