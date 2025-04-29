"""
Valuation module for financial analysis.
Contains functions for calculating valuation ratios and implementing valuation models.
"""
import numpy as np
import numpy_financial as npf
from typing import Dict, List, Union, Optional

# ----- Valuation Ratios -----

def price_to_earnings(price: float, earnings_per_share: float) -> float:
    """
    Calculate Price-to-Earnings (P/E) Ratio
    
    P/E = Price per Share / Earnings per Share
    
    Args:
        price: Current stock price
        earnings_per_share: Earnings per share (typically trailing twelve months)
        
    Returns:
        float: P/E ratio
    """
    if earnings_per_share == 0:
        raise ValueError("Earnings per share cannot be zero")
    
    return price / earnings_per_share

def price_to_book(price: float, book_value_per_share: float) -> float:
    """
    Calculate Price-to-Book (P/B) Ratio
    
    P/B = Price per Share / Book Value per Share
    
    Args:
        price: Current stock price
        book_value_per_share: Book value per share
        
    Returns:
        float: P/B ratio
    """
    if book_value_per_share == 0:
        raise ValueError("Book value per share cannot be zero")
    
    return price / book_value_per_share

def price_to_sales(price: float, sales_per_share: float) -> float:
    """
    Calculate Price-to-Sales (P/S) Ratio
    
    P/S = Price per Share / Sales per Share
    
    Args:
        price: Current stock price
        sales_per_share: Sales per share
        
    Returns:
        float: P/S ratio
    """
    if sales_per_share == 0:
        raise ValueError("Sales per share cannot be zero")
    
    return price / sales_per_share

def ev_to_ebitda(enterprise_value: float, ebitda: float) -> float:
    """
    Calculate Enterprise Value to EBITDA Ratio
    
    EV/EBITDA = Enterprise Value / EBITDA
    
    Args:
        enterprise_value: Enterprise value (market cap + debt - cash)
        ebitda: Earnings before interest, taxes, depreciation, and amortization
        
    Returns:
        float: EV/EBITDA ratio
    """
    if ebitda == 0:
        raise ValueError("EBITDA cannot be zero")
    
    return enterprise_value / ebitda

def ev_to_sales(enterprise_value: float, sales: float) -> float:
    """
    Calculate Enterprise Value to Sales Ratio
    
    EV/Sales = Enterprise Value / Sales
    
    Args:
        enterprise_value: Enterprise value (market cap + debt - cash)
        sales: Total sales/revenue
        
    Returns:
        float: EV/Sales ratio
    """
    if sales == 0:
        raise ValueError("Sales cannot be zero")
    
    return enterprise_value / sales

def peg_ratio(pe_ratio: float, earnings_growth_rate: float) -> float:
    """
    Calculate Price/Earnings to Growth (PEG) Ratio
    
    PEG = P/E Ratio / Annual EPS Growth Rate
    
    Args:
        pe_ratio: Price-to-earnings ratio
        earnings_growth_rate: Expected annual growth rate in earnings (as decimal)
        
    Returns:
        float: PEG ratio
    """
    if earnings_growth_rate == 0:
        raise ValueError("Earnings growth rate cannot be zero")
    
    return pe_ratio / (earnings_growth_rate * 100)  # Convert decimal to percentage

def dividend_yield(annual_dividend: float, price: float) -> float:
    """
    Calculate Dividend Yield
    
    Dividend Yield = Annual Dividend per Share / Price per Share
    
    Args:
        annual_dividend: Annual dividend per share
        price: Current stock price
        
    Returns:
        float: Dividend yield as a decimal value
    """
    if price == 0:
        raise ValueError("Price cannot be zero")
    
    return annual_dividend / price

# ----- Discounted Cash Flow Valuation -----

def calculate_wacc(
    equity_value: float,
    debt_value: float,
    cost_of_equity: float,
    cost_of_debt: float,
    tax_rate: float
) -> float:
    """
    Calculate Weighted Average Cost of Capital (WACC)
    
    WACC = (E/(D+E)) * Re + (D/(D+E)) * Rd * (1-T)
    
    Where:
    - E: Market value of equity
    - D: Market value of debt
    - Re: Cost of equity
    - Rd: Cost of debt
    - T: Tax rate
    
    Args:
        equity_value: Market value of equity
        debt_value: Market value of debt
        cost_of_equity: Cost of equity (as a decimal)
        cost_of_debt: Cost of debt (as a decimal)
        tax_rate: Tax rate (as a decimal)
        
    Returns:
        float: WACC as a decimal value
    """
    total_value = equity_value + debt_value
    
    if total_value == 0:
        raise ValueError("Total value of equity and debt cannot be zero")
    
    equity_weight = equity_value / total_value
    debt_weight = debt_value / total_value
    
    wacc = (equity_weight * cost_of_equity) + (debt_weight * cost_of_debt * (1 - tax_rate))
    
    return wacc

