import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite設定ファイル
 * 
 * Reactアプリケーションのビルドと開発サーバーの設定
 * バンドル最適化、チャンク分割、開発サーバー設定を含む
 */
export default defineConfig({
  // Reactプラグインの設定
  plugins: [react()],
  
  // ビルド設定
  build: {
    // 出力ディレクトリ
    outDir: 'dist',
    // アセットディレクトリ
    assetsDir: 'assets',
    // ソースマップの無効化（本番環境）
    sourcemap: false,
    // ミニファイツール（Terser）
    minify: 'terser',
    // Rollupオプション
    rollupOptions: {
      output: {
        // 手動チャンク分割
        manualChunks: {
          // React関連ライブラリ
          vendor: ['react', 'react-dom'],
          // ルーティング関連ライブラリ
          router: ['react-router-dom']
        }
      }
    }
  },
  
  // 開発サーバー設定
  server: {
    // ポート番号
    port: 3000,
    // 自動でブラウザを開く
    open: true,
  },
  
  // プレビューサーバー設定
  preview: {
    // ポート番号
    port: 4173,
    // 自動でブラウザを開く
    open: true
  },
  
  // グローバル定数の定義
  define: {
    // アプリケーションバージョン
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
});
