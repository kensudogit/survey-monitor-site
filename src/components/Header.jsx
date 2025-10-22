import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="gradient-bg shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors flex items-center">
              <img src="/PC.png" alt="Survey Monitor" className="w-8 h-8 mr-2" />
              Survey Monitor
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-blue-200 font-medium transition-colors">ホーム</Link>
            <Link to="/surveys" className="text-white hover:text-blue-200 font-medium transition-colors">アンケート一覧</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className="text-white hover:text-blue-200 font-medium transition-colors">ダッシュボード</Link>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <i className="fas fa-user-circle text-white"></i>
                  <span className="text-white">{currentUser.name}</span>
                  <span className="text-blue-200">({currentUser.points}pt)</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-blue-200 font-medium transition-colors">ログイン</Link>
                <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all hover-lift font-semibold">新規登録</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
