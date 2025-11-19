
import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';
import { ChartDataPoint } from '../types';

interface MetricsChartProps {
  data: ChartDataPoint[];
}

const formatValue = (value: number | undefined, isPercentage: boolean = false) => {
  if (value === undefined || value === null) return 'N/A';
  if (value > 1_000_000_000) {
    return value.toExponential(2);
  }
  return isPercentage ? `${value.toFixed(2)}%` : value.toFixed(2);
};

const CustomTooltip: React.FC<any> = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 text-white p-4 rounded-lg shadow-2xl border border-slate-700 text-sm">
        <p className="font-bold mb-2 text-slate-300 pb-2 border-b border-slate-600">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 py-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-slate-200">{entry.name}:</span>
            <span className="font-mono font-semibold text-white ml-auto pl-4">
              {formatValue(entry.value)}{unit || ''}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const MetricsChart: React.FC<MetricsChartProps> = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState<'MAE' | 'RMSE' | 'MAPE'>('MAE');

  const chartData = useMemo(() => {
    return data.filter(d => {
      if (selectedMetric === 'MAPE') {
        const hasSensibleMAPE_LR = d.mape_lr !== undefined && d.mape_lr < 1000;
        const hasSensibleMAPE_Lasso = d.mape_lasso !== undefined && d.mape_lasso < 1000;
        const hasSensibleMAPE_OriginalLR = d.mape_original_lr !== undefined && d.mape_original_lr < 1000;
        return hasSensibleMAPE_LR || hasSensibleMAPE_Lasso || hasSensibleMAPE_OriginalLR;
      }
      return true;
    });
  }, [data, selectedMetric]);

  const yAxisFormatter = (value: number) => {
    return formatValue(value, selectedMetric === 'MAPE');
  };

  const metricUnit = selectedMetric === 'MAPE' ? '%' : '';

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
          Visual Comparison
        </h2>
        
        <div className="flex bg-slate-200 p-1 rounded-lg">
          {(['MAE', 'RMSE', 'MAPE'] as const).map((metric) => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${
                selectedMetric === metric
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <p className="text-slate-500 mb-6 text-sm">
          Comparing <strong className="text-indigo-600">{selectedMetric}</strong> across granularities.
          {selectedMetric === 'MAPE' && (
            <span className="block mt-1 text-xs text-amber-600 bg-amber-50 border border-amber-100 p-2 rounded inline-block">
              Note: High-magnitude outliers removed for clarity.
            </span>
          )}
        </p>
        <div className="w-full h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barSize={40}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="granularity" 
                stroke="#94a3b8" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#cbd5e1' }}
              />
              <YAxis 
                stroke="#94a3b8" 
                tick={{ fill: '#64748b', fontSize: 12 }} 
                tickFormatter={yAxisFormatter} 
                unit={metricUnit}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip unit={metricUnit} />} cursor={{fill: '#f8fafc'}} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />

              {selectedMetric === 'MAE' && (
                <>
                  <Bar dataKey="mae_lr" name="LR Model" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mae_lasso" name="Lasso Model" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </>
              )}
              {selectedMetric === 'RMSE' && (
                <>
                  <Bar dataKey="rmse_lr" name="LR Model" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rmse_lasso" name="Lasso Model" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </>
              )}
              {selectedMetric === 'MAPE' && (
                <>
                  <Bar dataKey="mape_lr" name="LR Model" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mape_lasso" name="Lasso Model" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="mape_original_lr" name="Original LR" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default MetricsChart;
