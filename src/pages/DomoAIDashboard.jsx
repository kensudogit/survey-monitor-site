import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import MetricCard from '../components/MetricCard';
import ModernChart from '../components/ModernChart';
import DomoAIChat from '../components/DomoAIChat';
import RealTimeAnalytics from '../components/RealTimeAnalytics';
import RiskAnalysis from '../components/RiskAnalysis';

const DomoAIDashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');
  const [showChat, setShowChat] = useState(true);

  useEffect(() => {
    fetchDomoData();
  }, []);

  const fetchDomoData = async () => {
    try {
      setLoading(true);
      
      // Domo.AI風のモックデータ
      const mockData = {
        success: true,
        data: {
          // ビジネスメトリクス
          businessMetrics: {
            totalRevenue: 2450000,
            revenueGrowth: 12.5,
            activeUsers: 15420,
            userGrowth: 8.3,
            conversionRate: 3.2,
            conversionGrowth: -2.1,
            customerSatisfaction: 4.6,
            satisfactionGrowth: 5.2
          },
          
          // リアルタイムデータ分析
          realTimeAnalytics: {
            currentVisitors: 1250,
            pageViews: 45600,
            bounceRate: 34.2,
            avgSessionDuration: 245,
            topPages: [
              { page: '/dashboard', views: 12500, growth: 15.2 },
              { page: '/analytics', views: 8900, growth: 8.7 },
              { page: '/reports', views: 6700, growth: -3.1 },
              { page: '/settings', views: 3200, growth: 12.4 }
            ]
          },
          
          // リスク分析
          riskAnalysis: {
            highRiskAreas: [
              { area: 'データセキュリティ', risk: 85, trend: 'increasing', impact: 'high' },
              { area: 'システムパフォーマンス', risk: 72, trend: 'stable', impact: 'medium' },
              { area: 'ユーザー離脱率', risk: 68, trend: 'decreasing', impact: 'high' },
              { area: 'データ品質', risk: 45, trend: 'stable', impact: 'medium' }
            ],
            predictions: [
              { metric: 'システム負荷', prediction: 'increasing', confidence: 89, timeframe: '7日以内' },
              { metric: 'ユーザー成長', prediction: 'stable', confidence: 76, timeframe: '30日以内' },
              { metric: '収益', prediction: 'increasing', confidence: 82, timeframe: '90日以内' }
            ]
          },
          
          // AI インサイト
          aiInsights: [
            {
              id: 1,
              type: 'anomaly',
              title: '異常なトラフィックパターンを検出',
              description: '午後2時から3時の間に通常の300%のトラフィック増加を検出しました。',
              confidence: 94,
              impact: 'high',
              recommendations: ['サーバー容量の確認', 'キャッシュ戦略の見直し', '負荷分散の最適化'],
              timestamp: new Date().toISOString()
            },
            {
              id: 2,
              type: 'opportunity',
              title: '新規ユーザー獲得の機会',
              description: 'モバイルユーザーの離脱率が高いため、モバイル体験の改善が推奨されます。',
              confidence: 87,
              impact: 'medium',
              recommendations: ['モバイルUIの最適化', 'ページ読み込み速度の改善', 'タッチインターフェースの向上'],
              timestamp: new Date().toISOString()
            },
            {
              id: 3,
              type: 'prediction',
              title: '売上予測の更新',
              description: '現在のトレンドに基づき、来月の売上は15%増加すると予測されます。',
              confidence: 78,
              impact: 'high',
              recommendations: ['在庫の準備', 'マーケティングキャンペーンの計画', 'スタッフ配置の調整'],
              timestamp: new Date().toISOString()
            }
          ],
          
          // データソース
          dataSources: [
            { name: 'Google Analytics', status: 'connected', lastSync: '2分前', records: 125000 },
            { name: 'Salesforce CRM', status: 'connected', lastSync: '5分前', records: 45000 },
            { name: 'MySQL Database', status: 'connected', lastSync: '1分前', records: 890000 },
            { name: 'API Endpoints', status: 'connected', lastSync: '30秒前', records: 23000 }
          ],
          
          // ダッシュボード
          dashboards: [
            {
              id: 1,
              title: 'Sales Dashboard',
              type: 'metadata',
              summary: 'Summary number',
              chart: 'bar',
              data: [
                { value: 120, label: 'Jan' },
                { value: 150, label: 'Feb' },
                { value: 180, label: 'Mar' },
                { value: 200, label: 'Apr' },
                { value: 220, label: 'May' },
                { value: 250, label: 'Jun' },
                { value: 280, label: 'Jul' }
              ],
              lastUpdated: '2時間前'
            },
            {
              id: 2,
              title: 'Traffic by Channel',
              type: 'previous quarter',
              summary: '25.5k visitors',
              chart: 'pie',
              data: [
                { value: 45, label: 'Organic' },
                { value: 30, label: 'Direct' },
                { value: 15, label: 'Social' },
                { value: 10, label: 'Email' }
              ],
              lastUpdated: '1時間前'
            },
            {
              id: 3,
              title: 'Marketing Funnel App',
              type: '45 users • 3 active',
              summary: 'Funnel visualization',
              chart: 'bar',
              data: [
                { value: 100, label: 'Awareness' },
                { value: 75, label: 'Interest' },
                { value: 50, label: 'Consideration' },
                { value: 25, label: 'Intent' },
                { value: 10, label: 'Purchase' }
              ],
              lastUpdated: '30分前'
            },
            {
              id: 4,
              title: 'Pricing Models',
              type: 'Last updated yesterday',
              summary: 'Jupyter notebook',
              chart: 'line',
              data: [
                { value: 85, label: 'Model A' },
                { value: 92, label: 'Model B' },
                { value: 78, label: 'Model C' },
                { value: 95, label: 'Model D' }
              ],
              lastUpdated: '1日前'
            }
          ],
          
          // トレンドデータ
          trends: {
            revenue: {
              '2024-01': 2100000,
              '2024-02': 2200000,
              '2024-03': 2300000,
              '2024-04': 2400000,
              '2024-05': 2450000
            },
            users: {
              '2024-01': 12000,
              '2024-02': 13000,
              '2024-03': 14000,
              '2024-04': 15000,
              '2024-05': 15420
            },
            conversion: {
              '2024-01': 3.5,
              '2024-02': 3.4,
              '2024-03': 3.3,
              '2024-04': 3.2,
              '2024-05': 3.2
            }
          }
        }
      };

      // 実際のAPIを試行し、失敗した場合はモックデータを使用
      try {
        const response = await fetch('/api/domo/dashboard', {
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

      // モックデータを使用
      setDashboardData(mockData.data);
    } catch (error) {
      console.error('Failed to fetch Domo data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-white text-lg">Domo.AI データを読み込み中...</p>
          <p className="text-white text-sm mt-2">AI分析エンジンを初期化しています...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="text-white text-lg mb-4">データの読み込みに失敗しました</div>
          <button 
            onClick={() => fetchDomoData()}
            className="btn-primary"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative">
      {/* Header */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                <i className="fas fa-brain text-white text-lg"></i>
              </div>
              <h1 className="text-2xl font-bold text-white">Domo.AI</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChat(!showChat)}
                className="bg-white bg-opacity-10 hover:bg-opacity-20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <i className="fas fa-comments mr-2"></i>
                AI Assistant
              </button>
              <div className="text-white">
                <div className="text-sm">Welcome back, {currentUser?.name || 'User'}</div>
                <div className="text-xs text-gray-300">It's been 4 days since your last visit</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Japanese Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <p className="text-lg leading-relaxed">
            AIを活用したリアルタイムデータ分析、リスク領域の特定、予測分析による意思決定の加速、
            リアルタイムのインサイトとAIモデルを活用したダッシュボードを統合し、
            組織全体でデータドリブンな意思決定を可能にするAIツールです。
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Visualize</h3>
              <i className="fas fa-chart-line text-blue-600 text-xl"></i>
            </div>
            <p className="text-gray-600 text-sm mb-4">データを視覚化して分析</p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Open Editor
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create Dashboard</h3>
              <i className="fas fa-plus-square text-green-600 text-xl"></i>
            </div>
            <p className="text-gray-600 text-sm mb-4">新しいダッシュボードを作成</p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
              Open Editor
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Connect Data</h3>
              <i className="fas fa-cloud text-purple-600 text-xl"></i>
            </div>
            <p className="text-gray-600 text-sm mb-4">クラウドデータソースに接続</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Browse Connectors
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Watch Demo</h3>
              <i className="fas fa-play text-red-600 text-xl"></i>
            </div>
            <p className="text-gray-600 text-sm mb-4">Domo デモの概要</p>
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
              Watch Now
            </button>
          </div>
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="総収益"
            value={`¥${(dashboardData.businessMetrics.totalRevenue / 1000000).toFixed(1)}M`}
            change={`+${dashboardData.businessMetrics.revenueGrowth}%`}
            changeType="positive"
            icon={<i className="fas fa-yen-sign" />}
            color="success"
            subtitle="前年同期比"
          />
          <MetricCard
            title="アクティブユーザー"
            value={dashboardData.businessMetrics.activeUsers.toLocaleString()}
            change={`+${dashboardData.businessMetrics.userGrowth}%`}
            changeType="positive"
            icon={<i className="fas fa-users" />}
            color="primary"
            subtitle="月間アクティブユーザー"
          />
          <MetricCard
            title="コンバージョン率"
            value={`${dashboardData.businessMetrics.conversionRate}%`}
            change={`${dashboardData.businessMetrics.conversionGrowth}%`}
            changeType="negative"
            icon={<i className="fas fa-percentage" />}
            color="warning"
            subtitle="全チャネル平均"
          />
          <MetricCard
            title="顧客満足度"
            value={`${dashboardData.businessMetrics.customerSatisfaction}/5`}
            change={`+${dashboardData.businessMetrics.satisfactionGrowth}%`}
            changeType="positive"
            icon={<i className="fas fa-star" />}
            color="info"
            subtitle="NPS スコア"
          />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {dashboardData.dashboards.map((dashboard) => (
            <div key={dashboard.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{dashboard.title}</h3>
                  <p className="text-sm text-gray-500">{dashboard.type}</p>
                </div>
                <span className="text-xs text-gray-400">{dashboard.lastUpdated}</span>
              </div>
              
              <div className="mb-4">
                <ModernChart
                  type={dashboard.chart}
                  data={dashboard.data}
                  height={200}
                />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{dashboard.summary}</span>
                <div className="flex items-center text-xs text-gray-500">
                  <i className={`fas fa-${dashboard.chart === 'bar' ? 'chart-bar' : dashboard.chart === 'pie' ? 'chart-pie' : 'code'} mr-1`}></i>
                  {dashboard.chart === 'bar' ? 'Chart' : dashboard.chart === 'pie' ? 'Chart' : 'Jupyter'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Analytics */}
        <RealTimeAnalytics data={dashboardData.realTimeAnalytics} />

        {/* Risk Analysis */}
        <RiskAnalysis riskData={dashboardData.riskAnalysis} />

        {/* AI Insights */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <i className="fas fa-brain mr-2 text-purple-600"></i>
            AI インサイト
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.aiInsights.map((insight) => (
              <div key={insight.id} className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'anomaly' ? 'border-red-500 bg-red-50' :
                insight.type === 'opportunity' ? 'border-green-500 bg-green-50' :
                'border-blue-500 bg-blue-50'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    insight.impact === 'high' ? 'bg-red-100 text-red-800' :
                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {insight.impact} impact
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                <div className="text-xs text-gray-500 mb-3">
                  信頼度: {insight.confidence}% • {new Date(insight.timestamp).toLocaleString()}
                </div>
                <div className="space-y-1">
                  {insight.recommendations.slice(0, 2).map((rec, index) => (
                    <div key={index} className="text-xs text-gray-600 flex items-center">
                      <i className="fas fa-arrow-right mr-1 text-gray-400"></i>
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">データソース</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dashboardData.dataSources.map((source, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-gray-900">{source.name}</div>
                  <div className={`w-2 h-2 rounded-full ${
                    source.status === 'connected' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                </div>
                <div className="text-sm text-gray-500">
                  最終同期: {source.lastSync}
                </div>
                <div className="text-sm text-gray-500">
                  レコード数: {source.records.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Domo.AI Chat Assistant */}
      {showChat && (
        <DomoAIChat 
          onClose={() => setShowChat(false)}
          dashboardData={dashboardData}
        />
      )}
    </div>
  );
};

export default DomoAIDashboard;
