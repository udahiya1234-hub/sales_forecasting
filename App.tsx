
import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import SummarySection from './components/SummarySection';
import MetricTable from './components/MetricTable';
import MetricsChart from './components/MetricsChart';
import InsightsDisplay from './components/InsightsDisplay';
import Footer from './components/Footer';
import GranularityHighlight from './components/GranularityHighlight';
import { METRIC_DATA, KEY_INSIGHTS, CHART_DATA, COLAB_NOTEBOOK_LINK, TOUR_SCRIPT } from './constants';

const App: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const synth = useRef<SpeechSynthesis | null>(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Helper to handle speech
  const speakText = (text: string, onEnd: () => void) => {
    if (!synth.current) return;
    
    // Cancel previous
    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to get a decent voice
    const voices = synth.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Samantha'));
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
      onEnd();
    };

    synth.current.speak(utterance);
  };

  const startTour = () => {
    if (currentStepIndex !== null) {
      // If running, stop it
      endTour();
      return;
    }
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const endTour = () => {
    if (synth.current) synth.current.cancel();
    setCurrentStepIndex(null);
    setIsPlaying(false);
    // Reset scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextStep = () => {
    if (currentStepIndex === null) return;
    if (currentStepIndex < TOUR_SCRIPT.length - 1) {
      setCurrentStepIndex(prev => (prev !== null ? prev + 1 : null));
    } else {
      endTour();
    }
  };

  // Effect to handle step changes
  useEffect(() => {
    if (currentStepIndex === null) return;

    const step = TOUR_SCRIPT[currentStepIndex];
    const element = document.getElementById(step.targetId);

    if (element) {
      // Scroll into view
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Play Audio (Simulated or Real)
    if (step.audioUrl) {
      // If we had real files:
      // const audio = new Audio(step.audioUrl);
      // audio.play();
      // audio.onended = nextStep;
    } else {
      // Fallback to browser TTS
      speakText(step.text, () => {
        // Auto advance after a small delay
        setTimeout(nextStep, 1500);
      });
    }

    return () => {
      if (synth.current) synth.current.cancel();
    };
  }, [currentStepIndex]);

  // Function to determine if a section is active for styling
  const getSectionStyle = (id: string) => {
    if (currentStepIndex === null) return ''; // No tour active
    
    const activeId = TOUR_SCRIPT[currentStepIndex].targetId;
    if (activeId === id) {
      return 'ring-4 ring-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.5)] scale-[1.02] z-50 bg-white rounded-2xl transition-all duration-500';
    }
    return 'opacity-20 blur-[2px] transition-all duration-500 grayscale';
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${currentStepIndex !== null ? 'bg-slate-950' : ''}`}>
      {/* Overlay when tour is active to darken background further */}
      {currentStepIndex !== null && (
        <div className="fixed inset-0 bg-black/60 z-40 pointer-events-none transition-opacity duration-500" />
      )}

      {/* Control Bar for Tour */}
      {currentStepIndex !== null && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-4 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full border border-slate-700 shadow-2xl">
          <div className="flex flex-col">
             <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Audio Guide</span>
             <span className="font-semibold">{TOUR_SCRIPT[currentStepIndex].title}</span>
          </div>
          <div className="h-8 w-px bg-slate-700 mx-2"></div>
          <button onClick={endTour} className="p-2 hover:bg-white/10 rounded-full transition-colors text-red-400" title="End Tour">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={nextStep} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Next">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
               <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
             </svg>
          </button>
        </div>
      )}

      <div id="header-section" className={getSectionStyle('header-section')}>
        <Header onStartTour={startTour} isTourActive={isPlaying} />
      </div>
      
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-20">
        {/* Overlap the header slightly for a layered effect */}
        <div className="-mt-16 md:-mt-24 space-y-10">
          
          <div id="summary-section" className={getSectionStyle('summary-section')}>
            <SummarySection />
          </div>

          <div id="granularity-section" className={getSectionStyle('granularity-section')}>
            <GranularityHighlight />
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div id="chart-section" className={getSectionStyle('chart-section')}>
              <MetricsChart data={CHART_DATA} />
            </div>
            <div id="table-section" className={getSectionStyle('table-section')}>
              <MetricTable data={METRIC_DATA} />
            </div>
          </div>
          
          <div id="insights-section" className={getSectionStyle('insights-section')}>
            <InsightsDisplay insights={KEY_INSIGHTS} />
          </div>

        </div>
      </main>
      
      <Footer colabLink={COLAB_NOTEBOOK_LINK} />
    </div>
  );
};

export default App;
