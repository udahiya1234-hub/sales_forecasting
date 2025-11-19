
import React from 'react';
import { METRIC_DATA } from '../constants';

const GranularityHighlight: React.FC = () => {
  const weeklyResult = METRIC_DATA.find(g => g.granularity === 'Weekly');
  const weeklyMape = weeklyResult?.models[0]?.metrics.mape;

  if (weeklyMape === undefined) {
    return null;
  }

  return (
    <section className="relative overflow-hidden rounded-2xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      
      <div className="relative z-10 p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0 md:pr-8">
          <div className="inline-block bg-white/20 backdrop-blur-md rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
            Top Performer
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Weekly Granularity</h2>
          <p className="text-emerald-100 text-lg max-w-xl">
            The model achieved its most reliable predictive performance when aggregated at the weekly level, smoothing out daily noise.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 flex items-center shadow-inner transform transition hover:scale-105 duration-300">
          <div className="mr-4 bg-white text-emerald-600 p-3 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-emerald-200 tracking-wider">Best Accuracy (MAPE)</p>
            <p className="text-5xl font-black tracking-tight">{weeklyMape.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GranularityHighlight;
