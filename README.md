# Survey Monitor Site - Vercel Deployment

## 🚀 デプロイ手順

### 1. GitHubリポジトリの作成

1. GitHubで新しいリポジトリを作成: `survey-monitor-site`
2. ローカルでGitを初期化:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Survey Monitor Site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/survey-monitor-site.git
   git push -u origin main
   ```

### 2. Vercelでのデプロイ

1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでログイン
3. "New Project"をクリック
4. `survey-monitor-site`リポジトリを選択
5. プロジェクト設定:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `public`
6. Environment Variablesを設定:
   - `APP_KEY`: `base64:your-generated-key`
   - `APP_ENV`: `production`
   - `APP_DEBUG`: `false`
7. "Deploy"をクリック

### 3. デプロイ完了

デプロイが完了すると、以下のようなURLでアクセス可能になります:
- `https://survey-monitor-site.vercel.app`
- `https://survey-monitor-site-git-main-your-username.vercel.app`

## 📁 プロジェクト構造

```
survey-monitor-site/
├── public/
│   ├── index.html          # メインの静的サイト
│   └── favicon.ico         # ファビコン
├── vercel.json             # Vercel設定
├── package.json            # Node.js依存関係
├── .gitignore             # Git除外ファイル
└── README.md              # このファイル
```

## 🎯 機能

- ✅ レスポンシブデザイン
- ✅ モダンなUI（Tailwind CSS）
- ✅ アンケート一覧表示
- ✅ カテゴリー別表示
- ✅ 統計情報表示
- ✅ 使い方ガイド

## 🔧 カスタマイズ

### 色の変更
`public/index.html`内のTailwind CSSクラスを変更

### コンテンツの変更
`public/index.html`内のHTMLを直接編集

### 画像の変更
Unsplashの画像URLを変更

## 📱 レスポンシブ対応

- モバイル: 320px以上
- タブレット: 768px以上
- デスクトップ: 1024px以上

## 🌐 公開URL

デプロイ完了後、以下のURLでアクセス可能:
- **本番URL**: `https://survey-monitor-site.vercel.app`
- **プレビューURL**: `https://survey-monitor-site-git-main-your-username.vercel.app`

## 📞 サポート

問題が発生した場合:
1. Vercelダッシュボードでログを確認
2. GitHubのIssuesで報告
3. 設定を再確認

---

**Survey Monitor** - あなたの意見が価値に変わります