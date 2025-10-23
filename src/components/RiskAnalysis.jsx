import React, { useState, useEffect } from 'react';
import ModernChart from './ModernChart';

const RiskAnalysis = ({ riskData }) => {
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [riskTrends, setRiskTrends] = useState([]);

  useEffect(() => {
    // リスクトレンドデータを生成
    const trends = riskData.highRiskAreas.map(risk => ({
      name: risk.area,
      data: Array.from({ length: 12 }, (_, i) => {
        const baseRisk = risk.risk;
        const variation = (Math.random() - 0.5) * 20;
        return Math.max(0, Math.min(100, baseRisk + variation));
      })
    }));
    setRiskTrends(trends);
  }, [riskData]);

  const getRiskColor = (risk) => {
    if (risk >= 80) return 'text-red-600 bg-red-100';
    if (risk >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getRiskIcon = (risk) => {
    if (risk >= 80) return 'fas fa-exclamation-triangle';
    if (risk >= 60) return 'fas fa-exclamation-circle';
    return 'fas fa-check-circle';
  };

  return (
    <div className="space-y-6">
      {/* リスク概要 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <i className="fas fa-shield-alt mr-2 text-red-600"></i>
          リスク分析
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskData.highRiskAreas.map((risk, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                selectedRisk === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedRisk(selectedRisk === index ? null : index)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <i className={`${getRiskIcon(risk.risk)} mr-2 ${getRiskColor(risk.risk).split(' ')[0]}`}></i>
                  <h4 className="font-medium text-gray-900">{risk.area}</h4>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.risk)}`}>
                  {risk.risk}%
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">影響度:</span>
                  <span className={`font-medium ${
                    risk.impact === 'high' ? 'text-red-600' :
                    risk.impact === 'medium' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {risk.impact}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">トレンド:</span>
                  <span className={`font-medium flex items-center ${
                    risk.trend === 'increasing' ? 'text-red-600' :
                    risk.trend === 'stable' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    <i className={`fas fa-arrow-${risk.trend === 'increasing' ? 'up' : risk.trend === 'decreasing' ? 'down' : 'right'} mr-1`}></i>
                    {risk.trend}
                  </span>
                </div>
              </div>

              {/* リスクバー */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      risk.risk >= 80 ? 'bg-red-500' :
                      risk.risk >= 60 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${risk.risk}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* リスクトレンドチャート */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">リスクトレンド (過去12ヶ月)</h3>
        <div className="h-64">
          <ModernChart
            type="line"
            data={riskTrends.length > 0 ? riskTrends[0].data.map((value, index) => ({
              value: value,
              label: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'][index] || `Month ${index + 1}`
            })) : []}
            height={256}
          />
        </div>
      </div>

      {/* 予測分析 */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fas fa-crystal-ball mr-2 text-purple-600"></i>
          予測分析
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riskData.predictions.map((prediction, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{prediction.metric}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  prediction.prediction === 'increasing' ? 'bg-green-500' :
                  prediction.prediction === 'stable' ? 'bg-blue-500' :
                  'bg-red-500'
                }`}></div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">予測:</span>
                  <span className={`font-medium ${
                    prediction.prediction === 'increasing' ? 'text-green-600' :
                    prediction.prediction === 'stable' ? 'text-blue-600' :
                    'text-red-600'
                  }`}>
                    {prediction.prediction}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">信頼度:</span>
                  <span className="font-medium text-gray-900">{prediction.confidence}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">期間:</span>
                  <span className="font-medium text-gray-900">{prediction.timeframe}</span>
                </div>
              </div>

              {/* 信頼度バー */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${prediction.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 推奨アクション */}
      {selectedRisk !== null && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">推奨アクション</h3>
          <div className="space-y-3">
            {riskData.highRiskAreas[selectedRisk] && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  {riskData.highRiskAreas[selectedRisk].area} の改善策
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {getRecommendations(riskData.highRiskAreas[selectedRisk].area).map((rec, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start">
                        <i className="fas fa-lightbulb text-blue-600 mt-1 mr-2"></i>
                        <div>
                          <div className="font-medium text-blue-900">{rec.title}</div>
                          <div className="text-sm text-blue-700 mt-1">{rec.description}</div>
                          <div className="text-xs text-blue-600 mt-2">
                            優先度: {rec.priority} • 期間: {rec.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 推奨アクションを生成する関数
const getRecommendations = (area) => {
  const recommendations = {
    'データセキュリティ': [
      {
        title: '暗号化の強化',
        description: 'データベースの暗号化レベルを向上させ、アクセス制御を厳格化する',
        priority: '高',
        duration: '2週間'
      },
      {
        title: 'セキュリティ監査',
        description: '定期的なセキュリティ監査を実施し、脆弱性を特定・修正する',
        priority: '高',
        duration: '1ヶ月'
      }
    ],
    'システムパフォーマンス': [
      {
        title: 'キャッシュ戦略の最適化',
        description: 'Redisキャッシュの設定を最適化し、レスポンス時間を改善する',
        priority: '中',
        duration: '1週間'
      },
      {
        title: 'データベースクエリの最適化',
        description: '遅いクエリを特定し、インデックスを追加してパフォーマンスを向上させる',
        priority: '中',
        duration: '2週間'
      }
    ],
    'ユーザー離脱率': [
      {
        title: 'UX改善',
        description: 'ユーザーインターフェースを改善し、使いやすさを向上させる',
        priority: '高',
        duration: '3週間'
      },
      {
        title: 'ページ読み込み速度の最適化',
        description: '画像の最適化、CDNの導入などでページ読み込み速度を改善する',
        priority: '中',
        duration: '2週間'
      }
    ],
    'データ品質': [
      {
        title: 'データ検証ルールの追加',
        description: '入力データの検証ルールを強化し、データ品質を向上させる',
        priority: '中',
        duration: '1週間'
      },
      {
        title: 'データクリーニングの自動化',
        description: '定期的なデータクリーニングプロセスを自動化する',
        priority: '低',
        duration: '2週間'
      }
    ]
  };

  return recommendations[area] || [
    {
      title: '一般的な改善策',
      description: 'この領域の具体的な改善策を検討する',
      priority: '中',
      duration: '1週間'
    }
  ];
};

export default RiskAnalysis;
