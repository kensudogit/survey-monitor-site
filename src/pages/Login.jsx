import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('ログインに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const result = loginDemo();
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('デモユーザーログインに失敗しました');
      }
    } catch (error) {
      setError('デモユーザーログインエラー');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img src="/PC.png" alt="Survey Monitor" className="mx-auto h-16 w-16" />
          <h2 className="mt-6 text-3xl font-bold text-white">ログイン</h2>
          <p className="mt-2 text-white opacity-90">
            アカウントにログインしてポイントを獲得しましょう
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-envelope mr-2"></i>メールアドレス
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="example@email.com"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-semibold text-white mb-2">
                <i className="fas fa-lock mr-2"></i>パスワード
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                placeholder="パスワードを入力"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-white/50 rounded bg-white/90"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-white">
                ログイン状態を保持
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-white hover:text-blue-200 transition-colors">
                パスワードを忘れた場合
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all hover-lift neon-glow disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <i className="fas fa-sign-in-alt text-white group-hover:text-blue-200"></i>
              </span>
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </div>

          <div className="text-center">
            <div className="text-sm text-white">
              デモアカウントでログイン:
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="font-medium text-blue-200 hover:text-white ml-1 transition-colors disabled:opacity-50"
              >
                デモユーザー
              </button>
            </div>
          </div>
          
          <div className="text-center pt-4 border-t border-white/30">
            <p className="text-white">
              アカウントをお持ちでない方は
              <Link to="/register" className="font-medium text-blue-200 hover:text-white transition-colors">
                新規登録
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
