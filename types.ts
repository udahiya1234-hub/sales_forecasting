
export interface Metrics {
  mae: number;
  rmse: number;
  mape: number;
  note?: string;
}

export interface ModelResult {
  name: string;
  metrics: Metrics;
}

export interface GranularityResult {
  granularity: string;
  models: ModelResult[];
}

export interface ChartDataPoint {
  granularity: string;
  mae_lr?: number;
  rmse_lr?: number;
  mape_lr?: number;
  mae_lasso?: number;
  rmse_lasso?: number;
  mape_lasso?: number;
  mape_original_lr?: number;
}

export interface Insight {
  title: string;
  description: string;
}
