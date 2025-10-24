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

### 🤖 AI分析・集計処理システム（強化版）

#### **リアルタイム分析エンジン**
- **即座のデータ処理**: アンケート回答をリアルタイムで分析
- **自動統計計算**: 完了率、品質スコア、平均時間の自動算出
- **パフォーマンス監視**: アンケートの効果性を継続的に監視
- **異常検知**: 回答パターンの異常を自動検出

#### **AI パワード インサイト生成**
- **機械学習分析**: 回答データから自動的にインサイトを生成
- **感情分析**: 日本語テキストの感情分析（ポジティブ/ネガティブ/ニュートラル）
- **品質スコアリング**: 回答の詳細度、一貫性、信頼性を評価
- **予測分析**: 回答パターンの予測とトレンド分析

#### **高度な可視化機能**
- **インタラクティブチャート**: ライン、バー、パイ、エリア、ドーナツチャート
- **リアルタイム更新**: データの変更を即座に反映
- **アニメーション効果**: 滑らかなチャート描画とホバー効果
- **レスポンシブチャート**: デバイスサイズに応じた最適表示

#### **包括的レポート生成**
- **多形式出力**: PDF、Excel、CSV、JSON形式でのレポート生成
- **自動レポート**: スケジュールに基づく定期レポート作成
- **カスタマイズ可能**: レポート内容の柔軟なカスタマイズ
- **配信機能**: メールやダウンロードでの自動配信

#### **デモグラフィック分析**
- **年齢分布**: 回答者の年齢層別分析
- **性別分析**: 性別による回答傾向の分析
- **登録期間分析**: ユーザーの登録期間別の行動パターン
- **地域分析**: 地域別の回答傾向（将来拡張予定）

#### **品質管理システム**
- **回答検証**: 回答の妥当性を自動チェック
- **重複検出**: 重複回答の自動検出と除外
- **品質スコア**: 総合的な回答品質の数値化
- **改善提案**: 品質向上のための具体的な推奨事項

#### **セキュリティ・プライバシー保護**
- **データ暗号化**: 個人情報の暗号化保存
- **アクセス制御**: ロールベースのアクセス管理
- **監査ログ**: データアクセスの完全な記録
- **GDPR準拠**: 個人情報保護規制への対応

## 🛠 技術スタック

### フロントエンド
- **React 18**: 最新のReact機能とHooks
- **Vite 4**: 高速な開発サーバーとビルドツール
- **React Router DOM 6**: クライアントサイドルーティング
- **Tailwind CSS 3**: ユーティリティファーストCSS
- **Font Awesome 6**: アイコンライブラリ
- **Inter Font**: モダンなタイポグラフィ

### AI分析・集計処理システム
- **Laravel 10**: PHP バックエンドフレームワーク
- **Eloquent ORM**: データベース操作
- **Laravel Sanctum**: API認証
- **Carbon**: 日時処理
- **JSON**: 柔軟なデータ保存
- **Custom Services**: 分析ロジックの分離

### データベース設計
- **MySQL**: メインデータベース
- **SQLite**: 開発・テスト環境
- **JSON Columns**: 柔軟なデータ構造
- **Indexes**: パフォーマンス最適化
- **Foreign Keys**: データ整合性保証

### 分析・可視化
- **CSS Animations**: チャートアニメーション
- **SVG Graphics**: ベクターグラフィック
- **Canvas API**: 高度な描画処理
- **Chart.js**: チャートライブラリ（将来実装）
- **D3.js**: データ可視化（将来実装）

### 状態管理
- **React Context API**: グローバル状態管理
- **LocalStorage**: データ永続化
- **Custom Hooks**: 再利用可能なロジック
- **Theme Context**: ダークモード管理

### 開発・デプロイ
- **Vite**: 高速ビルドとHMR
- **PostCSS**: CSS処理
- **Autoprefixer**: ベンダープレフィックス自動追加
- **Vercel**: クラウドデプロイメント
- **Git**: バージョン管理
- **Docker**: コンテナ化（オプション）

