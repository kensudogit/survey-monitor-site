/**
 * PostCSS設定ファイル
 * 
 * CSS処理ツールの設定
 * Tailwind CSSとAutoprefixerの設定を含む
 */
export default {
  plugins: {
    // Tailwind CSSプラグイン
    tailwindcss: {},
    
    // Autoprefixerプラグイン
    autoprefixer: {
      // 非推奨の-ms-high-contrastを無効化
      ignoreUnknownVersions: true,
      flexbox: 'no-2009',
      grid: 'autoplace',
      
      // 最新のブラウザサポート（IE11と非推奨プロパティを除外）
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'not ie 11',
        'not op_mini all',
        'not chrome < 88',
        'not firefox < 78',
        'not safari < 14'
      ],
      
      // 非推奨プロパティを除外
      remove: false,
      add: true,
      supports: true,
      
      // 高コントラスト関連の非推奨プロパティを除外
      cascade: true,
      
      // 特定の非推奨プロパティを無効化
      disable: [
        'ms-high-contrast',
        'ms-high-contrast-adjust'
      ]
    },
  },
}
