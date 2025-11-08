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
  if (value > 1_000_000_000) { // Check for trillion-level numbers
    return value.toExponential(2);
  }
  return isPercentage ? `${value.toFixed(2)}%` : value.toFixed(2);
};

const CustomTooltip: React.FC<any> = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg text-sm">
        <p className="font-bold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${formatValue(entry.value)}${unit || ''}`}
          </p>
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
      // Always include all granularities for MAE/RMSE.
      // For MAPE, exclude hourly/daily if values are extremely high for readability.
      if (selectedMetric === 'MAPE') {
        const hasSensibleMAPE_LR = d.mape_lr !== undefined && d.mape_lr < 1000;
        const hasSensibleMAPE_Lasso = d.mape_lasso !== undefined && d.mape_lasso < 1000;
        const hasSensibleMAPE_OriginalLR = d.mape_original_lr !== undefined && d.mape_original_lr < 1000;
        return hasSensibleMAPE_LR || hasSensibleMAPE_Lasso || hasSensibleMAPE_OriginalLR;
      }
      return true; // Include all granularities for MAE/RMSE
    });
  }, [data, selectedMetric]);

  const yAxisFormatter = (value: number) => {
    return formatValue(value, selectedMetric === 'MAPE');
  };

  const metricUnit = selectedMetric === 'MAPE' ? '%' : '';

  return (
    <section className="bg-white p-6 md:p-8 shadow-md rounded-lg mx-4 md:mx-auto mt-6 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Visualizing Model Performance</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-3 bg-blue-50 p-3 rounded-md">Select Metric to View</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              name="metric"
              value="MAE"
              checked={selectedMetric === 'MAE'}
              onChange={() => setSelectedMetric('MAE')}
            />
            <span className="ml-2 text-gray-700 font-medium">Mean Absolute Error (MAE)</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-orange-600"
              name="metric"
              value="RMSE"
              checked={selectedMetric === 'RMSE'}
              onChange={() => setSelectedMetric('RMSE')}
            />
            <span className="ml-2 text-gray-700 font-medium">Root Mean Squared Error (RMSE)</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-green-600"
              name="metric"
              value="MAPE"
              checked={selectedMetric === 'MAPE'}
              onChange={() => setSelectedMetric('MAPE')}
            />
            <span className="ml-2 text-gray-700 font-medium">Mean Absolute Percentage Error (MAPE)</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-700 mb-4 text-center">
          Comparing {selectedMetric} for Scaled Linear Regression and Scaled Lasso models across different granularities.
          {selectedMetric === 'MAPE' && (
            <span className="block mt-2 text-sm text-red-600 italic">
              Note: Hourly and Daily MAPE values are excluded from this chart due to their extremely high magnitude (trillions), which distorts the scale.
            </span>
          )}
        </p>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="granularity" stroke="#555" tick={{ fill: '#333' }} />
            <YAxis stroke="#555" tick={{ fill: '#333' }} tickFormatter={yAxisFormatter} unit={metricUnit} />
            <Tooltip content={<CustomTooltip unit={metricUnit} />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            {selectedMetric === 'MAE' && (
              <>
                <Bar dataKey="mae_lr" name="LR Model (Scaled/Original)" fill="#4299e1" />
                <Bar dataKey="mae_lasso" name="Lasso Model" fill="#ed8936" />
              </>
            )}
            {selectedMetric === 'RMSE' && (
              <>
                <Bar dataKey="rmse_lr" name="LR Model (Scaled/Original)" fill="#63b3ed" />
                <Bar dataKey="rmse_lasso" name="Lasso Model" fill="#f6ad55" />
              </>
            )}
            {selectedMetric === 'MAPE' && (
              <>
                <Bar dataKey="mape_lr" name="LR Model (Scaled)" fill="#48bb78" />
                <Bar dataKey="mape_lasso" name="Lasso Model" fill="#81e6d9" />
                {/* Only show original LR MAPE if present in data */}
                <Bar dataKey="mape_original_lr" name="Original LR Model (Monthly)" fill="#a0aec0" />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default MetricsChart;