### パフォーマンス
- **Code Splitting**: 自動的なコード分割
- **Tree Shaking**: 未使用コードの除去
- **Gzip圧縮**: アセットの最適化
- **CDN配信**: 高速なアセット配信
- **Lazy Loading**: 遅延読み込み
- **Memoization**: レンダリング最適化

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
│   │   ├── Footer.jsx      # フッターコンポーネント
│   │   ├── MetricCard.jsx  # メトリクスカード
│   │   ├── InsightCard.jsx # AIインサイトカード
│   │   └── ModernChart.jsx # モダンチャート
│   ├── pages/              # ページコンポーネント
│   │   ├── Home.jsx        # ホームページ
│   │   ├── Login.jsx       # ログインページ
│   │   ├── Register.jsx    # 新規登録ページ
│   │   ├── Surveys.jsx     # アンケート一覧
│   │   ├── Category.jsx     # カテゴリーページ
│   │   ├── Dashboard.jsx   # ダッシュボード
│   │   ├── AnalyticsDashboard.jsx # AI分析ダッシュボード
│   │   └── Survey.jsx      # アンケート回答ページ
│   ├── contexts/           # React Context
│   │   ├── AuthContext.jsx # 認証状態管理
│   │   └── ThemeContext.jsx # テーマ管理
│   ├── styles/             # スタイルファイル
│   │   └── modern-design.css # モダンデザインシステム
│   ├── App.jsx             # メインアプリケーション
│   ├── main.jsx            # エントリーポイント
│   └── index.css           # グローバルスタイル
├── app/                    # Laravel バックエンド
│   ├── Http/Controllers/   # APIコントローラー
│   │   ├── SurveyController.php
│   │   └── SurveyAnalyticsController.php
│   ├── Models/             # データモデル
│   │   ├── Survey.php
│   │   ├── SurveyAnalytics.php
│   │   ├── SurveyInsight.php
│   │   └── SurveyReport.php
│   ├── Services/           # ビジネスロジック
│   │   ├── SurveyAnalyticsService.php
│   │   └── ReportGenerationService.php
│   └── Console/Commands/   # Artisanコマンド
│       └── GenerateAnalytics.php
├── database/               # データベース
│   ├── migrations/         # マイグレーション
│   ├── schema.sql         # データベーススキーマ
│   └── seeders/           # シーダー
├── routes/                 # ルート定義
│   └── api.php            # APIルート
├── public/                 # 静的ファイル
│   └── PC.png             # ロゴ画像
├── dist/                   # ビルド出力
├── index.html              # HTMLテンプレート
├── package.json            # 依存関係とスクリプト
├── composer.json           # PHP依存関係
├── vite.config.js          # Vite設定
├── tailwind.config.js      # Tailwind CSS設定
├── postcss.config.js       # PostCSS設定
├── vercel.json             # Vercel設定
├── deploy-vercel.bat       # Windowsデプロイスクリプト
├── deploy-vercel.sh        # Linux/Macデプロイスクリプト
├── ANALYTICS_SYSTEM.md     # AI分析システム詳細
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

### 基本機能
- ✅ レスポンシブデザイン
- ✅ モダンなUI（Tailwind CSS）
- ✅ アンケート一覧表示
- ✅ カテゴリー別表示
- ✅ 統計情報表示
- ✅ 使い方ガイド

### AI分析・集計処理機能
- ✅ リアルタイム分析エンジン
- ✅ AI パワード インサイト生成
- ✅ 感情分析（日本語対応）
- ✅ 品質スコアリング
- ✅ デモグラフィック分析
- ✅ インタラクティブチャート
- ✅ 多形式レポート生成
- ✅ 自動レポート配信
- ✅ 異常検知システム
- ✅ 予測分析機能
- ✅ ダークモード対応
- ✅ ガラスモーフィズムUI
- ✅ マイクロインタラクション
- ✅ セキュリティ・プライバシー保護

## 📊 AI分析システム詳細

### 分析メトリクス
- **完了率**: アンケートの完了率を自動計算
- **品質スコア**: 回答の詳細度、一貫性、信頼性を評価
- **平均完了時間**: 回答にかかった時間の分析
- **感情スコア**: 感情分析結果の数値化
- **デモグラフィック分布**: 年齢、性別、登録期間別の分析

