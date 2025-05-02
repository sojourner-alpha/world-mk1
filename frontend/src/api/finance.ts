/**
 * Finance API client for interacting with financial calculation endpoints
 */
import api from './index';

// ----- Types for API Requests -----

interface CashFlowInput {
  cash_flows: number[];
  discount_rate: number;
  periods?: number[];
  terminal_growth_rate?: number;
  terminal_multiple?: number;
}

interface MortgageInput {
  principal: number;
  annual_interest_rate: number;
  years: number;
  monthly_payment?: number;
  additional_payment?: number;
}

interface PortfolioInput {
  returns: number[];
  volatilities: number[];
  correlations: number[][];
  risk_free_rate?: number;
  target_return?: number;
  target_volatility?: number;
  allow_short?: boolean;
}

interface FundamentalRatiosInput {
  net_income?: number;
  revenue?: number;
  total_assets?: number;
  shareholders_equity?: number;
  current_assets?: number;
  current_liabilities?: number;
  inventory?: number;
  cost_of_goods_sold?: number;
  operating_income?: number;
  interest_expense?: number;
  total_debt?: number;
}

interface TechnicalIndicatorInput {
  prices: number[];
  high_prices?: number[];
  low_prices?: number[];
  volume?: number[];
  window?: number;
  fast_period?: number;
  slow_period?: number;
  signal_period?: number;
}

interface ValuationRatiosInput {
  price: number;
  earnings_per_share?: number;
  book_value_per_share?: number;
  sales_per_share?: number;
  enterprise_value?: number;
  ebitda?: number;
  sales?: number;
  earnings_growth_rate?: number;
  annual_dividend?: number;
}

interface RegressionInput {
  x_ticker: string;
  y_ticker: string;
  start_date: string;
  end_date?: string;
  interval?: string;
  model_type?: string;
  add_features?: boolean;
  test_size?: number;
  use_cache?: boolean;
}

// ----- Types for API Responses -----

interface NPVResponse {
  npv: number;
  input: CashFlowInput;
}

interface IRRResponse {
  irr: number | null;
  input: CashFlowInput;
}

interface DCFResponse {
  pv_forecast_cash_flows: number;
  terminal_value: number;
  pv_terminal_value: number;
  enterprise_value: number;
  pv_breakdown: number[];
  input: CashFlowInput;
}

interface MortgageResponse {
  monthly_payment: number;
  total_payments: number;
  total_interest: number;
  total_periods: number;
  years_to_payoff: number;
  schedule: Array<{
    period: number;
    payment: number;
    principal: number;
    interest: number;
    remaining_balance: number;
  }>;
}

interface FundamentalRatiosResponse {
  roe?: number;
  roa?: number;
  net_profit_margin?: number;
  operating_margin?: number;
  gross_margin?: number;
  current_ratio?: number;
  quick_ratio?: number;
  debt_to_equity?: number;
  interest_coverage?: number;
  dupont_analysis?: {
    roe: number;
    net_profit_margin: number;
    asset_turnover: number;
    equity_multiplier: number;
  };
}

interface PortfolioResponse {
  weights: number[];
  expected_return: number;
  expected_volatility: number;
  sharpe_ratio: number;
  success: boolean;
}

interface EfficientFrontierResponse {
  returns: number[];
  volatilities: number[];
  sharpe_ratios: number[];
  weights: number[][];
}

