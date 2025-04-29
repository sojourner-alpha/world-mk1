"""
Fundamental financial analysis module.
Contains functions for calculating financial ratios, growth rates, and key metrics.
"""
import numpy as np
import pandas as pd
from typing import Dict, List, Union, Optional, Tuple

# ----- Profitability Ratios -----

def return_on_equity(net_income: float, shareholders_equity: float) -> float:
    """
    Calculate Return on Equity (ROE)
    
    ROE = Net Income / Shareholders' Equity
    
    Args:
        net_income: Net income for the period
        shareholders_equity: Average shareholders' equity
        
    Returns:
        float: ROE as a decimal value (multiply by 100 for percentage)
    """
    if shareholders_equity == 0:
        raise ValueError("Shareholders' equity cannot be zero")
    
    return net_income / shareholders_equity

def return_on_assets(net_income: float, total_assets: float) -> float:
    """
    Calculate Return on Assets (ROA)
    
    ROA = Net Income / Total Assets
    
    Args:
        net_income: Net income for the period
        total_assets: Average total assets
        
    Returns:
        float: ROA as a decimal value
    """
    if total_assets == 0:
        raise ValueError("Total assets cannot be zero")
    
    return net_income / total_assets

def gross_margin(revenue: float, cost_of_goods_sold: float) -> float:
    """
    Calculate Gross Margin
    
    Gross Margin = (Revenue - COGS) / Revenue
    
    Args:
        revenue: Total revenue
        cost_of_goods_sold: Cost of goods sold
        
    Returns:
        float: Gross margin as a decimal value
    """
    if revenue == 0:
        raise ValueError("Revenue cannot be zero")
    
    return (revenue - cost_of_goods_sold) / revenue

def operating_margin(operating_income: float, revenue: float) -> float:
    """
    Calculate Operating Margin
    
    Operating Margin = Operating Income / Revenue
    
    Args:
        operating_income: Operating income (EBIT)
        revenue: Total revenue
        
    Returns:
        float: Operating margin as a decimal value
    """
    if revenue == 0:
        raise ValueError("Revenue cannot be zero")
    
    return operating_income / revenue

def net_profit_margin(net_income: float, revenue: float) -> float:
    """
    Calculate Net Profit Margin
    
    Net Profit Margin = Net Income / Revenue
    
    Args:
        net_income: Net income
        revenue: Total revenue
        
    Returns:
        float: Net profit margin as a decimal value
    """
    if revenue == 0:
        raise ValueError("Revenue cannot be zero")
    
    return net_income / revenue

# ----- Liquidity Ratios -----

def current_ratio(current_assets: float, current_liabilities: float) -> float:
    """
    Calculate Current Ratio
    
    Current Ratio = Current Assets / Current Liabilities
    
    Args:
        current_assets: Total current assets
        current_liabilities: Total current liabilities
        
    Returns:
        float: Current ratio
    """
    if current_liabilities == 0:
        raise ValueError("Current liabilities cannot be zero")
    
    return current_assets / current_liabilities

def quick_ratio(current_assets: float, inventory: float, current_liabilities: float) -> float:
    """
    Calculate Quick Ratio (Acid-Test Ratio)
    
    Quick Ratio = (Current Assets - Inventory) / Current Liabilities
    
    Args:
        current_assets: Total current assets
        inventory: Inventory value
        current_liabilities: Total current liabilities
        
    Returns:
        float: Quick ratio
    """
    if current_liabilities == 0:
        raise ValueError("Current liabilities cannot be zero")
    
    return (current_assets - inventory) / current_liabilities

# ----- Efficiency Ratios -----

def asset_turnover(revenue: float, total_assets: float) -> float:
    """
    Calculate Asset Turnover Ratio
    
    Asset Turnover = Revenue / Average Total Assets
    
    Args:
        revenue: Total revenue for the period
        total_assets: Average total assets
        
    Returns:
        float: Asset turnover ratio
    """
    if total_assets == 0:
        raise ValueError("Total assets cannot be zero")
    
    return revenue / total_assets

def inventory_turnover(cost_of_goods_sold: float, average_inventory: float) -> float:
    """
    Calculate Inventory Turnover Ratio
    
    Inventory Turnover = COGS / Average Inventory
    
    Args:
        cost_of_goods_sold: Cost of goods sold
        average_inventory: Average inventory for the period
        
    Returns:
        float: Inventory turnover ratio
    """
    if average_inventory == 0:
        raise ValueError("Average inventory cannot be zero")
    
    return cost_of_goods_sold / average_inventory

def days_sales_outstanding(accounts_receivable: float, revenue: float, days: int = 365) -> float:
    """
    Calculate Days Sales Outstanding (DSO)
    
    DSO = (Accounts Receivable / Revenue) * Number of Days
    
    Args:
        accounts_receivable: Accounts receivable
        revenue: Total revenue
        days: Number of days in period (default: 365)
        
    Returns:
        float: Days sales outstanding
    """
    if revenue == 0:
        raise ValueError("Revenue cannot be zero")
    
    return (accounts_receivable / revenue) * days

