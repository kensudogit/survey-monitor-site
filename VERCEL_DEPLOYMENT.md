# Survey Monitor Site - Vercel Deployment Guide

## デプロイ手順

### 1. GitHubリポジトリの作成

```bash
cd C:\devlop\survey-monitor-site
git init
git add .
git commit -m "Initial commit: Survey Monitor Site"
git branch -M main
git remote add origin https://github.com/your-username/survey-monitor-site.git
git push -u origin main
```

### 2. Vercelでのデプロイ

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでログイン
3. "New Project"をクリック
4. GitHubリポジトリを選択
5. プロジェクト設定:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `public`
6. Environment Variablesを設定:
   - `APP_KEY`: `base64:your-generated-key`
   - `APP_ENV`: `production`
   - `APP_DEBUG`: `false`
7. "Deploy"をクリック

### 3. 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定:

```
APP_NAME=Survey Monitor
APP_ENV=production
APP_KEY=base64:your-generated-key
APP_DEBUG=false
APP_URL=https://your-domain.vercel.app
LOG_CHANNEL=stack
LOG_LEVEL=error
```

### 4. データベース設定（オプション）

本番環境でデータベースを使用する場合:

```
DB_CONNECTION=mysql
DB_HOST=your-db-host
DB_PORT=3306
DB_DATABASE=your-db-name
DB_USERNAME=your-db-user
DB_PASSWORD=your-db-password
```

## トラブルシューティング

### 404エラーの場合
- `vercel.json`の設定を確認
- ルートディレクトリが正しく設定されているか確認

### ビルドエラーの場合
- `package.json`の依存関係を確認
- Node.jsのバージョンを確認

### 静的ファイルが読み込まれない場合
- `public`ディレクトリの設定を確認
- アセットのパスを確認

## 注意事項

- Vercelは静的サイトホスティングに最適化されています
- Laravelの動的機能（データベース、セッション等）は制限があります
- 本格的なLaravelアプリケーションにはHeroku、AWS、GCP等の推奨
