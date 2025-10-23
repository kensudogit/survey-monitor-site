import React from 'react';

const InsightCard = ({ 
  type = 'info',
  title, 
  description, 
  confidence, 
  recommendations = [],
  dataPoints = {},
  generatedByAI = false,
  priority = 'medium',
  className = ''
}) => {
  const typeStyles = {
    success: {
      border: 'border-emerald-500',
      bg: 'bg-gradient-to-r from-emerald-50 to-teal-50',
      icon: 'fas fa-check-circle text-emerald-600',
      iconBg: 'bg-emerald-100'
    },
    warning: {
      border: 'border-amber-500',
      bg: 'bg-gradient-to-r from-amber-50 to-orange-50',
      icon: 'fas fa-exclamation-triangle text-amber-600',
      iconBg: 'bg-amber-100'
    },
    danger: {
      border: 'border-red-500',
      bg: 'bg-gradient-to-r from-red-50 to-pink-50',
      icon: 'fas fa-exclamation-circle text-red-600',
      iconBg: 'bg-red-100'
    },
    info: {
      border: 'border-blue-500',
      bg: 'bg-gradient-to-r from-blue-50 to-indigo-50',
      icon: 'fas fa-info-circle text-blue-600',
      iconBg: 'bg-blue-100'
    }
  };

  const priorityStyles = {
    high: 'ring-2 ring-red-200',
    medium: 'ring-1 ring-gray-200',
    low: 'ring-1 ring-gray-100'
  };

  const styles = typeStyles[type];

  return (
    <div className={`insight-card ${styles.bg} ${styles.border} ${priorityStyles[priority]} ${className}`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-10 h-10 ${styles.iconBg} rounded-lg flex items-center justify-center`}>
          <i className={`${styles.icon} text-lg`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
            <div className="flex items-center space-x-2">
              {generatedByAI && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  <i className="fas fa-robot mr-1"></i>
                  AI
                </span>
              )}
              {confidence && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <i className="fas fa-chart-line mr-1"></i>
                  {confidence}%
                </span>
              )}
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
          
          {Object.keys(dataPoints).length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-medium text-gray-900 mb-2">データポイント</h5>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(dataPoints).map(([key, value]) => (
                  <div key={key} className="bg-white bg-opacity-50 rounded-lg p-2">
                    <div className="text-xs text-gray-600 uppercase tracking-wide">{key}</div>
                    <div className="text-sm font-semibold text-gray-900">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {recommendations.length > 0 && (
            <div>
              <h5 className="text-sm font-medium text-gray-900 mb-2">推奨事項</h5>
              <ul className="space-y-1">
                {recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                    <i className="fas fa-arrow-right text-gray-400 mt-1 flex-shrink-0"></i>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Specialized Insight Cards
export const CompletionInsightCard = ({ analytics }) => {
  const completionRate = analytics?.completion_rate || 0;
  
  if (completionRate < 70) {
    return (
      <InsightCard
        type="warning"
        title="完了率が低いです"
        description={`現在の完了率は${completionRate.toFixed(1)}%です。質問数を減らすか、インセンティブを増やすことを検討してください。`}
        confidence={85}
        recommendations={[
          '質問数を10問以下に減らす',
          'ポイントを20%増加させる',
          '完了時間を5分以内に設定する'
        ]}
        dataPoints={{
          '完了率': `${completionRate.toFixed(1)}%`,
          '目標': '70%以上'
        }}
        generatedByAI={true}
        priority="high"
      />
    );
  }
  
  return (
    <InsightCard
      type="success"
      title="完了率が良好です"
      description={`完了率${completionRate.toFixed(1)}%は目標を上回っています。この調子で維持してください。`}
      confidence={90}
      generatedByAI={true}
      priority="low"
    />
  );
};

export const QualityInsightCard = ({ analytics }) => {
  const qualityScore = analytics?.response_quality_score || 0;
  
  if (qualityScore < 60) {
    return (
      <InsightCard
        type="warning"
        title="回答品質が低いです"
        description={`回答品質スコアが${qualityScore.toFixed(1)}点です。質問の明確化や回答オプションの改善が必要です。`}
        confidence={80}
        recommendations={[
          '質問文をより具体的にする',
          '回答オプションを明確にする',
          '必須回答を適切に設定する'
        ]}
        dataPoints={{
          '品質スコア': qualityScore.toFixed(1),
          '目標': '60点以上'
        }}
        generatedByAI={true}
        priority="high"
      />
    );
  }
  
  return (
    <InsightCard
      type="success"
      title="回答品質が良好です"
      description={`品質スコア${qualityScore.toFixed(1)}点は目標を上回っています。高品質な回答が得られています。`}
      confidence={85}
      generatedByAI={true}
      priority="low"
    />
  );
};

export const DemographicInsightCard = ({ analytics }) => {
  const demographics = analytics?.demographic_breakdown;
  
  if (!demographics?.gender) return null;
  
  const genderData = demographics.gender;
  const totalGender = Object.values(genderData).reduce((sum, count) => sum + count, 0);
  
  let dominantGender = null;
  let dominantPercentage = 0;
  
  Object.entries(genderData).forEach(([gender, count]) => {
    const percentage = (count / totalGender) * 100;
    if (percentage > dominantPercentage) {
      dominantPercentage = percentage;
      dominantGender = gender;
    }
  });
  
  if (dominantPercentage > 70) {
    return (
      <InsightCard
        type="info"
        title="回答者の性別に偏りがあります"
        description={`回答者の${dominantPercentage.toFixed(1)}%が${dominantGender}です。より多様な回答を得るために、ターゲット層を拡大することを検討してください。`}
        confidence={75}
        recommendations={[
          '異なるチャネルでのプロモーション',
          'インセンティブの調整',
          'ターゲット層の見直し'
        ]}
        dataPoints={{
          '主要性別': dominantGender,
          '割合': `${dominantPercentage.toFixed(1)}%`
        }}
        generatedByAI={true}
        priority="medium"
      />
    );
  }
  
  return (
    <InsightCard
      type="success"
      title="回答者の性別分布が良好です"
      description="回答者の性別分布がバランス良く、多様な意見が得られています。"
      confidence={80}
      generatedByAI={true}
      priority="low"
    />
  );
};

export const SentimentInsightCard = ({ analytics }) => {
  const sentiment = analytics?.sentiment_analysis;
  
  if (!sentiment) return null;
  
  const { positive, negative, neutral, total_text_responses } = sentiment;
  
  if (total_text_responses === 0) return null;
  
  const positivePercentage = (positive / total_text_responses) * 100;
  const negativePercentage = (negative / total_text_responses) * 100;
  
  if (negativePercentage > 30) {
    return (
      <InsightCard
        type="warning"
        title="ネガティブな感情が検出されています"
        description={`回答者の${negativePercentage.toFixed(1)}%がネガティブな感情を示しています。改善点を特定し、対応策を検討してください。`}
        confidence={70}
        recommendations={[
          'ネガティブな回答の詳細分析',
          '改善点の特定',
          'ユーザーフィードバックの収集'
        ]}
        dataPoints={{
          'ポジティブ': `${positivePercentage.toFixed(1)}%`,
          'ネガティブ': `${negativePercentage.toFixed(1)}%`,
          'ニュートラル': `${((neutral / total_text_responses) * 100).toFixed(1)}%`
        }}
        generatedByAI={true}
        priority="high"
      />
    );
  }
  
  if (positivePercentage > 60) {
    return (
      <InsightCard
        type="success"
        title="回答者の満足度が高いです"
        description={`回答者の${positivePercentage.toFixed(1)}%がポジティブな感情を示しています。良好な結果が得られています。`}
        confidence={85}
        generatedByAI={true}
        priority="low"
      />
    );
  }
  
  return (
    <InsightCard
      type="info"
      title="感情分析結果"
      description="回答者の感情分布がバランス良く、中立的な意見が多く得られています。"
      confidence={75}
      generatedByAI={true}
      priority="low"
    />
  );
};

export default InsightCard;
