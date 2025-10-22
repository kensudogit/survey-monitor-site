# Survey Monitor Site

現代的で魅力的なアンケートモニターサイト

## 🚀 ワンクリックデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kensudogit/survey-monitor-site)

## ✨ 機能

- 🎯 現代的で魅力的なUI/UX
- 📊 高度なデータ収集・解析
- 💰 ポイント報酬システム
- 🔐 安全なユーザー認証
- 📱 レスポンシブデザイン
- 🚀 高速パフォーマンス

## 🛠️ 技術スタック

- **Backend**: Laravel 10.x, PHP 8.2
- **Frontend**: Tailwind CSS, Alpine.js, Chart.js
- **Database**: MySQL 8.0
- **Deployment**: Vercel
- **Cache**: Redis

## 📋 セットアップ

### ローカル開発
```bash
# Docker環境の起動
docker-compose up -d

# アクセス
http://localhost:8081
```

### Vercelデプロイ
1. 上記の「Deploy with Vercel」ボタンをクリック
2. GitHubリポジトリをインポート
3. 環境変数を設定
4. デプロイ実行

詳細は [QUICK_DEPLOY.md](QUICK_DEPLOY.md) を参照

## 🗄️ データベース

### PlanetScale（推奨）
- 無料枠あり
- 自動スケーリング
- ブランチ機能

### Supabase（代替案）
- PostgreSQL
- 無料枠あり
- リアルタイム機能

## 📊 監視・分析

- Vercel Analytics
- Google Analytics
- パフォーマンス監視
- エラー追跡

## 🔧 開発

### 必要な環境
- PHP 8.2+
- Composer
- Node.js 18+
- Docker

### 開発コマンド
```bash
# 依存関係のインストール
composer install
npm install

# 開発サーバーの起動
php artisan serve
npm run dev
```

## 📄 ライセンス

MIT License

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します。

## 📞 サポート

問題が発生した場合は、GitHubのIssuesで報告してください。