interface RegressionResponse {
  id: number;
  x_ticker: string;
  y_ticker: string;
  start_date: string;
  end_date: string;
  data_points: number;
  model_type: string;
  statistics: {
    model_type: string;
    coefficients: number[] | { [quantile: string]: number[] };
    std_errors?: number[];
    t_values?: number[];
    p_values?: number[];
    r_squared?: number;
    adjusted_r_squared?: number;
    f_statistic?: number;
    f_pvalue?: number;
    aic?: number;
    bic?: number;
    residual_std_error?: number;
    intercept?: number;
    alpha?: number;
    l1_ratio?: number;
    diagnostics?: {
      heteroskedasticity?: {
        test: string;
        statistic: number;
        p_value: number;
        conclusion: string;
      };
      autocorrelation?: {
        test: string;
        statistic: number;
        p_value: number;
        conclusion: string;
      };
      normality?: {
        test: string;
        statistic: number;
        p_value: number;
        conclusion: string;
      };
    };
    test_metrics?: {
      mse: number;
      rmse: number;
      r2: number;
    };
    anova_table?: {
      df_model: number;
      df_residual: number;
      df_total: number;
      sum_squares_model: number;
      sum_squares_residual: number;
      sum_squares_total: number;
      mean_square_model: number;
      mean_square_residual: number;
      f_value: number;
      p_value: number;
    };
  };
  correlation: {
    pearson: {
      r: number;
      "p-value": number;
      "CI95%": [number, number];
      bf10: number;
      power: number;
    };
    spearman: {
      r: number;
      "p-value": number;
      "CI95%": [number, number];
    };
    partial_correlation?: {
      r: number;
      "p-value": number;
    };
    rolling_correlation: {
      mean: number;
      std: number;
      min: number;
      max: number;
      current: number | null;
    };
    time_period: {
      start: string;
      end: string;
      observations: number;
    };
  };
  summary: string;
  created_at: string;
}

interface RecentRegressionSearch {
  id: number;
  regression_id: number;
  x_ticker: string;
  y_ticker: string;
  searched_at: string;
}

interface RegressionModels {
  [key: string]: string;
}

// Financial calculation API methods
export const financeApi = {
  /**
   * Calculate Net Present Value
   */
  calculateNPV: (data: CashFlowInput) => 
    api.post<NPVResponse>('finance/npv', data),
  
  /**
   * Calculate Internal Rate of Return
   */
  calculateIRR: (data: CashFlowInput) => 
    api.post<IRRResponse>('finance/irr', data),
  
  /**
   * Perform Discounted Cash Flow valuation
   */
  calculateDCF: (data: CashFlowInput) =>
    api.post<DCFResponse>('finance/dcf', data),
  
  /**
   * Calculate mortgage details and amortization schedule
   */
  calculateMortgage: (data: MortgageInput) => 
    api.post<MortgageResponse>('finance/mortgage-calculator', data),
  
  /**
   * Calculate fundamental financial ratios
   */
  calculateFundamentalRatios: (data: FundamentalRatiosInput) =>
    api.post<FundamentalRatiosResponse>('finance/fundamental-ratios', data),
  
  /**
   * Calculate technical indicators
   */
  calculateTechnicalIndicators: (data: TechnicalIndicatorInput) =>
    api.post('finance/technical-indicators', data),
  
  /**
   * Calculate valuation ratios
   */
  calculateValuationRatios: (data: ValuationRatiosInput) =>
    api.post('finance/valuation-ratios', data),
  
  /**
   * Perform portfolio optimization
   */
  optimizePortfolio: (data: PortfolioInput) =>
    api.post<PortfolioResponse>('finance/portfolio-optimization', data),
  
  /**
   * Generate efficient frontier for portfolio optimization
   */
  calculateEfficientFrontier: (data: PortfolioInput) =>
    api.post<EfficientFrontierResponse>('finance/efficient-frontier', data),
  
  /**
   * Perform regression analysis on two stocks
   */
  runRegressionAnalysis: (data: RegressionInput) =>
    api.post<RegressionResponse>('finance/regression-analysis', data),
  
  /**
   * Get recent regression searches
   */
  getRecentRegressions: (limit: number = 10) =>
    api.get<RecentRegressionSearch[]>(`finance/recent-regressions?limit=${limit}`),

  /**
   * Get available regression model types
   */
  getRegressionModels: () =>
    api.get<RegressionModels>('finance/regression-models'),
};

export default financeApi; 