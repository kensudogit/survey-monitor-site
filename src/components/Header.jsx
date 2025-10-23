import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="glass-card sticky top-0 z-50" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-white hover:text-blue-200 transition-colors flex items-center group forced-colors-link"
              aria-label="Survey Monitor ホームページへ"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform motion-safe">
                <i className="fas fa-chart-bar text-white text-lg" aria-hidden="true"></i>
              </div>
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Survey Monitor
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6" role="navigation" aria-label="メインナビゲーション">
            <Link 
              to="/" 
              className="text-white hover:text-blue-200 font-medium transition-colors flex items-center group forced-colors-link motion-safe"
              aria-current={window.location.pathname === '/' ? 'page' : undefined}
            >
              <i className="fas fa-home mr-2 group-hover:scale-110 transition-transform motion-safe" aria-hidden="true"></i>
              ホーム
            </Link>
            <Link 
              to="/surveys" 
              className="text-white hover:text-blue-200 font-medium transition-colors flex items-center group forced-colors-link motion-safe"
              aria-current={window.location.pathname === '/surveys' ? 'page' : undefined}
            >
              <i className="fas fa-list mr-2 group-hover:scale-110 transition-transform motion-safe" aria-hidden="true"></i>
              アンケート一覧
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-white hover:text-blue-200 font-medium transition-colors flex items-center group forced-colors-link motion-safe"
                  aria-current={window.location.pathname === '/dashboard' ? 'page' : undefined}
                >
                  <i className="fas fa-tachometer-alt mr-2 group-hover:scale-110 transition-transform motion-safe" aria-hidden="true"></i>
                  ダッシュボード
                </Link>
                <Link 
                  to="/analytics" 
                  className="text-white hover:text-blue-200 font-medium transition-colors flex items-center group forced-colors-link motion-safe"
                  aria-current={window.location.pathname === '/analytics' ? 'page' : undefined}
                >
                  <i className="fas fa-brain mr-2 group-hover:scale-110 transition-transform motion-safe" aria-hidden="true"></i>
                  AI分析
                </Link>
              </>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors text-white forced-colors-button motion-safe"
              title={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
              aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true"></i>
            </button>
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3 bg-white bg-opacity-10 rounded-lg px-4 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-white text-sm" aria-hidden="true"></i>
                  </div>
                  <div className="text-white">
                    <div className="font-medium text-sm">{currentUser.name}</div>
                    <div className="text-xs text-blue-200">{currentUser.points}pt</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-red-600 hover:text-red-700 hover:bg-red-50 forced-colors-button motion-safe"
                  aria-label="ログアウト"
                >
                  <i className="fas fa-sign-out-alt mr-2" aria-hidden="true"></i>
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-blue-200 font-medium transition-colors flex items-center forced-colors-link motion-safe"
                >
                  <i className="fas fa-sign-in-alt mr-2" aria-hidden="true"></i>
                  ログイン
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary flex items-center forced-colors-button motion-safe"
                >
                  <i className="fas fa-user-plus mr-2" aria-hidden="true"></i>
                  新規登録
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
