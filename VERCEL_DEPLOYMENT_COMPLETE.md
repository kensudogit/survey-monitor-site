# Survey Monitor Site - Vercel完全公開デプロイガイド

## 🚀 完全公開モードでのVercelデプロイ手順

### 1. GitHubリポジトリの作成とプッシュ

```bash
# GitHubで新しいリポジトリを作成後、以下のコマンドを実行
cd C:\devlop\survey-monitor-site
git remote add origin https://github.com/your-username/survey-monitor-site.git
git branch -M main
git push -u origin main
```

### 2. Vercelでのデプロイ設定

#### 2.1 Vercelアカウント作成・ログイン
1. [Vercel](https://vercel.com)にアクセス
2. GitHubアカウントでログイン
3. "New Project"をクリック

#### 2.2 プロジェクト設定（完全公開モード）
1. GitHubリポジトリ `survey-monitor-site` を選択
2. **重要**: 以下の設定を適用：

```
Framework Preset: Other
Root Directory: ./
Build Command: npm run build
Output Directory: public
Install Command: npm install
```

#### 2.3 環境変数設定（本番用）
Vercelダッシュボードの「Environment Variables」で以下を設定：

```
APP_NAME=Survey Monitor
APP_ENV=production
APP_KEY=base64:your-generated-key-here
APP_DEBUG=false
APP_URL=https://your-project-name.vercel.app
LOG_CHANNEL=stack
LOG_LEVEL=error
NODE_ENV=production
```

#### 2.4 デプロイ実行
1. "Deploy"ボタンをクリック
2. デプロイ完了まで待機（通常2-3分）

### 3. 完全公開モードの確認

#### 3.1 公開URLの確認
- デプロイ完了後、Vercelから提供されるURL（例：`https://survey-monitor-site.vercel.app`）にアクセス
- サイトが正常に表示されることを確認

#### 3.2 公開設定の確認
- Vercelダッシュボードで「Settings」→「General」
- 「Public」が有効になっていることを確認
- 必要に応じてカスタムドメインを設定

### 4. 自動デプロイの設定

#### 4.1 GitHub連携の確認
- Vercelダッシュボードで「Settings」→「Git」
- GitHub連携が有効になっていることを確認
- 自動デプロイが有効になっていることを確認

#### 4.2 ブランチ設定
- `main`ブランチへのプッシュで自動デプロイが実行される
- プレビューデプロイも有効（プルリクエスト時）

### 5. パフォーマンス最適化

#### 5.1 CDN設定
- Vercelは自動的にCDNを提供
- 静的ファイルは自動的に最適化される

#### 5.2 キャッシュ設定
- `vercel.json`でキャッシュ設定を調整可能
- 画像やCSSファイルは自動的にキャッシュされる

### 6. トラブルシューティング

#### 6.1 デプロイエラーの場合
```bash
# ローカルでビルドテスト
npm run build
npm run start
```

#### 6.2 404エラーの場合
- `vercel.json`の設定を確認
- `public`ディレクトリの構造を確認
- ルートディレクトリの設定を確認

#### 6.3 静的ファイルが読み込まれない場合
- `public`ディレクトリの権限を確認
- ファイルパスを確認
- CDNの反映を待つ（数分）

### 7. セキュリティ設定

#### 7.1 環境変数の保護
- 機密情報は環境変数で管理
- `.env`ファイルはGitにコミットしない

#### 7.2 HTTPS設定
- Vercelは自動的にHTTPSを提供
- カスタムドメインでもHTTPSが有効

### 8. 監視とアナリティクス

#### 8.1 Vercel Analytics
- Vercelダッシュボードでアクセス統計を確認
- パフォーマンスメトリクスを監視

#### 8.2 エラーログ
- Vercelダッシュボードでエラーログを確認
- デプロイログで問題を特定

## 📋 チェックリスト

- [ ] GitHubリポジトリ作成・プッシュ完了
- [ ] Vercelプロジェクト作成完了
- [ ] 環境変数設定完了
- [ ] デプロイ実行完了
- [ ] 公開URLでアクセス確認完了
- [ ] 自動デプロイ設定確認完了
- [ ] パフォーマンステスト完了

## 🔗 重要なリンク

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/your-username/survey-monitor-site
- **Live Site**: https://your-project-name.vercel.app

## 📞 サポート

問題が発生した場合は、以下を確認してください：
1. Vercelのデプロイログ
2. GitHubのコミット履歴
3. 環境変数の設定
4. `vercel.json`の設定

---

**注意**: このサイトは静的サイトとしてデプロイされます。Laravelの動的機能（データベース、セッション等）を使用する場合は、別途サーバーサイドの設定が必要です。
