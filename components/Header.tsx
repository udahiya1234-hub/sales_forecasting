
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="relative pt-20 pb-32 md:pt-32 md:pb-48 overflow-hidden">
      <div className="absolute inset-0 z-0">
         {/* Decorative elements */}
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/4"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-900/30 backdrop-blur-md text-indigo-200 text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
          <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
          AI Model Evaluation
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-6 drop-shadow-xl">
          Sales Forecasting <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Model Dashboard
          </span>
        </h1>
        
        <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
          A comparative analysis of <span className="font-semibold text-white">Scaled Linear Regression</span> and <span className="font-semibold text-white">Lasso</span> models, discovering key insights across multiple time granularities.
        </p>
      </div>
    </header>
  );
};

export default Header;
