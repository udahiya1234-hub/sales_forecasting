
import React from 'react';

const SummarySection: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
            <span className="bg-indigo-600 w-1.5 h-8 mr-3 rounded-full"></span>
            Performance Overview
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-6">
            This dashboard presents a comparative analysis of Scaled Linear Regression and Scaled Lasso Regression models for sales forecasting.
            Evaluated across <strong className="text-indigo-600">hourly, daily, and weekly</strong> granularities, we measure success using MAE, RMSE, and MAPE.
          </p>
          <p className="text-slate-600 leading-relaxed text-lg border-t border-slate-100 pt-6">
            <span className="font-semibold text-slate-800">Key Takeaway:</span> Both scaled models exhibit virtually identical performance, with the weekly granularity offering the most reliable signals amidst high-frequency noise.
          </p>
        </div>
        <div className="md:w-2/5 bg-slate-100 relative h-64 md:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
            alt="Data Analysis" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
