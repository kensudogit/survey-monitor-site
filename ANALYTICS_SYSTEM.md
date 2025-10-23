# Survey Monitor - Domo.AI パワード アンケート分析システム

## 概要

Survey Monitor は、[Domo.com](https://www.domo.com/) の AI とデータ分析プラットフォームにインスパイアされた、強力なアンケート集計・分析処理システムです。リアルタイム分析、AI インサイト生成、自動レポート作成などの高度な機能を提供します。

## 🚀 新機能

### 1. AI パワード分析エンジン
- **リアルタイム分析**: アンケート回答を即座に分析
- **感情分析**: 日本語テキストの感情分析機能
- **品質スコアリング**: 回答の品質を自動評価
- **予測分析**: 回答パターンの予測とトレンド分析

### 2. 高度なダッシュボード
- **インタラクティブチャート**: リアルタイムデータ可視化
- **KPI メトリクス**: パフォーマンス指標の自動計算
- **デモグラフィック分析**: 年齢、性別、登録期間別の分析
- **トレンド分析**: 時系列データの可視化

### 3. AI インサイト生成
- **自動推奨事項**: アンケート改善のための AI 推奨
- **異常検知**: 回答パターンの異常を自動検出
- **最適化提案**: 完了率向上のための具体的提案
- **信頼度スコア**: AI インサイトの信頼性評価

### 4. 包括的レポート生成
- **多形式対応**: PDF、Excel、CSV、JSON 形式での出力
- **自動レポート**: スケジュールに基づく自動レポート生成
- **カスタマイズ可能**: レポート内容の柔軟なカスタマイズ
- **配信機能**: メールやダッシュロードでの自動配信

## 📊 技術仕様

### バックエンド (Laravel)
```
app/
├── Models/
│   ├── SurveyAnalytics.php          # 分析データモデル
│   ├── SurveyInsight.php            # AI インサイトモデル
│   └── SurveyReport.php             # レポートモデル
├── Services/
│   ├── SurveyAnalyticsService.php   # 分析サービス
│   └── ReportGenerationService.php  # レポート生成サービス
└── Http/Controllers/
    └── SurveyAnalyticsController.php # 分析 API コントローラー
```

### フロントエンド (React)
```
src/
├── pages/
│   └── AnalyticsDashboard.jsx       # AI 分析ダッシュボード
└── components/
    └── (既存コンポーネント)
```

### データベース
```sql
-- 分析データテーブル
survey_analytics
├── survey_id
├── total_responses
├── completion_rate
├── average_completion_time
├── response_quality_score
├── demographic_breakdown (JSON)
├── question_analytics (JSON)
├── sentiment_analysis (JSON)
└── trend_data (JSON)

-- AI インサイトテーブル
survey_insights
├── survey_id
├── insight_type
├── title
├── description
├── confidence_score
├── data_points (JSON)
├── recommendations (JSON)
└── generated_by_ai

-- レポートテーブル
survey_reports
├── survey_id
├── report_type
├── title
├── file_path
├── file_format
├── generated_by
├── parameters (JSON)
└── status
```

## 🔧 セットアップ

### 1. 依存関係のインストール
```bash
# Laravel バックエンド
composer install

# React フロントエンド
npm install
```

### 2. データベースマイグレーション
```bash
php artisan migrate
```

### 3. 環境設定
```bash
cp .env.example .env
php artisan key:generate
```

### 4. アプリケーション起動
```bash
# バックエンド
php artisan serve

# フロントエンド
npm run dev
```

## 📈 API エンドポイント

### 分析 API
```http
GET /api/analytics/dashboard
GET /api/analytics/survey/{id}/analytics
GET /api/analytics/survey/{id}/insights
GET /api/analytics/survey/{id}/performance
GET /api/analytics/survey/{id}/filtered-data
POST /api/analytics/survey/{id}/generate-report
GET /api/analytics/report/{id}/download
```

### 認証
すべての API エンドポイントは `auth:sanctum` ミドルウェアで保護されています。

## 🤖 AI 機能詳細

### 1. 感情分析
日本語の回答テキストを分析し、以下の感情を検出：
- **ポジティブ**: 良い、満足、素晴らしい、便利、使いやすい
- **ネガティブ**: 悪い、不満、不便、使いにくい、問題
- **ニュートラル**: その他の回答

### 2. 品質スコアリング
回答の品質を以下の要素で評価：
- **完了率**: 全質問への回答率
- **回答長**: テキスト回答の詳細度
- **一貫性**: 類似回答の一貫性
- **信頼性**: 回答パターンの信頼性

### 3. 自動推奨事項
AI が以下の状況を検出し、推奨事項を生成：
- **低完了率**: 質問数削減、インセンティブ増加
- **低品質スコア**: 質問文の明確化、回答オプション改善
- **デモグラフィック偏り**: ターゲット層の拡大
- **異常パターン**: 回答の異常検知と対応策

## 📊 ダッシュボード機能

### 1. 概要メトリクス
- 総アンケート数
- 総回答数
- 平均完了率
- 平均品質スコア

### 2. リアルタイム分析
- 回答トレンド
- 完了率の変化
- 品質スコアの推移
- デモグラフィック分布

### 3. AI インサイト
- 自動生成された推奨事項
- 異常検知アラート
- 最適化提案
- 信頼度スコア

## 📄 レポート機能

### 1. 対応形式
- **PDF**: 包括的な分析レポート
- **Excel**: データ分析用スプレッドシート
- **CSV**: データエクスポート用
- **JSON**: API 連携用

### 2. レポート内容
- アンケート概要
- 分析サマリー
- AI インサイト
- 質問分析
- 回答トレンド
- デモグラフィック分析

### 3. 自動生成
- スケジュール設定
- メール配信
- ダッシュロード
- カスタマイズ可能

## 🔒 セキュリティ

### 1. 認証・認可
- Laravel Sanctum による API 認証
- ロールベースアクセス制御
- セッション管理

### 2. データ保護
- 個人情報の暗号化
- アクセスログ
- データバックアップ

### 3. API セキュリティ
- レート制限
- CORS 設定
- 入力検証

## 🚀 デプロイメント

### 1. Vercel デプロイ
```bash
# フロントエンド
vercel --prod

# バックエンド (Laravel)
# VERCEL_DEPLOYMENT.md を参照
```

### 2. Docker デプロイ
```bash
docker-compose up -d
```

### 3. 本番環境設定
- 環境変数の設定
- データベース接続
- ファイルストレージ設定
- SSL 証明書設定

## 📚 使用方法

### 1. 分析ダッシュボードへのアクセス
1. ログイン後、ヘッダーの「AI分析」をクリック
2. 左側のアンケートリストから分析したいアンケートを選択
3. 右側に詳細な分析結果が表示されます

### 2. レポート生成
1. アンケート選択後、「レポート生成」ボタンをクリック
2. 出力形式を選択（PDF、Excel、CSV、JSON）
3. レポートが自動生成され、ダウンロード可能になります

### 3. AI インサイト確認
1. 「AIインサイト」タブをクリック
2. 自動生成された推奨事項を確認
3. 信頼度スコアと具体的な改善提案を参照

## 🔮 今後の拡張予定

### 1. 高度な AI 機能
- 機械学習モデルの統合
- 予測分析の強化
- 自然言語処理の改善

### 2. 可視化の強化
- Chart.js の統合
- D3.js による高度なチャート
- インタラクティブダッシュボード

### 3. 外部連携
- Slack 通知
- Google Analytics 連携
- Salesforce 連携

## 📞 サポート

### 1. ドキュメント
- API ドキュメント
- ユーザーガイド
- トラブルシューティング

### 2. コミュニティ
- GitHub Issues
- ディスカッションフォーラム
- ユーザーコミュニティ

### 3. 技術サポート
- メールサポート
- チャットサポート
- 電話サポート

---

**Survey Monitor - Domo.AI パワード アンケート分析システム**

より強力で直感的なアンケート分析を実現し、データドリブンな意思決定をサポートします。