### AI インサイト
- **自動推奨事項**: 完了率向上、品質改善のための具体的提案
- **異常検知**: 回答パターンの異常を自動検出
- **信頼度スコア**: AI インサイトの信頼性を数値で評価
- **カテゴリ別分析**: インサイトタイプ別の分類

### レポート機能
- **PDF レポート**: 包括的な分析レポート
- **Excel エクスポート**: データ分析用スプレッドシート
- **CSV ダウンロード**: データエクスポート用
- **JSON API**: API 連携用データ形式

## 🔧 API エンドポイント

### 分析 API
```http
GET /api/analytics/dashboard              # ダッシュボードデータ
GET /api/analytics/survey/{id}/analytics  # アンケート分析
GET /api/analytics/survey/{id}/insights   # AI インサイト
GET /api/analytics/survey/{id}/performance # パフォーマンス指標
GET /api/analytics/survey/{id}/filtered-data # フィルタリングされたデータ
POST /api/analytics/survey/{id}/generate-report # レポート生成
GET /api/analytics/report/{id}/download   # レポートダウンロード
```

### 認証
すべての API エンドポイントは `auth:sanctum` ミドルウェアで保護されています。

## 🚀 デプロイ済みURL（完全公開モード）

### 🌐 本番環境
- **最新デプロイ**: [https://survey-monitor-site-1za8glkrt-kensudogits-projects.vercel.app](https://survey-monitor-site-1za8glkrt-kensudogits-projects.vercel.app)
- **メインサイト**: [https://survey-monitor-site.vercel.app](https://survey-monitor-site.vercel.app)
- **プレビュー**: [https://survey-monitor-site-git-main-kensudogits-projects.vercel.app](https://survey-monitor-site-git-main-kensudogits-projects.vercel.app)

### 📊 デプロイ情報
- **デプロイ時間**: 約7秒（高速デプロイ）
- **ビルド時間**: 約4秒（最適化済み）
- **ステータス**: ✅ Ready（正常稼働中）
- **環境**: Production（本番環境）
- **公開設定**: 完全公開モード（誰でもアクセス可能）

### 🔧 機能確認
1. **ホームページ**: プロジェクト概要と機能紹介
2. **ログイン**: デモユーザーでログイン可能
3. **アンケート一覧**: カテゴリー別アンケート表示
4. **AI分析ダッシュボード**: `/analytics` でアクセス
5. **ダークモード**: ヘッダーのテーマ切り替えボタン
6. **API エンドポイント**: `/api/surveys.json` でデータ取得

## 📈 パフォーマンス指標

### ビルド最適化
- **バンドルサイズ**: 267.66 kB (gzip: 65.60 kB)
- **チャンク分割**: vendor, router, index の3チャンク
- **圧縮率**: 約75%の圧縮効果
- **読み込み時間**: 2.18秒でビルド完了

### ランタイム最適化
- **コード分割**: 自動的な遅延読み込み
- **メモ化**: レンダリング最適化
- **キャッシュ**: 静的アセットの長期キャッシュ
- **CDN**: VercelのグローバルCDN配信

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

### 技術サポート
問題が発生した場合:
1. Vercelダッシュボードでログを確認
2. GitHubのIssuesで報告
3. 設定を再確認

### AI分析システムサポート
- **ドキュメント**: `ANALYTICS_SYSTEM.md` を参照
- **API ドキュメント**: 各エンドポイントの詳細仕様
- **トラブルシューティング**: よくある問題と解決策
- **パフォーマンス監視**: リアルタイムメトリクス

### 開発者向け情報
- **コントリビューション**: プルリクエスト歓迎
- **コードスタイル**: ESLint設定に従う
- **テスト**: 単体テストと統合テスト
- **ドキュメント**: コード内コメントとREADME

---

**Survey Monitor AI** - Domo.AI パワード アンケート分析システム

あなたの意見が価値に変わり、AI がそれを分析し、インサイトを提供します。