# ----- Solvency Ratios -----

def debt_to_equity(total_debt: float, shareholders_equity: float) -> float:
    """
    Calculate Debt-to-Equity Ratio
    
    Debt-to-Equity = Total Debt / Shareholders' Equity
    
    Args:
        total_debt: Total debt
        shareholders_equity: Total shareholders' equity
        
    Returns:
        float: Debt-to-equity ratio
    """
    if shareholders_equity == 0:
        raise ValueError("Shareholders' equity cannot be zero")
    
    return total_debt / shareholders_equity

def interest_coverage_ratio(ebit: float, interest_expense: float) -> float:
    """
    Calculate Interest Coverage Ratio
    
    Interest Coverage Ratio = EBIT / Interest Expense
    
    Args:
        ebit: Earnings before interest and taxes
        interest_expense: Interest expense
        
    Returns:
        float: Interest coverage ratio
    """
    if interest_expense == 0:
        return float('inf')  # If no interest expense, coverage is infinite
    
    return ebit / interest_expense

# ----- Growth Calculations -----

def compound_annual_growth_rate(beginning_value: float, ending_value: float, num_years: float) -> float:
    """
    Calculate Compound Annual Growth Rate (CAGR)
    
    CAGR = (Ending Value / Beginning Value)^(1/n) - 1
    
    Args:
        beginning_value: Initial value
        ending_value: Final value
        num_years: Number of years
        
    Returns:
        float: CAGR as a decimal value
    """
    if beginning_value <= 0 or num_years <= 0:
        raise ValueError("Beginning value and number of years must be positive")
    
    return (ending_value / beginning_value) ** (1 / num_years) - 1

def calculate_growth_rates(data: List[float]) -> Dict[str, float]:
    """
    Calculate various growth rates from a time series of values
    
    Args:
        data: List of values in chronological order
        
    Returns:
        Dict: Dictionary with different growth metrics
    """
    if len(data) < 2:
        raise ValueError("Need at least two data points to calculate growth")
    
    # Convert to numpy array for calculations
    values = np.array(data)
    
    # Calculate period-over-period growth rates
    growth_rates = np.diff(values) / values[:-1]
    
    # Year-over-year growth (if data is quarterly)
    yoy_growth = None
    if len(values) >= 5:
        yoy_growth = (values[4:] - values[:-4]) / values[:-4]
    
    # Calculate CAGR
    total_periods = len(values) - 1
    cagr = (values[-1] / values[0]) ** (1 / total_periods) - 1
    
    result = {
        "period_growth_rates": growth_rates.tolist(),
        "average_growth_rate": float(np.mean(growth_rates)),
        "cagr": float(cagr)
    }
    
    if yoy_growth is not None and len(yoy_growth) > 0:
        result["yoy_growth_rates"] = yoy_growth.tolist()
        result["average_yoy_growth"] = float(np.mean(yoy_growth))
    
    return result

# ----- Financial Statement Analysis -----

def dupont_analysis(
    net_income: float,
    revenue: float,
    total_assets: float,
    shareholders_equity: float
) -> Dict[str, float]:
    """
    Perform DuPont Analysis to break down ROE into components
    
    ROE = (Net Income/Revenue) * (Revenue/Total Assets) * (Total Assets/Equity)
          Net Profit Margin * Asset Turnover * Equity Multiplier
    
    Args:
        net_income: Net income
        revenue: Total revenue
        total_assets: Total assets
        shareholders_equity: Shareholders' equity
        
    Returns:
        Dict: Components of ROE breakdown
    """
    if revenue == 0 or total_assets == 0 or shareholders_equity == 0:
        raise ValueError("Revenue, total assets, and shareholders' equity must be non-zero")
    
    net_profit_margin = net_income / revenue
    asset_turnover_ratio = revenue / total_assets
    equity_multiplier = total_assets / shareholders_equity
    
    roe = net_profit_margin * asset_turnover_ratio * equity_multiplier
    
    return {
        "roe": roe,
        "net_profit_margin": net_profit_margin,
        "asset_turnover": asset_turnover_ratio,
        "equity_multiplier": equity_multiplier
    }

def common_size_income_statement(
    income_statement: Dict[str, float],
    revenue_key: str = "revenue"
) -> Dict[str, float]:
    """
    Create a common-size income statement (each item as % of revenue)
    
    Args:
        income_statement: Dictionary with income statement items
        revenue_key: Key for revenue in the income_statement dict
        
    Returns:
        Dict: Common-size income statement with each item as % of revenue
    """
    if revenue_key not in income_statement:
        raise ValueError(f"Revenue key '{revenue_key}' not found in income statement")
    
    revenue = income_statement[revenue_key]
    
    if revenue == 0:
        raise ValueError("Revenue cannot be zero for common-size analysis")
    
    return {key: value / revenue for key, value in income_statement.items()} 