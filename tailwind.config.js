/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Forced Colors Mode対応
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
  plugins: [
    // アクセシビリティプラグイン
    function({ addUtilities }) {
      const newUtilities = {
        // Forced Colors Mode対応
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
        // 高コントラスト対応
        '.high-contrast': {
          '@media (prefers-contrast: high)': {
            'border-width': '2px',
            'border-style': 'solid',
          },
        },
        // モーション設定
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