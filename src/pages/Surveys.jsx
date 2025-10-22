import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Surveys = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600 mb-6">アンケート一覧を表示するにはログインしてください</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            ログイン
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">アンケート一覧</h1>
        <p className="text-xl text-gray-600">興味のあるアンケートを選んで、ポイントを獲得しましょう</p>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-gray-600">利用可能なアンケート</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">完了済み</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-gray-600">獲得ポイント</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">6.5分</div>
            <div className="text-gray-600">平均回答時間</div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">カテゴリー</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link to="/category/all" className="category-card bg-blue-500 text-white p-6 rounded-lg text-center hover:bg-blue-600 transition-all hover-lift">
            <i className="fas fa-th-large text-2xl mb-2"></i>
            <div className="font-semibold">すべて</div>
            <div className="text-sm opacity-90">8件</div>
          </Link>
          <Link to="/category/テクノロジー" className="category-card bg-blue-500 text-white p-6 rounded-lg text-center hover:bg-blue-600 transition-all hover-lift">
            <i className="fas fa-laptop-code text-2xl mb-2"></i>
            <div className="font-semibold">テクノロジー</div>
            <div className="text-sm opacity-90">2件</div>
          </Link>
          <Link to="/category/ショッピング" className="category-card bg-green-500 text-white p-6 rounded-lg text-center hover:bg-green-600 transition-all hover-lift">
            <i className="fas fa-shopping-cart text-2xl mb-2"></i>
            <div className="font-semibold">ショッピング</div>
            <div className="text-sm opacity-90">2件</div>
          </Link>
          <Link to="/category/ビジネス" className="category-card bg-purple-500 text-white p-6 rounded-lg text-center hover:bg-purple-600 transition-all hover-lift">
            <i className="fas fa-briefcase text-2xl mb-2"></i>
            <div className="font-semibold">ビジネス</div>
            <div className="text-sm opacity-90">1件</div>
          </Link>
          <Link to="/category/ライフスタイル" className="category-card bg-pink-500 text-white p-6 rounded-lg text-center hover:bg-pink-600 transition-all hover-lift">
            <i className="fas fa-heart text-2xl mb-2"></i>
            <div className="font-semibold">ライフスタイル</div>
            <div className="text-sm opacity-90">1件</div>
          </Link>
          <Link to="/category/エンターテイメント" className="category-card bg-yellow-500 text-white p-6 rounded-lg text-center hover:bg-yellow-600 transition-all hover-lift">
            <i className="fas fa-gamepad text-2xl mb-2"></i>
            <div className="font-semibold">エンターテイメント</div>
            <div className="text-sm opacity-90">1件</div>
          </Link>
          <Link to="/category/ヘルスケア" className="category-card bg-red-500 text-white p-6 rounded-lg text-center hover:bg-red-600 transition-all hover-lift">
            <i className="fas fa-heartbeat text-2xl mb-2"></i>
            <div className="font-semibold">ヘルスケア</div>
            <div className="text-sm opacity-90">1件</div>
          </Link>
        </div>
      </div>

      {/* Surveys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="survey-card bg-white rounded-xl shadow-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop" alt="スマートフォンアプリの使用状況調査" className="w-full h-48 object-cover" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">テクノロジー</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">スマートフォンアプリの使用状況調査</h3>
            <p className="text-gray-600 text-sm mb-4">日常的に使用しているアプリについて教えてください</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span><i className="fas fa-clock mr-1"></i>5分</span>
                <span><i className="fas fa-question-circle mr-1"></i>8問</span>
              </div>
              <span className="text-lg font-bold text-green-600 points-glow">50pt</span>
            </div>
            <Link to="/survey/survey_1" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block">
              <i className="fas fa-play mr-2"></i>回答する
            </Link>
          </div>
        </div>

        <div className="survey-card bg-white rounded-xl shadow-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop" alt="オンラインショッピングの利用実態" className="w-full h-48 object-cover" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">ショッピング</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">オンラインショッピングの利用実態</h3>
            <p className="text-gray-600 text-sm mb-4">あなたの買い物習慣について教えてください</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span><i className="fas fa-clock mr-1"></i>7分</span>
                <span><i className="fas fa-question-circle mr-1"></i>12問</span>
              </div>
              <span className="text-lg font-bold text-green-600 points-glow">40pt</span>
            </div>
            <Link to="/survey/survey_2" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block">
              <i className="fas fa-play mr-2"></i>回答する
            </Link>
          </div>
        </div>

        <div className="survey-card bg-white rounded-xl shadow-lg overflow-hidden">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop" alt="働き方に関する意識調査" className="w-full h-48 object-cover" />
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">ビジネス</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">働き方に関する意識調査</h3>
            <p className="text-gray-600 text-sm mb-4">現代の働き方についてあなたの意見を聞かせてください</p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span><i className="fas fa-clock mr-1"></i>10分</span>
                <span><i className="fas fa-question-circle mr-1"></i>15問</span>
              </div>
              <span className="text-lg font-bold text-green-600 points-glow">60pt</span>
            </div>
            <Link to="/survey/survey_3" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block">
              <i className="fas fa-play mr-2"></i>回答する
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Surveys;
