/**
 * Finance API client for interacting with financial calculation endpoints
 */
import api from './index';

// Types
interface CashFlowInput {
  cash_flows: number[];
  discount_rate: number;
  periods?: number[];
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
}

// Financial calculation API methods
export const financeApi = {
  /**
   * Calculate Net Present Value
   */
  calculateNPV: (data: CashFlowInput) => 
    api.post<{ npv: number; input: CashFlowInput }>('finance/npv', data),
  
  /**
   * Calculate Internal Rate of Return
   */
  calculateIRR: (data: CashFlowInput) => 
    api.post<{ irr: number; input: CashFlowInput }>('finance/irr', data),
  
  /**
   * Calculate mortgage details and amortization schedule
   */
  calculateMortgage: (data: MortgageInput) => 
    api.post<{
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
    }>('finance/mortgage-calculator', data),
    
  // Additional financial calculations can be added here
};

export default financeApi; 