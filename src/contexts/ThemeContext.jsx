import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * テーマコンテキスト
 * 
 * アプリケーションのテーマ（ライト/ダークモード）を管理するReactコンテキスト
 * ローカルストレージとシステム設定を考慮したテーマ切り替え機能を提供
 */
const ThemeContext = createContext();

/**
 * テーマフック
 * 
 * ThemeContextからテーマ状態とメソッドを取得するカスタムフック
 * @returns {Object} テーマ状態とメソッドを含むオブジェクト
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * テーマプロバイダーコンポーネント
 * 
 * アプリケーション全体でテーマ状態を共有するプロバイダー
 * @param {Object} props - プロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 */
export const ThemeProvider = ({ children }) => {
  // テーマ状態の初期化（ローカルストレージとシステム設定を考慮）
  const [theme, setTheme] = useState(() => {
    // ローカルストレージから保存されたテーマを確認
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // システム設定を確認
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // テーマをドキュメントに適用し、ローカルストレージに保存
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  /**
   * テーマの切り替え処理
   * ライトモードとダークモードを切り替える
   */
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
