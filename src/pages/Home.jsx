import React from 'react';
import { Link } from 'react-router-dom';

/**
 * ホームページコンポーネント
 * 
 * サイトのトップページを表示するコンポーネント
 * ヒーローセクション、統計情報、おすすめアンケート、機能紹介を提供
 */
const Home = () => {
  return (
    <div>
      {/* ヒーローセクション - メインビジュアルとCTA */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">アンケートでポイントを獲得</h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">あなたの意見が価値に変わります</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              今すぐ始める
            </Link>
            <Link to="/surveys" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              アンケートを見る
            </Link>
          </div>
        </div>
      </section>

      {/* 統計セクション - サイトの実績数値を表示 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">71</div>
              <div className="text-gray-600">利用可能なアンケート</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">1,250</div>
              <div className="text-gray-600">登録ユーザー数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">15,680</div>
              <div className="text-gray-600">獲得ポイント総数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">6.5分</div>
              <div className="text-gray-600">平均回答時間</div>
            </div>
          </div>
        </div>
      </section>

      {/* おすすめアンケートセクション - 人気のアンケートを表示 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">おすすめアンケート</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* テクノロジーカテゴリのアンケート */}
            <div className="bg-white rounded-lg shadow-md card-hover">
              <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop" alt="スマートフォンアプリの使用状況調査" className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">テクノロジー</span>
                  <span className="text-lg font-bold text-green-600 points-glow">50pt</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">スマートフォンアプリの使用状況調査</h3>
                <p className="text-gray-600 text-sm mb-4">日常的に使用しているアプリについて教えてください</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span><i className="fas fa-clock mr-1"></i>5分</span>
                    <span><i className="fas fa-question-circle mr-1"></i>8問</span>
                  </div>
                </div>
                <Link to="/survey/survey_1" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block">
                  <i className="fas fa-play mr-2"></i>回答する
                </Link>
              </div>
            </div>

            {/* ショッピングカテゴリのアンケート */}
            <div className="bg-white rounded-lg shadow-md card-hover">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop" alt="オンラインショッピングの利用実態" className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">ショッピング</span>
                  <span className="text-lg font-bold text-green-600 points-glow">40pt</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">オンラインショッピングの利用実態</h3>
                <p className="text-gray-600 text-sm mb-4">あなたの買い物習慣について教えてください</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span><i className="fas fa-clock mr-1"></i>7分</span>
                    <span><i className="fas fa-question-circle mr-1"></i>12問</span>
                  </div>
                </div>
                <Link to="/survey/survey_2" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block">
                  <i className="fas fa-play mr-2"></i>回答する
                </Link>
              </div>
            </div>

            {/* ビジネスカテゴリのアンケート */}
            <div className="bg-white rounded-lg shadow-md card-hover">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop" alt="働き方に関する意識調査" className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">ビジネス</span>
                  <span className="text-lg font-bold text-green-600 points-glow">60pt</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">働き方に関する意識調査</h3>
                <p className="text-gray-600 text-sm mb-4">現代の働き方についてあなたの意見を聞かせてください</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span><i className="fas fa-clock mr-1"></i>10分</span>
                    <span><i className="fas fa-question-circle mr-1"></i>15問</span>
                  </div>
                </div>
                <Link to="/survey/survey_3" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors font-semibold text-center block">
                  <i className="fas fa-play mr-2"></i>回答する
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 機能紹介セクション - サイトの特徴を説明 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">なぜSurvey Monitorなのか？</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ポイント獲得の特徴 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-gift text-2xl text-blue-600"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">ポイント獲得</h4>
              <p className="text-gray-600">アンケートに回答するだけでポイントを獲得できます</p>
            </div>
            {/* 短時間完了の特徴 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-clock text-2xl text-green-600"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">短時間で完了</h4>
              <p className="text-gray-600">平均6.5分で完了する短時間アンケート</p>
            </div>
            {/* 安全・安心の特徴 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-shield-alt text-2xl text-purple-600"></i>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">安全・安心</h4>
              <p className="text-gray-600">個人情報は厳重に管理され、安全にご利用いただけます</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
