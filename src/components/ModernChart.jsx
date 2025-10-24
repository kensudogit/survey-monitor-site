import React, { useEffect, useRef } from 'react';

// Modern Chart Component with CSS animations
const ModernChart = ({ type, data, title, height = 300, className = '', options = {} }) => {
  const chartRef = useRef(null);

  // データ検証とフォールバック
  const validateData = (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }
    
    return data.map(item => {
      if (typeof item === 'number') {
        return { value: item, label: `Item ${item}` };
      }
      if (typeof item === 'object' && item !== null) {
        return {
          value: typeof item.value === 'number' && !isNaN(item.value) ? item.value : 0,
          label: item.label || item.name || 'Unknown'
        };
      }
      return { value: 0, label: 'Invalid' };
    }).filter(item => item.value >= 0);
  };

  const validatedData = validateData(data);

  useEffect(() => {
    // Simulate chart rendering with CSS animations
    if (chartRef.current) {
      chartRef.current.classList.add('fade-in');
    }
  }, [validatedData]);

  const renderChart = () => {
    if (validatedData.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <i className="fas fa-chart-bar text-4xl mb-2"></i>
            <p>データがありません</p>
          </div>
        </div>
      );
    }

    switch (type) {
      case 'line':
        return <LineChart data={validatedData} height={height} />;
      case 'bar':
        return <BarChart data={validatedData} height={height} />;
      case 'pie':
        return <PieChart data={validatedData} height={height} />;
      case 'area':
        return <AreaChart data={validatedData} height={height} />;
      case 'donut':
        return <DonutChart data={validatedData} height={height} />;
      default:
        return <LineChart data={validatedData} height={height} />;
    }
  };

  return (
    <div className={`chart-container ${className}`} ref={chartRef}>
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">リアルタイム</span>
          </div>
        </div>
      )}
      <div className="chart-wrapper" style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
    </div>
  );
};

// Line Chart Component
const LineChart = ({ data, height }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-chart-line text-4xl mb-2"></i>
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  const values = data.map(d => d.value).filter(v => typeof v === 'number' && !isNaN(v));
  if (values.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p>有効なデータがありません</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue === minValue ? 1 : maxValue - minValue;

  return (
    <div className="relative w-full h-full">
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Grid Lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Data Line */}
        <polyline
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={data.map((d, i) => {
            const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
            const y = 100 - ((d.value - minValue) / range) * 80;
            return `${x}%,${y}%`;
          }).join(' ')}
          className="animate-draw"
        />
        
        {/* Data Points */}
        {data.map((d, i) => {
          const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
          const y = 100 - ((d.value - minValue) / range) * 80;
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill="white"
              stroke="var(--primary-500)"
              strokeWidth="2"
              className="animate-scale"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          );
        })}
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary-500)" />
            <stop offset="100%" stopColor="var(--accent-purple)" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Chart Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
        {data.map((d, i) => (
          <span key={i} className="transform -rotate-45 origin-left">
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
};

// Bar Chart Component
const BarChart = ({ data, height }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-chart-bar text-4xl mb-2"></i>
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  const values = data.map(d => d.value).filter(v => typeof v === 'number' && !isNaN(v));
  if (values.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p>有効なデータがありません</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...values);

  return (
    <div className="relative w-full h-full flex items-end justify-between px-4">
      {data.map((d, i) => {
        const barHeight = maxValue > 0 ? (d.value / maxValue) * 100 : 0;
        return (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div
              className="w-8 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500 ease-out hover:from-blue-600 hover:to-purple-600"
              style={{ 
                height: `${barHeight}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
            <span className="text-xs text-gray-500 font-medium">{d.label}</span>
            <span className="text-xs text-gray-400">{d.value}</span>
          </div>
        );
      })}
    </div>
  );
};

// Pie Chart Component
const PieChart = ({ data, height }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-chart-pie text-4xl mb-2"></i>
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  const validData = data.filter(d => typeof d.value === 'number' && !isNaN(d.value) && d.value > 0);
  if (validData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p>有効なデータがありません</p>
        </div>
      </div>
    );
  }

  const total = validData.reduce((sum, d) => sum + d.value, 0);
  let cumulativePercentage = 0;

  const colors = [
    'var(--primary-500)',
    'var(--accent-purple)',
    'var(--accent-emerald)',
    'var(--accent-amber)',
    'var(--accent-red)',
    'var(--accent-pink)'
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="200" height="200" className="transform -rotate-90">
        {data.map((d, i) => {
          const percentage = (d.value / total) * 100;
          const startAngle = (cumulativePercentage / 100) * 360;
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
          
          const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = percentage > 50 ? 1 : 0;
          
          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');

          cumulativePercentage += percentage;

          return (
            <path
              key={i}
              d={pathData}
              fill={colors[i % colors.length]}
              className="hover:opacity-80 transition-opacity duration-200"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          );
        })}
      </svg>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500">総数</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute right-0 top-0 space-y-2">
        {validData.map((d, i) => (
          <div key={i} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="text-xs text-gray-600">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Area Chart Component
const AreaChart = ({ data, height }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-chart-area text-4xl mb-2"></i>
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  const values = data.map(d => d.value).filter(v => typeof v === 'number' && !isNaN(v));
  if (values.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p>有効なデータがありません</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const range = maxValue === minValue ? 1 : maxValue - minValue;

  const pathData = data.map((d, i) => {
    const x = data.length > 1 ? (i / (data.length - 1)) * 100 : 50;
    const y = 100 - ((d.value - minValue) / range) * 80;
    return `${x},${y}`;
  }).join(' L ');

  const areaPath = `M 0,100 L ${pathData} L 100,100 Z`;

  return (
    <div className="relative w-full h-full">
      <svg width="100%" height="100%" className="overflow-visible">
        {/* Area Fill */}
        <path
          d={areaPath}
          fill="url(#areaGradient)"
          className="animate-fade-in"
        />
        
        {/* Line */}
        <polyline
          fill="none"
          stroke="var(--primary-500)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pathData}
          className="animate-draw"
        />
        
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-500)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--primary-500)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Donut Chart Component
const DonutChart = ({ data, height }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-chart-pie text-4xl mb-2"></i>
          <p>データがありません</p>
        </div>
      </div>
    );
  }

  const validData = data.filter(d => typeof d.value === 'number' && !isNaN(d.value) && d.value > 0);
  if (validData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl mb-2"></i>
          <p>有効なデータがありません</p>
        </div>
      </div>
    );
  }

  const total = validData.reduce((sum, d) => sum + d.value, 0);
  let cumulativePercentage = 0;

  const colors = [
    'var(--primary-500)',
    'var(--accent-purple)',
    'var(--accent-emerald)',
    'var(--accent-amber)',
    'var(--accent-red)',
    'var(--accent-pink)'
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg width="200" height="200" className="transform -rotate-90">
        {validData.map((d, i) => {
          const percentage = (d.value / total) * 100;
          const startAngle = (cumulativePercentage / 100) * 360;
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
          
          const x1 = 100 + 60 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 100 + 60 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 100 + 60 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 100 + 60 * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = percentage > 50 ? 1 : 0;
          
          const pathData = [
            `M 100 100`,
            `L ${x1} ${y1}`,
            `A 60 60 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');

          cumulativePercentage += percentage;

          return (
            <path
              key={i}
              d={pathData}
              fill={colors[i % colors.length]}
              className="hover:opacity-80 transition-opacity duration-200"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          );
        })}
      </svg>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-sm text-gray-500">総数</div>
        </div>
      </div>
    </div>
  );
};

export default ModernChart;
