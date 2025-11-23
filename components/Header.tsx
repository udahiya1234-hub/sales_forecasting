
import React from 'react';

interface HeaderProps {
  onStartTour: () => void;
  isTourActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ onStartTour, isTourActive }) => {
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
        
        <p className="mt-4 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light mb-8">
          A comparative analysis of <span className="font-semibold text-white">Scaled Linear Regression</span> and <span className="font-semibold text-white">Lasso</span> models, discovering key insights across multiple time granularities.
        </p>

        <button 
          onClick={onStartTour}
          className={`
            group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1
            ${isTourActive 
              ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-500/30' 
              : 'bg-white text-indigo-900 hover:bg-indigo-50'
            }
          `}
        >
          {isTourActive ? (
            <>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              Stop Audio Guide
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-indigo-600 group-hover:scale-110 transition-transform">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
              Start Audio Guide
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
