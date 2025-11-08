import React from 'react';
import { METRIC_DATA } from '../constants';

const GranularityHighlight: React.FC = () => {
  const weeklyResult = METRIC_DATA.find(g => g.granularity === 'Weekly');
  const weeklyMape = weeklyResult?.models[0]?.metrics.mape; // Both models have same MAPE for weekly

  if (weeklyMape === undefined) {
    return null; // Don't render if data isn't found
  }

  return (
    <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 md:p-8 shadow-lg rounded-lg mx-4 md:mx-auto mt-6 max-w-6xl text-center">
      <h2 className="text-3xl font-extrabold mb-3">Best Relative Accuracy</h2>
      <p className="text-xl opacity-90 mb-4">
        The model achieved its most reliable predictive performance at the weekly granularity.
      </p>
      <div className="flex items-center justify-center space-x-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-yellow-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125N7.5 4.5l4.5 9 4.5-9L21 13.125m-19.5 0h19.5" />
        </svg>
        <p className="text-6xl font-black">
          {weeklyMape.toFixed(2)}%
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-yellow-300">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125N7.5 4.5l4.5 9 4.5-9L21 13.125m-19.5 0h19.5" />
        </svg>
      </div>
      <p className="mt-4 text-lg opacity-90">
        (Mean Absolute Percentage Error for Weekly Sales)
      </p>
    </section>
  );
};

export default GranularityHighlight;