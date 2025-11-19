
import React from 'react';
import { GranularityResult, ModelResult } from '../types';

interface MetricTableProps {
  data: GranularityResult[];
}

const MetricTable: React.FC<MetricTableProps> = ({ data }) => {
  const formatNumber = (num: number, isPercentage: boolean = false) => {
    if (num > 1_000_000_000) {
      return num.toExponential(2);
    }
    return isPercentage ? `${num.toFixed(2)}%` : num.toFixed(2);
  };

  return (
    <section className="bg-white rounded-2xl shadow-xl border border-slate-100 flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
        <h2 className="text-xl font-bold text-slate-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Detailed Metrics
        </h2>
      </div>
      
      <div className="p-6 overflow-y-auto custom-scrollbar">
        {data.map((granularityData, index) => (
          <div key={granularityData.granularity} className={`mb-8 ${index === data.length - 1 ? 'mb-0' : ''}`}>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 pl-1">
              {granularityData.granularity}
            </h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-3 px-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Model</th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">MAE</th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">RMSE</th>
                    <th className="py-3 px-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">MAPE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {granularityData.models.map((model: ModelResult) => (
                    <tr key={model.name} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-sm font-medium text-slate-800">{model.name}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 text-right font-mono">{formatNumber(model.metrics.mae)}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 text-right font-mono">{formatNumber(model.metrics.rmse)}</td>
                      <td className="py-3 px-4 text-sm text-slate-600 text-right font-mono">
                        {model.metrics.note ? (
                          <div className="flex items-center justify-end gap-1 text-red-500" title={model.metrics.note}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            {formatNumber(model.metrics.mape, true)}
                          </div>
                        ) : (
                          <span className="text-emerald-600 font-semibold">{formatNumber(model.metrics.mape, true)}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MetricTable;
