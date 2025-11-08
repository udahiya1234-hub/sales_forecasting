import React from 'react';
import Header from './components/Header';
import SummarySection from './components/SummarySection';
import MetricTable from './components/MetricTable';
import MetricsChart from './components/MetricsChart';
import InsightsDisplay from './components/InsightsDisplay';
import Footer from './components/Footer';
import GranularityHighlight from './components/GranularityHighlight'; // New import
import { METRIC_DATA, KEY_INSIGHTS, CHART_DATA, COLAB_NOTEBOOK_LINK } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <SummarySection />
        <GranularityHighlight /> {/* New component added here */}
        <MetricTable data={METRIC_DATA} />
        <MetricsChart data={CHART_DATA} />
        <InsightsDisplay insights={KEY_INSIGHTS} />
      </main>
      <Footer colabLink={COLAB_NOTEBOOK_LINK} />
    </div>
  );
};

export default App;