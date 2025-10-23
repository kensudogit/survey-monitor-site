import React from 'react';

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon, 
  color = 'primary',
  trend,
  subtitle,
  loading = false,
  className = ''
}) => {
  const colorClasses = {
    primary: 'from-blue-500 to-purple-500',
    success: 'from-emerald-500 to-teal-500',
    warning: 'from-amber-500 to-orange-500',
    danger: 'from-red-500 to-pink-500',
    info: 'from-cyan-500 to-blue-500'
  };

  const iconColors = {
    primary: 'text-blue-600 bg-blue-100',
    success: 'text-emerald-600 bg-emerald-100',
    warning: 'text-amber-600 bg-amber-100',
    danger: 'text-red-600 bg-red-100',
    info: 'text-cyan-600 bg-cyan-100'
  };

  const changeColors = {
    positive: 'text-emerald-600 bg-emerald-50',
    negative: 'text-red-600 bg-red-50',
    neutral: 'text-gray-600 bg-gray-50'
  };

  if (loading) {
    return (
      <div className={`metric-card ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`metric-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`metric-icon ${iconColors[color]}`}>
          {icon}
        </div>
        {change && (
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${changeColors[changeType]}`}>
            <span className="flex items-center">
              {changeType === 'positive' && <span className="mr-1">↗</span>}
              {changeType === 'negative' && <span className="mr-1">↘</span>}
              {changeType === 'neutral' && <span className="mr-1">→</span>}
              {change}
            </span>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="metric-value">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="metric-label">
          {title}
        </div>
        {subtitle && (
          <div className="text-sm text-gray-500 mt-1">
            {subtitle}
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>トレンド</span>
            <span>{trend.period}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${trend.percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Specialized Metric Cards
export const SurveyMetricCard = ({ survey, analytics, loading }) => (
  <MetricCard
    title="総アンケート数"
    value={analytics?.total_surveys || 0}
    change="+12%"
    changeType="positive"
    icon={<i className="fas fa-chart-line" />}
    color="primary"
    subtitle="アクティブなアンケート"
    loading={loading}
  />
);

export const ResponseMetricCard = ({ analytics, loading }) => (
  <MetricCard
    title="総回答数"
    value={analytics?.total_responses || 0}
    change="+8%"
    changeType="positive"
    icon={<i className="fas fa-check-circle" />}
    color="success"
    subtitle="今月の回答数"
    loading={loading}
  />
);

export const CompletionMetricCard = ({ analytics, loading }) => (
  <MetricCard
    title="平均完了率"
    value={`${analytics?.average_completion_rate?.toFixed(1) || 0}%`}
    change="-2%"
    changeType="negative"
    icon={<i className="fas fa-percentage" />}
    color="warning"
    subtitle="全アンケート平均"
    loading={loading}
  />
);

export const QualityMetricCard = ({ analytics, loading }) => (
  <MetricCard
    title="平均品質スコア"
    value={analytics?.average_response_quality?.toFixed(1) || 0}
    change="+5%"
    changeType="positive"
    icon={<i className="fas fa-star" />}
    color="info"
    subtitle="回答品質評価"
    loading={loading}
  />
);

export default MetricCard;
