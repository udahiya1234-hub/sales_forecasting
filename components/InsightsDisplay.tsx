
import React from 'react';
import { Insight } from '../types';

interface InsightsDisplayProps {
  insights: Insight[];
}

const InsightsDisplay: React.FC<InsightsDisplayProps> = ({ insights }) => {
  return (
    <section className="bg-white p-6 md:p-8 shadow-md rounded-lg mx-4 md:mx-auto mt-6 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Key Insights and Findings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">{insight.title}</h3>
            <p className="text-gray-700 leading-relaxed">{insight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InsightsDisplay;
