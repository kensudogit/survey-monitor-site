# Survey Monitor Site

## 📋 プロジェクト概要

Survey Monitorは、React + Viteで構築されたモダンなアンケートプラットフォームです。ユーザーはアンケートに回答してポイントを獲得し、企業は貴重な市場調査データを収集できます。

## 🎯 主要機能

### 🔐 認証システム
- **ユーザー登録・ログイン**: メールアドレスとパスワードによる認証
- **デモユーザー**: テスト用のデモアカウントで簡単に体験可能
- **セッション管理**: ローカルストレージを使用した永続的なログイン状態
- **パスワードハッシュ化**: セキュアなパスワード管理

### 📊 アンケート機能
- **アンケート一覧**: カテゴリー別に整理されたアンケート表示
- **インタラクティブ回答**: 単一選択・複数選択に対応した回答システム
- **進捗表示**: リアルタイムの進捗バーと質問数表示
- **完了画面**: アニメーション付きの完了通知

### 🏆 ポイントシステム
- **ポイント獲得**: アンケート完了時に自動でポイント付与
- **ダッシュボード**: 獲得ポイントと完了アンケート数の表示
- **統計情報**: ユーザーの活動履歴とパフォーマンス

### 🎨 UI/UX機能
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **モダンなデザイン**: Tailwind CSSによる美しいUI
- **アニメーション**: ホバー効果とトランジション
- **グラスモーフィズム**: モダンなガラス効果デザイン

## 🛠 技術スタック

### フロントエンド
- **React 18**: 最新のReact機能とHooks
- **Vite 4**: 高速な開発サーバーとビルドツール
- **React Router DOM 6**: クライアントサイドルーティング
- **Tailwind CSS 3**: ユーティリティファーストCSS
- **Font Awesome 6**: アイコンライブラリ
- **Inter Font**: モダンなタイポグラフィ

### 状態管理
- **React Context API**: グローバル状態管理
- **LocalStorage**: データ永続化
- **Custom Hooks**: 再利用可能なロジック

### 開発・デプロイ
- **Vite**: 高速ビルドとHMR
- **PostCSS**: CSS処理
- **Autoprefixer**: ベンダープレフィックス自動追加
- **Vercel**: クラウドデプロイメント
- **Git**: バージョン管理

### パフォーマンス
- **Code Splitting**: 自動的なコード分割
- **Tree Shaking**: 未使用コードの除去
- **Gzip圧縮**: アセットの最適化
- **CDN配信**: 高速なアセット配信

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
├── src/                    # ソースコード
│   ├── components/         # Reactコンポーネント
│   │   ├── Header.jsx      # ヘッダーコンポーネント
│   │   └── Footer.jsx      # フッターコンポーネント
│   ├── pages/              # ページコンポーネント
│   │   ├── Home.jsx        # ホームページ
│   │   ├── Login.jsx       # ログインページ
│   │   ├── Register.jsx    # 新規登録ページ
│   │   ├── Surveys.jsx     # アンケート一覧
│   │   ├── Category.jsx     # カテゴリーページ
│   │   ├── Dashboard.jsx   # ダッシュボード
│   │   └── Survey.jsx      # アンケート回答ページ
│   ├── contexts/           # React Context
│   │   └── AuthContext.jsx # 認証状態管理
│   ├── App.jsx             # メインアプリケーション
│   ├── main.jsx            # エントリーポイント
│   └── index.css           # グローバルスタイル
├── public/                 # 静的ファイル
│   └── PC.png             # ロゴ画像
├── dist/                   # ビルド出力
├── index.html              # HTMLテンプレート
├── package.json            # 依存関係とスクリプト
├── vite.config.js          # Vite設定
├── tailwind.config.js      # Tailwind CSS設定
├── postcss.config.js       # PostCSS設定
├── vercel.json             # Vercel設定
└── README.md               # このファイル
```

## 🛠 セットアップ手順

### 1. リポジトリのクローン
```bash
git clone https://github.com/YOUR_USERNAME/survey-monitor-site.git
cd survey-monitor-site
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 開発サーバーの起動
```bash
npm run dev
```
開発サーバーが起動し、`http://localhost:3000`でアクセス可能

### 4. プロダクションビルド
```bash
npm run build
```

### 5. プレビュー
```bash
npm run preview
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