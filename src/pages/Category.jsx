import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Category = () => {
  const { category } = useParams();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600 mb-6">カテゴリーページを表示するにはログインしてください</p>
          <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            ログイン
          </Link>
        </div>
      </div>
    );
  }

  const categoryConfig = {
    'テクノロジー': {
      title: 'テクノロジー',
      description: '最新のテクノロジーとデジタル技術に関するアンケート',
      icon: 'fas fa-laptop-code',
      color: '#3B82F6',
      colorDark: '#1E40AF'
    },
    'ショッピング': {
      title: 'ショッピング',
      description: 'オンラインショッピングと買い物に関するアンケート',
      icon: 'fas fa-shopping-cart',
      color: '#10B981',
      colorDark: '#047857'
    },
    'ビジネス': {
      title: 'ビジネス',
      description: '働き方とビジネス環境に関するアンケート',
      icon: 'fas fa-briefcase',
      color: '#8B5CF6',
      colorDark: '#6D28D9'
    },
    'ライフスタイル': {
      title: 'ライフスタイル',
      description: '日常生活とライフスタイルに関するアンケート',
      icon: 'fas fa-heart',
      color: '#EC4899',
      colorDark: '#BE185D'
    },
    'エンターテイメント': {
      title: 'エンターテイメント',
      description: 'ゲームとエンターテイメントに関するアンケート',
      icon: 'fas fa-gamepad',
      color: '#F59E0B',
      colorDark: '#D97706'
    },
    'ヘルスケア': {
      title: 'ヘルスケア',
      description: '健康管理とヘルスケアに関するアンケート',
      icon: 'fas fa-heartbeat',
      color: '#EF4444',
      colorDark: '#DC2626'
    }
  };

  const config = categoryConfig[category] || {
    title: 'すべてのアンケート',
    description: 'すべてのカテゴリーのアンケートを表示しています',
    icon: 'fas fa-th-large',
    color: '#667eea',
    colorDark: '#764ba2'
  };

  return (
    <div>
      {/* Category Header */}
      <div 
        className="text-white py-16"
        style={{
          background: `linear-gradient(135deg, ${config.color} 0%, ${config.colorDark} 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className={`${config.icon} text-3xl text-white`}></i>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{config.title}</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{config.description}</p>
          <div className="text-lg opacity-80">
            2件のアンケートが利用可能
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link to="/" className="hover:text-blue-600">ホーム</Link></li>
            <li><i className="fas fa-chevron-right text-xs"></i></li>
            <li><Link to="/surveys" className="hover:text-blue-600">アンケート一覧</Link></li>
            <li><i className="fas fa-chevron-right text-xs"></i></li>
            <li className="text-gray-900 font-medium">{config.title}</li>
          </ol>
        </nav>

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
                <span className="text-lg font-bold text-green-600">50pt</span>
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
                <span className="text-lg font-bold text-green-600">40pt</span>
              </div>
              <Link to="/survey/survey_2" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block">
                <i className="fas fa-play mr-2"></i>回答する
              </Link>
            </div>
          </div>
        </div>

        {/* Back to Categories */}
        <div className="text-center mt-12">
          <Link to="/surveys" className="inline-flex items-center bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
            <i className="fas fa-arrow-left mr-2"></i>
            カテゴリー一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Category;
