import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600 mb-6">ダッシュボードを表示するにはログインしてください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">ダッシュボード</h1>
        <p className="text-xl text-gray-600">ようこそ、{currentUser.name}さん</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <i className="fas fa-chart-line text-2xl text-blue-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">獲得ポイント</p>
              <p className="text-2xl font-bold text-gray-900">{currentUser.points}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <i className="fas fa-check-circle text-2xl text-green-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">完了したアンケート</p>
              <p className="text-2xl font-bold text-gray-900">{currentUser.surveysCompleted.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <i className="fas fa-calendar text-2xl text-purple-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">登録日</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date(currentUser.joinDate).toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <i className="fas fa-clock text-2xl text-orange-600"></i>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">最終ログイン</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Date(currentUser.lastLogin).toLocaleDateString('ja-JP')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">最近の活動</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-green-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">アンケート完了</p>
                <p className="text-xs text-gray-500">スマートフォンアプリの使用状況調査</p>
              </div>
              <div className="ml-auto">
                <span className="text-sm font-medium text-green-600">+50pt</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-user-plus text-blue-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">アカウント作成</p>
                <p className="text-xs text-gray-500">新規登録完了</p>
              </div>
              <div className="ml-auto">
                <span className="text-sm font-medium text-blue-600">+100pt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">おすすめアンケート</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=60&h=60&fit=crop" alt="アンケート" className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">スマートフォンアプリの使用状況調査</p>
                <p className="text-xs text-gray-500">テクノロジー • 5分 • 50pt</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                回答
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=60&h=60&fit=crop" alt="アンケート" className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">オンラインショッピングの利用実態</p>
                <p className="text-xs text-gray-500">ショッピング • 7分 • 40pt</p>
              </div>
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                回答
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
