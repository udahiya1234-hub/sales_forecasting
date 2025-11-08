
import React from 'react';
import { GranularityResult, ModelResult } from '../types';

interface MetricTableProps {
  data: GranularityResult[];
}

const MetricTable: React.FC<MetricTableProps> = ({ data }) => {
  const formatNumber = (num: number, isPercentage: boolean = false) => {
    if (num > 1_000_000_000) { // Check for trillion-level numbers
      return num.toExponential(2);
    }
    return isPercentage ? `${num.toFixed(2)}%` : num.toFixed(2);
  };

  return (
    <section className="bg-white p-6 md:p-8 shadow-md rounded-lg mx-4 md:mx-auto mt-6 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Detailed Model Metrics by Granularity</h2>
      {data.map((granularityData) => (
        <div key={granularityData.granularity} className="mb-8">
          <h3 className="text-xl font-semibold text-blue-700 mb-4 bg-blue-50 p-3 rounded-md">
            {granularityData.granularity} Granularity
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    Model
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    MAE
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    RMSE
                  </th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-600 uppercase tracking-wider border-b">
                    MAPE
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {granularityData.models.map((model: ModelResult) => (
                  <tr key={model.name} className="hover:bg-gray-50">
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {model.name}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      {formatNumber(model.metrics.mae)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      {formatNumber(model.metrics.rmse)}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">
                      {model.metrics.note ? (
                        <span className="text-red-600" title={model.metrics.note}>
                          {formatNumber(model.metrics.mape, true)}*
                          <span className="hidden sm:inline-block text-xs ml-1">(See Note)</span>
                        </span>
                      ) : formatNumber(model.metrics.mape, true)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {granularityData.models.some(model => model.metrics.note) && (
            <p className="mt-2 text-sm text-gray-600 italic">
              * Note: Extremely high MAPE values (e.g., in trillions) typically indicate issues with predicting zero or near-zero values, common in sparse datasets.
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default MetricTable;
