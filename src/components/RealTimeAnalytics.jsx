import React, { useState, useEffect } from 'react';
import ModernChart from './ModernChart';

/**
 * リアルタイム分析コンポーネント
 * 
 * リアルタイムでデータを更新・表示する分析ダッシュボード
 * 訪問者数、ページビュー、直帰率、セッション時間などのメトリクスを提供
 */
const RealTimeAnalytics = ({ data }) => {
  // リアルタイムデータとライブ状態の管理
  const [realTimeData, setRealTimeData] = useState(data);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    // リアルタイムデータ更新のインターバル設定
    const interval = setInterval(() => {
      // リアルタイムデータを更新
      setRealTimeData(prev => ({
        ...prev,
        currentVisitors: prev.currentVisitors + Math.floor(Math.random() * 20) - 10,
        pageViews: prev.pageViews + Math.floor(Math.random() * 100),
        bounceRate: Math.max(0, prev.bounceRate + (Math.random() - 0.5) * 2),
        avgSessionDuration: Math.max(0, prev.avgSessionDuration + Math.floor(Math.random() * 20) - 10)
      }));
    }, 5000); // 5秒ごとに更新

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <i className="fas fa-pulse mr-2 text-green-600"></i>
          リアルタイム分析
        </h3>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-sm text-gray-600">{isLive ? 'Live' : 'Paused'}</span>
          <button
            onClick={() => setIsLive(!isLive)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {isLive ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>

      {/* リアルタイムメトリクス */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{realTimeData.currentVisitors.toLocaleString()}</div>
          <div className="text-sm text-gray-600">現在の訪問者</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{realTimeData.pageViews.toLocaleString()}</div>
          <div className="text-sm text-gray-600">ページビュー</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{realTimeData.bounceRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">直帰率</div>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{Math.floor(realTimeData.avgSessionDuration / 60)}分</div>
          <div className="text-sm text-gray-600">平均セッション時間</div>
        </div>
      </div>

      {/* トップページ */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">トップページ</h4>
        <div className="space-y-3">
          {realTimeData.topPages.map((page, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{page.page}</div>
                  <div className="text-sm text-gray-500">{page.views.toLocaleString()} views</div>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                page.growth > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {page.growth > 0 ? '+' : ''}{page.growth}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* リアルタイムチャート */}
      <div className="h-64">
        <ModernChart
          type="line"
          data={[
            { value: 800, label: '14:00' },
            { value: 850, label: '14:05' },
            { value: 920, label: '14:10' },
            { value: 880, label: '14:15' },
            { value: 950, label: '14:20' },
            { value: 1000, label: '14:25' },
            { value: 1050, label: '14:30' },
            { value: 1100, label: '14:35' },
            { value: 1080, label: '14:40' },
            { value: 1150, label: '14:45' },
            { value: 1200, label: '14:50' },
            { value: 1250, label: '14:55' },
            { value: 1300, label: '15:00' },
            { value: 1280, label: '15:05' },
            { value: 1350, label: '15:10' },
            { value: 1400, label: '15:15' },
            { value: 1380, label: '15:20' },
            { value: 1450, label: '15:25' },
            { value: 1500, label: '15:30' },
            { value: 1550, label: '15:35' }
          ]}
          height={256}
        />
      </div>
    </div>
  );
};

export default RealTimeAnalytics;
