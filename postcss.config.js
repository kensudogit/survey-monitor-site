export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      // 非推奨の-ms-high-contrastを無効化
      ignoreUnknownVersions: true,
      flexbox: 'no-2009',
      grid: 'autoplace',
      // 最新のブラウザサポート
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not dead',
        'not ie 11',
        'not op_mini all'
      ],
      // 非推奨プロパティを除外
      remove: false,
      add: true,
      supports: true,
      // 高コントラスト関連の非推奨プロパティを除外
      cascade: true,
    },
  },
}
