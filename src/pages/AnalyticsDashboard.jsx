import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import MetricCard, { 
  SurveyMetricCard, 
  ResponseMetricCard, 
  CompletionMetricCard, 
  QualityMetricCard 
} from '../components/MetricCard';
import InsightCard, { 
  CompletionInsightCard, 
  QualityInsightCard, 
  DemographicInsightCard, 
  SentimentInsightCard 
} from '../components/InsightCard';
import ModernChart from '../components/ModernChart';

const AnalyticsDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // 認証状態に関係なくデータを読み込み
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // モックデータを使用（実際のAPIが利用できない場合）
      const mockData = {
        success: true,
        data: {
          totalSurveys: 20,
          totalResponses: 2156,
          averageCompletionRate: 78.5,
          averageQualityScore: 72.3,
          surveys: [
            {
              id: 1,
              title: 'スマートフォンアプリの使用状況調査 (テスト1)',
              category: 'テクノロジー・IT',
              responses: 156,
              completionRate: 82.1,
              qualityScore: 75.2,
              status: 'active'
            },
            {
              id: 2,
              title: 'オンラインショッピングの利用実態 (テスト2)',
              category: 'ショッピング・EC',
              responses: 203,
              completionRate: 76.8,
              qualityScore: 68.9,
              status: 'active'
            },
            {
              id: 3,
              title: 'リモートワークの実態調査 (テスト3)',
              category: 'ビジネス・働き方',
              responses: 189,
              completionRate: 71.2,
              qualityScore: 74.5,
              status: 'active'
            },
            {
              id: 4,
              title: '健康管理アプリの利用調査 (テスト4)',
              category: 'ヘルスケア・医療',
              responses: 142,
              completionRate: 85.3,
              qualityScore: 79.1,
              status: 'active'
            },
            {
              id: 5,
              title: '動画配信サービスの利用実態 (テスト5)',
              category: 'エンターテイメント',
              responses: 178,
              completionRate: 73.6,
              qualityScore: 70.8,
              status: 'active'
            }
          ],
          insights: [
            {
              id: 1,
              type: 'completion_rate',
              title: '完了率が低いアンケートを発見',
              description: 'リモートワーク調査の完了率が71.2%と低くなっています。質問数を減らすことを検討してください。',
              confidence: 85,
              recommendations: ['質問数を10問以下に減らす', 'ポイントを20%増加させる', '完了時間を5分以内に設定する'],
              surveyId: 3
            },
            {
              id: 2,
              type: 'quality_score',
              title: '回答品質の向上が必要',
              description: 'オンラインショッピング調査の品質スコアが68.9点です。質問の明確化が必要です。',
              confidence: 80,
              recommendations: ['質問文をより具体的にする', '回答オプションを明確にする', '必須回答を適切に設定する'],
              surveyId: 2
            },
            {
              id: 3,
              type: 'sentiment_analysis',
              title: 'ネガティブな感情が検出されています',
              description: 'スマートフォンアプリ調査で35%の回答者がネガティブな感情を示しています。',
              confidence: 70,
              recommendations: ['ネガティブな回答の詳細分析', '改善点の特定', 'ユーザーフィードバックの収集'],
              surveyId: 1
            }
          ],
          trends: {
            dailyResponses: {
              '2024-01-15': 45,
              '2024-01-16': 52,
              '2024-01-17': 38,
              '2024-01-18': 61,
              '2024-01-19': 48,
              '2024-01-20': 55,
              '2024-01-21': 42
            },
            completionRates: {
              '2024-01-15': 78.2,
              '2024-01-16': 79.1,
              '2024-01-17': 76.8,
              '2024-01-18': 80.3,
              '2024-01-19': 77.5,
              '2024-01-20': 79.8,
              '2024-01-21': 78.1
            }
          },
          demographics: {
            ageGroups: {
              'under_20': 45,
              '20s': 156,
              '30s': 203,
              '40s': 189,
              '50s': 142,
              'over_60': 78
            },
            gender: {
              'male': 456,
              'female': 357,
              'other': 23
            }
          }
        }
      };

      // 実際のAPIを試行し、失敗した場合はモックデータを使用
      try {
        const response = await fetch('/api/analytics/dashboard', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setDashboardData(data.data);
            return;
          }
        }
      } catch (apiError) {
        console.log('API not available, using mock data');
      }

      // モックデータを使用（確実にデータを設定）
      console.log('Setting mock data:', mockData.data);
      setDashboardData(mockData.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      // エラーが発生してもモックデータを設定
      const fallbackData = {
        totalSurveys: 20,
        totalResponses: 2156,
        averageCompletionRate: 78.5,
        averageQualityScore: 72.3,
        surveys: [],
        insights: [],
        trends: {},
        demographics: {}
      };
      setDashboardData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const fetchSurveyAnalytics = async (surveyId) => {
    try {
      // モックデータを使用
      const mockSurveyData = {
        success: true,
        data: {
          id: surveyId,
          title: `アンケート ${surveyId} の詳細分析`,
          totalResponses: 156,
          completionRate: 82.1,
          averageQualityScore: 75.2,
          averageCompletionTime: 4.2,
          sentimentAnalysis: {
            positive: 45,
            negative: 25,
            neutral: 30
          },
          demographics: {
            ageGroups: {
              'under_20': 12,
              '20s': 45,
              '30s': 52,
              '40s': 31,
              '50s': 16,
              'over_60': 8
            },
            gender: {
              'male': 89,
              'female': 67
            }
          },
          questionAnalytics: [
            {
              questionId: 1,
              questionText: '普段使用しているスマートフォンのOSは何ですか？',
              questionType: 'radio',
              responseCount: 156,
              answerDistribution: {
                'iOS': 89,
                'Android': 67
              }
            },
            {
              questionId: 2,
              questionText: '1日にスマートフォンを使用する時間はどのくらいですか？',
              questionType: 'radio',
              responseCount: 142,
              answerDistribution: {
                '1時間未満': 23,
                '1-3時間': 45,
                '3-5時間': 52,
                '5時間以上': 22
              }
            }
          ]
        }
      };

      // 実際のAPIを試行し、失敗した場合はモックデータを使用
      try {
        const response = await fetch(`/api/analytics/survey/${surveyId}/analytics`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setSelectedSurvey(data.data);
            return;
          }
        }
      } catch (apiError) {
        console.log('API not available, using mock data');
      }

      // モックデータを使用
      setSelectedSurvey(mockSurveyData.data);
    } catch (error) {
      console.error('Failed to fetch survey analytics:', error);
    }
  };

  const generateReport = async (surveyId, format = 'pdf') => {
    try {
      const response = await fetch(`/api/analytics/survey/${surveyId}/generate-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_type: format,
          include_charts: true,
          include_insights: true,
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Download the report
        window.open(data.data.download_url, '_blank');
      }
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ログインが必要です</h2>
          <p className="text-gray-600">分析ダッシュボードを表示するにはログインしてください</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">AI分析データを読み込み中...</p>
          <p className="text-white text-sm mt-2">モックデータを準備しています...</p>
        </div>
      </div>
    );
  }

  // データが存在しない場合のフォールバック
  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-lg mb-4">データの読み込みに失敗しました</div>
          <button 
            onClick={() => fetchDashboardData()}
            className="btn-primary"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 fade-in">
        <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          AI分析ダッシュボード
        </h1>
        <p className="text-xl text-blue-100 flex items-center">
          <i className="fas fa-brain mr-2"></i>
          Domo.AI パワード アンケート分析システム
        </p>
      </div>

      {/* AI Insights Banner */}
      <div className="glass-card p-8 mb-8 text-white slide-in-left">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold mb-3 flex items-center">
              <i className="fas fa-brain mr-3 text-yellow-300"></i>
              AI インサイト
            </h3>
            <p className="text-blue-100 text-lg">リアルタイムでアンケートデータを分析し、自動的にインサイトを生成します</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-yellow-300">{dashboardData?.ai_recommendations?.length || 0}</div>
            <div className="text-blue-100 text-sm">アクティブな推奨事項</div>
            <div className="mt-2">
              <span className="status-indicator success">
                <i className="fas fa-check-circle mr-1"></i>
                アクティブ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid-responsive mb-8">
        <SurveyMetricCard 
          analytics={dashboardData} 
          loading={loading}
        />
        <ResponseMetricCard 
          analytics={dashboardData} 
          loading={loading}
        />
        <CompletionMetricCard 
          analytics={dashboardData} 
          loading={loading}
        />
        <QualityMetricCard 
          analytics={dashboardData} 
          loading={loading}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Survey List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">アンケート一覧</h3>
            <div className="space-y-3">
              {(dashboardData?.surveys || dashboardData?.recent_surveys || []).map((survey) => (
                <div
                  key={survey.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    selectedSurvey?.id === survey.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => fetchSurveyAnalytics(survey.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{survey.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">{survey.category}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs text-gray-500">
                          <i className="fas fa-users mr-1"></i>
                          {survey.responses || survey.response_count || 0} 回答
                        </span>
                        <span className="text-xs text-gray-500">
                          <i className="fas fa-percentage mr-1"></i>
                          {(survey.completionRate || survey.completion_rate || 0).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          generateReport(survey.id, 'pdf');
                        }}
                        className="text-blue-600 hover:text-blue-800 text-xs"
                      >
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {(!dashboardData?.surveys || dashboardData.surveys.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-chart-bar text-4xl mb-4"></i>
                  <p>アンケートデータを読み込み中...</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🤖 AI推奨事項</h3>
            <div className="space-y-3">
              {(dashboardData?.insights || dashboardData?.ai_recommendations || []).map((insight, index) => (
                <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <i className="fas fa-exclamation-triangle text-yellow-600"></i>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-yellow-800">
                        {insight.title || insight.survey_title || 'AI推奨事項'}
                      </h4>
                      <p className="text-xs text-yellow-700 mt-1">
                        {insight.description || insight.recommendation || '詳細な分析結果をお待ちください'}
                      </p>
                      {insight.confidence && (
                        <div className="mt-2">
                          <span className="text-xs text-yellow-600">
                            信頼度: {insight.confidence}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {(!dashboardData?.insights || dashboardData.insights.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-robot text-4xl mb-4"></i>
                  <p>AI推奨事項を生成中...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Analytics Details */}
        <div className="lg:col-span-2">
          {selectedSurvey ? (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">詳細分析</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'overview'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    概要
                  </button>
                  <button
                    onClick={() => setActiveTab('insights')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'insights'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    AIインサイト
                  </button>
                  <button
                    onClick={() => setActiveTab('demographics')}
                    className={`px-3 py-1 rounded text-sm ${
                      activeTab === 'demographics'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    デモグラフィック
                  </button>
                </div>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedSurvey.total_responses}
                      </div>
                      <div className="text-sm text-gray-600">総回答数</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedSurvey.completion_rate?.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">完了率</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedSurvey.average_completion_time?.toFixed(1)}分
                      </div>
                      <div className="text-sm text-gray-600">平均時間</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {selectedSurvey.response_quality_score?.toFixed(1)}
                      </div>
                      <div className="text-sm text-gray-600">品質スコア</div>
                    </div>
                  </div>

                  {/* Response Trend Chart */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">回答トレンド</h4>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <i className="fas fa-chart-line text-4xl mb-2"></i>
                        <p>チャート表示エリア</p>
                        <p className="text-sm">Chart.js または D3.js で実装</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'insights' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">🤖 AI生成インサイト</h4>
                    <p className="text-sm text-gray-600">
                      機械学習アルゴリズムが回答データを分析し、自動的にインサイトを生成しています。
                    </p>
                  </div>
                  
                  {/* Placeholder for AI insights */}
                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start">
                        <i className="fas fa-lightbulb text-green-600 mt-1"></i>
                        <div className="ml-3">
                          <h5 className="font-medium text-green-800">回答品質が向上しています</h5>
                          <p className="text-sm text-green-700 mt-1">
                            最近の回答は詳細で一貫性があり、分析に適しています。
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-start">
                        <i className="fas fa-chart-bar text-blue-600 mt-1"></i>
                        <div className="ml-3">
                          <h5 className="font-medium text-blue-800">回答者の満足度が高い</h5>
                          <p className="text-sm text-blue-700 mt-1">
                            感情分析の結果、回答者の80%がポジティブな感情を示しています。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'demographics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Gender Distribution */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">性別分布</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">男性</span>
                          <span className="text-sm font-medium">45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">女性</span>
                          <span className="text-sm font-medium">55%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-pink-600 h-2 rounded-full" style={{ width: '55%' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Age Distribution */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">年齢分布</h4>
                      <div className="space-y-2">
                        {[
                          { age: '20代', percentage: 30 },
                          { age: '30代', percentage: 40 },
                          { age: '40代', percentage: 20 },
                          { age: '50代以上', percentage: 10 },
                        ].map((item, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">{item.age}</span>
                              <span className="text-sm font-medium">{item.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center py-12">
                <i className="fas fa-chart-bar text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-medium text-gray-900 mb-2">アンケートを選択してください</h3>
                <p className="text-gray-600">左側のリストからアンケートを選択すると、詳細な分析が表示されます。</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