def dcf_valuation(
    cash_flows: List[float],
    discount_rate: float,
    terminal_value: Optional[float] = None,
    terminal_growth_rate: Optional[float] = None,
    terminal_multiple: Optional[float] = None
) -> Dict[str, float]:
    """
    Perform Discounted Cash Flow Valuation
    
    Args:
        cash_flows: List of projected cash flows (excluding terminal value)
        discount_rate: Discount rate (WACC) as a decimal
        terminal_value: Pre-calculated terminal value (optional)
        terminal_growth_rate: Growth rate for terminal value calculation (optional)
        terminal_multiple: Exit multiple for terminal value calculation (optional)
        
    Returns:
        Dict: DCF valuation results including PV of FCFs, terminal value, and enterprise value
    """
    if discount_rate <= 0 or discount_rate >= 1:
        raise ValueError("Discount rate must be between 0 and 1")
    
    # Calculate present value of explicit forecast period cash flows
    pv_factors = np.array([(1 + discount_rate) ** -(i+1) for i in range(len(cash_flows))])
    pv_cash_flows = np.array(cash_flows) * pv_factors
    pv_forecast_period = np.sum(pv_cash_flows)
    
    # Calculate terminal value if not provided
    if terminal_value is None:
        if terminal_growth_rate is not None:
            # Terminal value using perpetuity growth model
            if terminal_growth_rate >= discount_rate:
                raise ValueError("Terminal growth rate must be less than discount rate")
            
            terminal_value = cash_flows[-1] * (1 + terminal_growth_rate) / (discount_rate - terminal_growth_rate)
        elif terminal_multiple is not None:
            # Terminal value using exit multiple
            terminal_value = cash_flows[-1] * terminal_multiple
        else:
            raise ValueError("Either terminal_value, terminal_growth_rate, or terminal_multiple must be provided")
    
    # Discount terminal value to present value
    pv_terminal_value = terminal_value / ((1 + discount_rate) ** len(cash_flows))
    
    # Calculate enterprise value
    enterprise_value = pv_forecast_period + pv_terminal_value
    
    return {
        "pv_forecast_cash_flows": pv_forecast_period,
        "terminal_value": terminal_value,
        "pv_terminal_value": pv_terminal_value,
        "enterprise_value": enterprise_value,
        "pv_breakdown": pv_cash_flows.tolist()
    }

def calculate_npv(cash_flows: List[float], discount_rate: float) -> float:
    """
    Calculate Net Present Value
    
    Args:
        cash_flows: List of cash flows (includes initial investment as negative value)
        discount_rate: Discount rate as a decimal
        
    Returns:
        float: Net present value
    """
    return npf.npv(discount_rate, cash_flows)

def calculate_irr(cash_flows: List[float]) -> float:
    """
    Calculate Internal Rate of Return
    
    Args:
        cash_flows: List of cash flows (includes initial investment as negative value)
        
    Returns:
        float: Internal rate of return as a decimal
    """
    try:
        return npf.irr(cash_flows)
    except:
        # IRR may not converge in some cases
        return None

# ----- Relative Valuation -----

def comparable_company_analysis(
    target_metric: float,
    comparable_ratios: List[float],
    adjustment_factor: float = 1.0
) -> Dict[str, float]:
    """
    Perform Comparable Company Analysis (CCA)
    
    Args:
        target_metric: Financial metric for the target company (revenue, EBITDA, etc.)
        comparable_ratios: List of valuation ratios from comparable companies
        adjustment_factor: Adjustment factor for target company (1.0 = no adjustment)
        
    Returns:
        Dict: Valuation results using min, max, mean, and median multiples
    """
    if not comparable_ratios:
        raise ValueError("Comparable ratios list cannot be empty")
    
    comp_array = np.array(comparable_ratios)
    
    min_multiple = np.min(comp_array)
    max_multiple = np.max(comp_array)
    mean_multiple = np.mean(comp_array)
    median_multiple = np.median(comp_array)
    
    # Apply adjustment factor
    adjusted_multiples = {
        "min": min_multiple * adjustment_factor,
        "max": max_multiple * adjustment_factor,
        "mean": mean_multiple * adjustment_factor,
        "median": median_multiple * adjustment_factor
    }
    
    # Calculate valuation using each multiple
    valuations = {f"{k}_valuation": v * target_metric for k, v in adjusted_multiples.items()}
    
    # Combine results
    result = {
        "target_metric": target_metric,
        "comparable_multiples": comparable_ratios,
        "adjusted_multiples": adjusted_multiples,
        **valuations
    }
    
    return result 