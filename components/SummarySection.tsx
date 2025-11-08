
import React from 'react';

const SummarySection: React.FC = () => {
  return (
    <section className="bg-white p-6 md:p-8 shadow-md rounded-lg mx-4 md:mx-auto mt-6 max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Overview of Model Performance</h2>
      <p className="text-gray-700 leading-relaxed">
        This dashboard presents a comparative analysis of Scaled Linear Regression and Scaled Lasso Regression models for sales forecasting.
        The models were evaluated across hourly, daily, and weekly granularities, with an additional look at monthly data using an
        Original Linear Regression model. Key metrics such as Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and
        Mean Absolute Percentage Error (MAPE) were used to assess performance.
      </p>
      <p className="mt-4 text-gray-700 leading-relaxed">
        A primary finding indicates that both scaled models exhibit very similar performance, with the weekly granularity showing the best relative accuracy.
        The models generally capture broader trends but face challenges with high-frequency variations and near-zero sales data.
      </p>
    </section>
  );
};

export default SummarySection;
