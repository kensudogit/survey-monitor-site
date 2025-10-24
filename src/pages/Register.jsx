import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * 新規登録ページコンポーネント
 * 
 * ユーザーの新規アカウント作成処理を行うコンポーネント
 * 基本情報、認証情報、デモグラフィック情報の入力フォームを提供
 */
const Register = () => {
  // フォームデータ状態管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 認証コンテキストとナビゲーション
  const { register } = useAuth();
  const navigate = useNavigate();

  /**
   * フォーム入力値の変更処理
   * @param {Event} e - 入力イベント
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /**
   * 新規登録処理
   * @param {Event} e - フォーム送信イベント
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // パスワード確認
    if (formData.password !== formData.confirmPassword) {
      setError('パスワードが一致しません');
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* ヘッダーセクション */}
        <div className="text-center">
          <img src="/PC.png" alt="Survey Monitor" className="mx-auto h-16 w-16" />
          <h2 className="mt-6 text-3xl font-bold text-white">新規登録</h2>
          <p className="mt-2 text-white opacity-90">
            アカウントを作成してアンケートを始めましょう
          </p>
        </div>

        {/* 新規登録フォーム */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* エラーメッセージ表示 */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* フォーム入力フィールド */}
          <div className="space-y-4">
            {/* お名前入力 */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-user mr-2"></i>お名前
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="山田太郎"
              />
            </div>

            {/* メールアドレス入力 */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-envelope mr-2"></i>メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="example@email.com"
              />
            </div>

            {/* パスワード入力 */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-lock mr-2"></i>パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="8文字以上で入力"
              />
            </div>

            {/* パスワード確認入力 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-lock mr-2"></i>パスワード確認
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="パスワードを再入力"
              />
            </div>

            {/* 年齢層選択 */}
            <div>
              <label htmlFor="age" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-calendar mr-2"></i>年齢層
              </label>
              <select
                id="age"
                name="age"
                required
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              >
                <option value="">選択してください</option>
                <option value="18-24">18-24歳</option>
                <option value="25-34">25-34歳</option>
                <option value="35-44">35-44歳</option>
                <option value="45-54">45-54歳</option>
                <option value="55-64">55-64歳</option>
                <option value="65+">65歳以上</option>
              </select>
            </div>

            {/* 性別選択 */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-venus-mars mr-2"></i>性別
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              >
                <option value="">選択してください</option>
                <option value="男性">男性</option>
                <option value="女性">女性</option>
                <option value="その他">その他</option>
              </select>
            </div>
          </div>

          {/* 登録ボタン */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover-lift neon-glow disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <i className="fas fa-user-plus text-white group-hover:text-blue-200"></i>
              </span>
              {loading ? '登録中...' : 'アカウントを作成'}
            </button>
          </div>
          
          {/* ログインリンク */}
          <div className="text-center pt-4 border-t border-white/30">
            <p className="text-white">
              既にアカウントをお持ちの方は
              <Link to="/login" className="font-medium text-blue-200 hover:text-white transition-colors">
                ログイン
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
