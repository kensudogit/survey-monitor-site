import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * アンケート一覧ページ
 * APIからアンケートデータを取得して表示
 */
const Surveys = () => {
  const { isAuthenticated, user } = useAuth();
  const [surveys, setSurveys] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  /**
   * アンケートとカテゴリーデータの読み込み
   */
  const loadData = async () => {
    try {
      setLoading(true);
      
      // アンケート一覧の取得
      const surveysResponse = await fetch('/api/surveys.json');
      const surveysData = await surveysResponse.json();
      
      if (surveysData.success) {
        setSurveys(surveysData.data);
      }
      
      // カテゴリー一覧の取得
      const categoriesResponse = await fetch('/api/surveys-categories.json');
      const categoriesData = await categoriesResponse.json();
      
      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }
      
    } catch (err) {
      console.error('Failed to load data:', err);
      setError('データの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">エラーが発生しました</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={loadData}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            再試行
          </button>
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
            <div className="text-3xl font-bold text-blue-600 mb-2">{surveys.length}</div>
            <div className="text-gray-600">利用可能なアンケート</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-gray-600">完了済み</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{user?.points || 0}</div>
            <div className="text-gray-600">獲得ポイント</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {surveys.length > 0 ? Math.round(surveys.reduce((sum, survey) => sum + (survey.estimated_time || 0), 0) / surveys.length) : 0}分
            </div>
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
            <div className="text-sm opacity-90">{surveys.length}件</div>
          </Link>
          {categories.map((category) => {
            const categorySurveys = surveys.filter(survey => survey.category === category.name);
            return (
              <Link 
                key={category.id} 
                to={`/category/${category.name}`} 
                className="category-card text-white p-6 rounded-lg text-center hover:opacity-90 transition-all hover-lift"
                style={{ backgroundColor: category.color }}
              >
                <i className={`${category.icon} text-2xl mb-2`}></i>
                <div className="font-semibold">{category.name}</div>
                <div className="text-sm opacity-90">{categorySurveys.length}件</div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Surveys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <div key={survey.id} className="survey-card bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={survey.image_url || 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop'} 
              alt={survey.title} 
              className="w-full h-48 object-cover" 
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  {survey.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{survey.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{survey.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span><i className="fas fa-clock mr-1"></i>{survey.estimated_time}分</span>
                  <span><i className="fas fa-question-circle mr-1"></i>{survey.questions?.length || 0}問</span>
                </div>
                <span className="text-lg font-bold text-green-600 points-glow">{survey.points}pt</span>
              </div>
              <Link 
                to={`/survey/${survey.id}`} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block"
              >
                <i className="fas fa-play mr-2"></i>回答する
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surveys;
