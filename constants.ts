
import { GranularityResult, Insight, ChartDataPoint, TourStep } from './types';

export const METRIC_DATA: GranularityResult[] = [
  {
    granularity: 'Hourly',
    models: [
      { name: 'Scaled Linear Regression', metrics: { mae: 2.27, rmse: 3.39, mape: 716420962852.96, note: 'Extremely high due to zero/near-zero sales.' } },
      { name: 'Scaled Lasso', metrics: { mae: 2.27, rmse: 3.39, mape: 716420962852.96, note: 'Extremely high due to zero/near-zero sales.' } },
    ],
  },
  {
    granularity: 'Daily',
    models: [
      { name: 'Scaled Linear Regression', metrics: { mae: 563.51, rmse: 563.79, mape: 10381156792640.58, note: 'Extremely high due to zero/near-zero sales.' } },
      { name: 'Scaled Lasso', metrics: { mae: 563.51, rmse: 563.79, mape: 10381156792640.58, note: 'Extremely high due to zero/near-zero sales.' } },
    ],
  },
  {
    granularity: 'Weekly',
    models: [
      { name: 'Scaled Linear Regression', metrics: { mae: 52.08, rmse: 72.76, mape: 12.87 } },
      { name: 'Scaled Lasso', metrics: { mae: 52.08, rmse: 72.76, mape: 12.87 } },
    ],
  },
  {
    granularity: 'Monthly (Original LR Only)',
    models: [
      { name: 'Original Linear Regression', metrics: { mae: 347.16, rmse: 501.40, mape: 27.61 } },
    ],
  },
];

export const KEY_INSIGHTS: Insight[] = [
  {
    title: 'Similar Performance',
    description: 'The Scaled Linear Regression model and the Scaled Lasso Regression model achieved very similar performance across all evaluated granularities. Metrics are virtually identical.',
  },
  {
    title: 'Impact of Scaling',
    description: 'Scaling features had minimal to no significant impact on the final evaluation metrics for these linear models.',
  },
  {
    title: 'Lasso\'s Feature Selection',
    description: 'While Lasso performed feature selection, removing features did not lead to a notable improvement in predictive accuracy over basic LR with the same initial feature set.',
  },
  {
    title: 'Consistent Strengths',
    description: 'Both scaled models capture the overall trend and dominant seasonal patterns.',
  },
  {
    title: 'Consistent Weaknesses',
    description: 'Both models struggle with predicting zero or near-zero sales in the hourly and daily data (leading to astronomically high MAPEs). They tend to smooth out predictions, failing to capture exact peaks and troughs of high-frequency variations.',
  },
  {
    title: 'Best Granularity',
    description: 'The weekly model (for both Scaled LR and Scaled Lasso) shows the best relative accuracy with a MAPE of 12.87%.',
  },
  {
    title: 'Monthly Data Analysis (Original Linear Regression)',
    description: 'Due to small test set size, Scaled LR/Lasso were not evaluated monthly. Original Linear Regression (without scaling) on monthly data showed MAE = 347.16, RMSE = 501.40, MAPE = 27.61%, indicating significant errors relative to sales scale.',
  },
  {
    title: 'Final Insight',
    description: 'Current Linear and Lasso Regression models capture broader (weekly/monthly) sales patterns reasonably well but fail at finer levels (hourly/daily) due to data sparsity and zero-sales distortion. For actionable forecasting, focus on weekly aggregation, improved feature engineering, and advanced non-linear models.',
  },
];

export const CHART_DATA: ChartDataPoint[] = METRIC_DATA.map(g => {
  const dataPoint: ChartDataPoint = { granularity: g.granularity };
  g.models.forEach(model => {
    if (model.name.includes('Linear Regression')) { // Covers Scaled LR and Original LR
      dataPoint.mae_lr = model.metrics.mae;
      dataPoint.rmse_lr = model.metrics.rmse;
      // Only include MAPE for sensible values in the chart
      if (model.metrics.mape < 1000) { // Arbitrary threshold to exclude trillions %
        dataPoint.mape_lr = model.metrics.mape;
      }
    } else if (model.name.includes('Lasso')) {
      dataPoint.mae_lasso = model.metrics.mae;
      dataPoint.rmse_lasso = model.metrics.rmse;
      if (model.metrics.mape < 1000) {
        dataPoint.mape_lasso = model.metrics.mape;
      }
    }
  });
  return dataPoint;
});

export const COLAB_NOTEBOOK_LINK = "https://colab.research.google.com/drive/1iBlRoOwkuvO9gzAMWc7OFz4ZBPfetovF?usp=sharing";

export const TOUR_SCRIPT: TourStep[] = [
  {
    targetId: 'header-section',
    title: 'Welcome',
    text: 'Welcome to the Sales Forecasting Model Dashboard. This interactive report provides a comparative analysis of Scaled Linear Regression and Lasso models across different time granularities.'
  },
  {
    targetId: 'summary-section',
    title: 'Performance Overview',
    text: 'Here is the executive summary. Our analysis found that both models performed almost identically. The key challenge was high-frequency noise in hourly and daily data.'
  },
  {
    targetId: 'granularity-section',
    title: 'Key Finding',
    text: 'This is our most important finding: The Weekly Granularity was the top performer. By aggregating data weekly, we achieved a stable M.A.P.E. of 12.87%, significantly outperforming other timeframes.'
  },
  {
    targetId: 'chart-section',
    title: 'Visual Comparison',
    text: 'These charts visualize the error rates. You can toggle between MAE, RMSE, and MAPE. Notice how the green bars for Weekly data are much lower, indicating better accuracy.'
  },
  {
    targetId: 'table-section',
    title: 'Detailed Metrics',
    text: 'If you need the exact numbers, this table breaks down every model run. Note the high error rates for Hourly and Daily models caused by zero-sales periods.'
  },
  {
    targetId: 'insights-section',
    title: 'Strategic Insights',
    text: 'Finally, here are the strategic takeaways. Feature scaling had minimal impact, and future improvements should focus on advanced non-linear models for daily predictions.'
  }
];
