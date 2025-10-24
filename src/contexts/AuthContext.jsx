import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * 認証コンテキスト
 * 
 * ユーザー認証状態と認証関連の機能を管理するReactコンテキスト
 * ローカルストレージベースの認証システムを提供
 */
const AuthContext = createContext();

/**
 * 認証フック
 * 
 * AuthContextから認証状態とメソッドを取得するカスタムフック
 * @returns {Object} 認証状態とメソッドを含むオブジェクト
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

/**
 * 認証プロバイダーコンポーネント
 * 
 * アプリケーション全体で認証状態を共有するプロバイダー
 * @param {Object} props - プロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 */
export const AuthProvider = ({ children }) => {
  // 認証状態の管理
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ローカルストレージからユーザー情報を復元
    const savedUser = localStorage.getItem('survey_monitor_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * ユーザー新規登録処理
   * @param {Object} userData - ユーザーデータ
   * @returns {Object} 登録結果
   */
  const register = async (userData) => {
    try {
      // バリデーション
      if (!validateUserData(userData)) {
        throw new Error('入力データが無効です');
      }

      // 既存ユーザーチェック
      const existingUsers = getUsers();
      if (existingUsers.find(u => u.email === userData.email)) {
        throw new Error('このメールアドレスは既に登録されています');
      }

      // 新規ユーザー作成
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        password: hashPassword(userData.password),
        age: userData.age,
        gender: userData.gender,
        points: 0,
        surveysCompleted: [],
        joinDate: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };

      // ユーザーを保存
      existingUsers.push(newUser);
      localStorage.setItem('survey_monitor_users', JSON.stringify(existingUsers));

      // ログイン状態に設定
      setCurrentUser(newUser);
      localStorage.setItem('survey_monitor_user', JSON.stringify(newUser));

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * ユーザーログイン処理
   * @param {string} email - メールアドレス
   * @param {string} password - パスワード
   * @returns {Object} ログイン結果
   */
  const login = async (email, password) => {
    try {
      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === hashPassword(password));
      
      if (!user) {
        throw new Error('メールアドレスまたはパスワードが正しくありません');
      }

      // ログイン情報更新
      user.lastLogin = new Date().toISOString();
      updateUser(user);

      // セッション設定
      setCurrentUser(user);
      localStorage.setItem('survey_monitor_user', JSON.stringify(user));

      return { success: true, user: user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  /**
   * デモユーザーログイン処理
   * @returns {Object} ログイン結果
   */
  const loginDemo = () => {
    const demoUser = {
      id: 'demo_user',
      name: 'デモユーザー',
      email: 'demo@example.com',
      password: hashPassword('demo123'),
      age: '25-34',
      gender: 'その他',
      points: 150,
      surveysCompleted: ['survey_1', 'survey_2'],
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    // デモユーザーを保存
    const users = getUsers();
    const existingDemoIndex = users.findIndex(u => u.id === 'demo_user');
    if (existingDemoIndex !== -1) {
      users[existingDemoIndex] = demoUser;
    } else {
      users.push(demoUser);
    }
    localStorage.setItem('survey_monitor_users', JSON.stringify(users));

    // ログイン状態に設定
    setCurrentUser(demoUser);
    localStorage.setItem('survey_monitor_user', JSON.stringify(demoUser));

    return { success: true, user: demoUser };
  };

  /**
   * ユーザーログアウト処理
   */
  const logout = () => {
    console.log('Logging out user:', currentUser?.name);
    setCurrentUser(null);
    localStorage.removeItem('survey_monitor_user');
  };

  /**
   * ポイント追加処理
   * @param {number} points - 追加するポイント数
   */
  const addPoints = (points) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, points: currentUser.points + points };
      setCurrentUser(updatedUser);
      updateUser(updatedUser);
      localStorage.setItem('survey_monitor_user', JSON.stringify(updatedUser));
    }
  };

  /**
   * アンケート完了処理
   * @param {string} surveyId - アンケートID
   */
  const completeSurvey = (surveyId) => {
    if (currentUser && !currentUser.surveysCompleted.includes(surveyId)) {
      const updatedUser = {
        ...currentUser,
        surveysCompleted: [...currentUser.surveysCompleted, surveyId]
      };
      setCurrentUser(updatedUser);
      updateUser(updatedUser);
      localStorage.setItem('survey_monitor_user', JSON.stringify(updatedUser));
    }
  };

  // ヘルパー関数群

  /**
   * ユーザーデータのバリデーション
   * @param {Object} userData - ユーザーデータ
   * @returns {boolean} バリデーション結果
   */
  const validateUserData = (userData) => {
    if (!userData.name || userData.name.length < 2) return false;
    if (!userData.email || !isValidEmail(userData.email)) return false;
    if (!userData.password || userData.password.length < 8) return false;
    if (!userData.age || !userData.gender) return false;
    return true;
  };

  /**
   * メールアドレスの妥当性チェック
   * @param {string} email - メールアドレス
   * @returns {boolean} 妥当性結果
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * パスワードのハッシュ化
   * @param {string} password - パスワード
   * @returns {string} ハッシュ化されたパスワード
   */
  const hashPassword = (password) => {
    return btoa(password + 'survey_monitor_salt');
  };

  /**
   * ユーザー一覧の取得
   * @returns {Array} ユーザー配列
   */
  const getUsers = () => {
    const users = localStorage.getItem('survey_monitor_users');
    return users ? JSON.parse(users) : [];
  };

  /**
   * ユーザー情報の更新
   * @param {Object} user - 更新するユーザー情報
   */
  const updateUser = (user) => {
    const users = getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      localStorage.setItem('survey_monitor_users', JSON.stringify(users));
    }
  };

  const value = {
    currentUser,
    loading,
    register,
    login,
    loginDemo,
    logout,
    addPoints,
    completeSurvey,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
