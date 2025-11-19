
import React from 'react';
import Header from './components/Header';
import SummarySection from './components/SummarySection';
import MetricTable from './components/MetricTable';
import MetricsChart from './components/MetricsChart';
import InsightsDisplay from './components/InsightsDisplay';
import Footer from './components/Footer';
import GranularityHighlight from './components/GranularityHighlight';
import { METRIC_DATA, KEY_INSIGHTS, CHART_DATA, COLAB_NOTEBOOK_LINK } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Overlap the header slightly for a layered effect */}
        <div className="-mt-16 md:-mt-24 space-y-10 relative z-20">
          <SummarySection />
          <GranularityHighlight />
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <MetricsChart data={CHART_DATA} />
            <MetricTable data={METRIC_DATA} />
          </div>
          
          <InsightsDisplay insights={KEY_INSIGHTS} />
        </div>
      </main>
      
      <Footer colabLink={COLAB_NOTEBOOK_LINK} />
    </div>
  );
};

export default App;
