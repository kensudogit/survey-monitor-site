/**
 * Tailwind CSS設定ファイル
 * 
 * Tailwind CSSの設定とカスタムユーティリティクラスの定義
 * アクセシビリティ対応、Forced Colors Mode、高コントラスト対応を含む
 * @type {import('tailwindcss').Config}
 */
export default {
  // コンテンツファイルの指定
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // テーマ設定
  theme: {
    extend: {
      // フォントファミリーの拡張
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      
      // カスタムカラーの定義
      colors: {
        // Forced Colors Mode対応カラー
        'Canvas': 'Canvas',
        'CanvasText': 'CanvasText',
        'LinkText': 'LinkText',
        'VisitedText': 'VisitedText',
        'ActiveText': 'ActiveText',
        'ButtonFace': 'ButtonFace',
        'ButtonText': 'ButtonText',
        'Field': 'Field',
        'FieldText': 'FieldText',
        'Highlight': 'Highlight',
        'HighlightText': 'HighlightText',
        'GrayText': 'GrayText',
      },
    },
  },
  
  // プラグイン設定
  plugins: [
    // アクセシビリティプラグイン
    function({ addUtilities }) {
      const newUtilities = {
        // Forced Colors Mode対応ユーティリティ
        '.forced-colors-auto': {
          '@media (forced-colors: active)': {
            'color': 'CanvasText',
            'background-color': 'Canvas',
            'border-color': 'CanvasText',
          },
        },
        '.forced-colors-button': {
          '@media (forced-colors: active)': {
            'color': 'ButtonText',
            'background-color': 'ButtonFace',
            'border-color': 'ButtonText',
          },
        },
        '.forced-colors-link': {
          '@media (forced-colors: active)': {
            'color': 'LinkText',
            'text-decoration': 'underline',
          },
        },
        '.forced-colors-highlight': {
          '@media (forced-colors: active)': {
            'color': 'HighlightText',
            'background-color': 'Highlight',
          },
        },
        
        // 高コントラスト対応ユーティリティ
        '.high-contrast': {
          '@media (prefers-contrast: high)': {
            'border-width': '2px',
            'border-style': 'solid',
          },
        },
        
        // モーション設定ユーティリティ
        '.motion-safe': {
          '@media (prefers-reduced-motion: no-preference)': {
            'transition': 'all 0.3s ease',
          },
        },
        '.motion-reduce': {
          '@media (prefers-reduced-motion: reduce)': {
            'transition': 'none',
            'animation': 'none',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}