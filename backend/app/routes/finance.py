from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from sqlalchemy.orm import Session
import numpy as np
import numpy_financial as npf
from datetime import datetime

# Import our finance library
from app.finance import fundamentals, valuation, portfolio, risk, technical, regression
from app.db import get_db
from app.services.regression_service import RegressionService

router = APIRouter()

# ---- Models for Financial Calculations ----

class DiscountedCashFlowInput(BaseModel):
    cash_flows: List[float]
    discount_rate: float
    periods: Optional[List[int]] = None
    terminal_growth_rate: Optional[float] = None
    terminal_multiple: Optional[float] = None

class PortfolioOptimizationInput(BaseModel):
    returns: List[float]
    volatilities: List[float]
    correlations: List[List[float]]
    risk_free_rate: Optional[float] = 0.0
    target_return: Optional[float] = None
    target_volatility: Optional[float] = None
    allow_short: Optional[bool] = False

class MortgageCalculatorInput(BaseModel):
    principal: float
    annual_interest_rate: float
    years: int
    monthly_payment: Optional[float] = None
    additional_payment: Optional[float] = 0

class FundamentalRatiosInput(BaseModel):
    net_income: Optional[float] = None
    revenue: Optional[float] = None
    total_assets: Optional[float] = None
    shareholders_equity: Optional[float] = None
    current_assets: Optional[float] = None
    current_liabilities: Optional[float] = None
    inventory: Optional[float] = None
    cost_of_goods_sold: Optional[float] = None
    operating_income: Optional[float] = None
    interest_expense: Optional[float] = None
    total_debt: Optional[float] = None

class TechnicalIndicatorInput(BaseModel):
    prices: List[float]
    high_prices: Optional[List[float]] = None
    low_prices: Optional[List[float]] = None
    volume: Optional[List[float]] = None
    window: Optional[int] = 14
    fast_period: Optional[int] = 12
    slow_period: Optional[int] = 26
    signal_period: Optional[int] = 9

class ValuationRatiosInput(BaseModel):
    price: float
    earnings_per_share: Optional[float] = None
    book_value_per_share: Optional[float] = None
    sales_per_share: Optional[float] = None
    enterprise_value: Optional[float] = None
    ebitda: Optional[float] = None
    sales: Optional[float] = None
    earnings_growth_rate: Optional[float] = None
    annual_dividend: Optional[float] = None

# New model for regression analysis
class RegressionInput(BaseModel):
    x_ticker: str
    y_ticker: str
    start_date: str
    end_date: Optional[str] = None
    interval: Optional[str] = "1mo"
    use_cache: Optional[bool] = True

# ---- API Routes ----

@router.post("/npv")
async def calculate_npv(input_data: DiscountedCashFlowInput):
    """
    Calculate Net Present Value (NPV) of cash flows
    """
    try:
        # Use the valuation module's function
        npv = valuation.calculate_npv(input_data.cash_flows, input_data.discount_rate)
        
        return {
            "npv": float(npv),
            "input": input_data.dict()
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/irr")
async def calculate_irr(input_data: DiscountedCashFlowInput):
    """
    Calculate Internal Rate of Return (IRR) for cash flows
    """
    try:
        # Use the valuation module's function
        irr = valuation.calculate_irr(input_data.cash_flows)
        
        return {
            "irr": float(irr) if irr is not None else None,
            "input": input_data.dict()
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/dcf")
async def calculate_dcf(input_data: DiscountedCashFlowInput):
    """
    Perform Discounted Cash Flow (DCF) valuation
    """
    try:
        # Use the valuation module's function
        result = valuation.dcf_valuation(
            input_data.cash_flows,
            input_data.discount_rate,
            terminal_growth_rate=input_data.terminal_growth_rate,
            terminal_multiple=input_data.terminal_multiple
        )
        
        return {
            **result,
            "input": input_data.dict()
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/mortgage-calculator")
async def mortgage_calculator(input_data: MortgageCalculatorInput):
    """
    Calculate mortgage payment details
    """
    try:
        # Convert annual to monthly interest rate
        monthly_rate = input_data.annual_interest_rate / 12 / 100
        total_periods = input_data.years * 12
        
        # Calculate monthly payment if not provided
        monthly_payment = input_data.monthly_payment
        if monthly_payment is None:
            monthly_payment = input_data.principal * (monthly_rate * (1 + monthly_rate) ** total_periods) / ((1 + monthly_rate) ** total_periods - 1)
        
        # Create amortization schedule
        remaining_balance = input_data.principal
        schedule = []
        total_interest = 0
        
        for period in range(1, total_periods + 1):
            interest_payment = remaining_balance * monthly_rate
            principal_payment = monthly_payment - interest_payment + input_data.additional_payment
            
            total_interest += interest_payment
            remaining_balance -= principal_payment
            
            if remaining_balance < 0:
                principal_payment += remaining_balance  # Adjust final payment
                remaining_balance = 0
            
            schedule.append({
                "period": period,
                "payment": monthly_payment + input_data.additional_payment,
                "principal": principal_payment,
                "interest": interest_payment,
                "remaining_balance": remaining_balance
            })
            
            if remaining_balance <= 0:
                break
        
        return {
            "monthly_payment": monthly_payment,
            "total_payments": sum(payment["payment"] for payment in schedule),
            "total_interest": total_interest,
            "total_periods": len(schedule),
            "years_to_payoff": len(schedule) / 12,
            "schedule": schedule[:12]  # Return first year only to avoid large responses
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/fundamental-ratios")
async def calculate_fundamental_ratios(input_data: FundamentalRatiosInput):
    """
    Calculate fundamental financial ratios
    """
    try:
        results = {}
        
        # Calculate profitability ratios
        if input_data.net_income is not None:
            if input_data.shareholders_equity is not None:
                results["roe"] = fundamentals.return_on_equity(input_data.net_income, input_data.shareholders_equity)
            
            if input_data.total_assets is not None:
                results["roa"] = fundamentals.return_on_assets(input_data.net_income, input_data.total_assets)
            
            if input_data.revenue is not None:
                results["net_profit_margin"] = fundamentals.net_profit_margin(input_data.net_income, input_data.revenue)
        
        # Calculate operating metrics
        if input_data.operating_income is not None and input_data.revenue is not None:
            results["operating_margin"] = fundamentals.operating_margin(input_data.operating_income, input_data.revenue)
        
        if input_data.revenue is not None and input_data.cost_of_goods_sold is not None:
            results["gross_margin"] = fundamentals.gross_margin(input_data.revenue, input_data.cost_of_goods_sold)
        
        # Calculate liquidity ratios
        if input_data.current_assets is not None and input_data.current_liabilities is not None:
            results["current_ratio"] = fundamentals.current_ratio(input_data.current_assets, input_data.current_liabilities)
            
            if input_data.inventory is not None:
                results["quick_ratio"] = fundamentals.quick_ratio(input_data.current_assets, input_data.inventory, input_data.current_liabilities)
        
        # Calculate solvency ratios
        if input_data.total_debt is not None and input_data.shareholders_equity is not None:
            results["debt_to_equity"] = fundamentals.debt_to_equity(input_data.total_debt, input_data.shareholders_equity)
        
        if input_data.operating_income is not None and input_data.interest_expense is not None:
            results["interest_coverage"] = fundamentals.interest_coverage_ratio(input_data.operating_income, input_data.interest_expense)
        
        # Calculate DuPont analysis if all required fields are present
        if all(x is not None for x in [input_data.net_income, input_data.revenue, input_data.total_assets, input_data.shareholders_equity]):
            results["dupont_analysis"] = fundamentals.dupont_analysis(
                input_data.net_income,
                input_data.revenue,
                input_data.total_assets,
                input_data.shareholders_equity
            )
        
        return results
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/technical-indicators")
async def calculate_technical_indicators(input_data: TechnicalIndicatorInput):
    """
    Calculate technical indicators for price data
    """
    try:
        results = {}
        prices = np.array(input_data.prices)
        
        # Calculate moving averages
        results["sma"] = technical.simple_moving_average(prices, input_data.window).tolist()
        results["ema"] = technical.exponential_moving_average(prices, input_data.window).tolist()
        
        # Calculate RSI
        results["rsi"] = technical.relative_strength_index(prices, input_data.window).tolist()
        
        # Calculate MACD if requested
        macd_result = technical.moving_average_convergence_divergence(
            prices, 
            input_data.fast_period, 
            input_data.slow_period, 
            input_data.signal_period
        )
        results["macd"] = {
            "macd_line": macd_result["macd_line"].tolist(),
            "signal_line": macd_result["signal_line"].tolist(),
            "histogram": macd_result["histogram"].tolist()
        }
        
        # Calculate Bollinger Bands
        bb_result = technical.bollinger_bands(prices, input_data.window)
        results["bollinger_bands"] = {
            "middle_band": bb_result["middle_band"].tolist(),
            "upper_band": bb_result["upper_band"].tolist(),
            "lower_band": bb_result["lower_band"].tolist(),
            "bandwidth": bb_result["bandwidth"].tolist(),
            "percent_b": bb_result["percent_b"].tolist()
        }
        
        # Calculate volume indicators if volume data is provided
        if input_data.volume is not None:
            volume = np.array(input_data.volume)
            results["obv"] = technical.on_balance_volume(prices, volume).tolist()
            
            # Calculate additional indicators if high and low prices are provided
            if input_data.high_prices is not None and input_data.low_prices is not None:
                high_prices = np.array(input_data.high_prices)
                low_prices = np.array(input_data.low_prices)
                
                # Stochastic oscillator
                stoch_result = technical.stochastic_oscillator(high_prices, low_prices, prices)
                results["stochastic"] = {
                    "k_values": stoch_result["k_values"].tolist(),
                    "d_values": stoch_result["d_values"].tolist()
                }
                
                # Accumulation/Distribution Line
                results["ad_line"] = technical.accumulation_distribution_line(
                    high_prices, low_prices, prices, volume
                ).tolist()
                
                # ADX
                adx_result = technical.average_directional_index(high_prices, low_prices, prices, input_data.window)
                results["adx"] = {
                    "adx": adx_result["adx"].tolist(),
                    "plus_di": adx_result["plus_di"].tolist(),
                    "minus_di": adx_result["minus_di"].tolist()
                }
        
        return results
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/valuation-ratios")
async def calculate_valuation_ratios(input_data: ValuationRatiosInput):
    """
    Calculate valuation ratios
    """
    try:
        results = {}
        
        # Price-to-Earnings
        if input_data.earnings_per_share is not None:
            results["pe_ratio"] = valuation.price_to_earnings(input_data.price, input_data.earnings_per_share)
        
        # Price-to-Book
        if input_data.book_value_per_share is not None:
            results["pb_ratio"] = valuation.price_to_book(input_data.price, input_data.book_value_per_share)
        
        # Price-to-Sales
        if input_data.sales_per_share is not None:
            results["ps_ratio"] = valuation.price_to_sales(input_data.price, input_data.sales_per_share)
        
        # Enterprise Value ratios
        if input_data.enterprise_value is not None:
            if input_data.ebitda is not None:
                results["ev_to_ebitda"] = valuation.ev_to_ebitda(input_data.enterprise_value, input_data.ebitda)
            
            if input_data.sales is not None:
                results["ev_to_sales"] = valuation.ev_to_sales(input_data.enterprise_value, input_data.sales)
        
        # PEG Ratio
        if "pe_ratio" in results and input_data.earnings_growth_rate is not None:
            results["peg_ratio"] = valuation.peg_ratio(results["pe_ratio"], input_data.earnings_growth_rate)
        
        # Dividend Yield
        if input_data.annual_dividend is not None:
            results["dividend_yield"] = valuation.dividend_yield(input_data.annual_dividend, input_data.price)
        
        return results
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/portfolio-optimization")
async def optimize_portfolio(input_data: PortfolioOptimizationInput):
    """
    Perform portfolio optimization
    """
    try:
        # Convert inputs to numpy arrays
        returns = np.array(input_data.returns)
        volatilities = np.array(input_data.volatilities)
        
        # Create covariance matrix from correlations and volatilities
        n_assets = len(returns)
        cov_matrix = np.zeros((n_assets, n_assets))
        
        for i in range(n_assets):
            for j in range(n_assets):
                cov_matrix[i, j] = input_data.correlations[i][j] * volatilities[i] * volatilities[j]
        
        # Perform optimization
        result = portfolio.optimize_portfolio(
            returns=returns,
            cov_matrix=cov_matrix,
            risk_free_rate=input_data.risk_free_rate,
            target_return=input_data.target_return,
            target_volatility=input_data.target_volatility,
            allow_short=input_data.allow_short
        )
        
        return result
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/efficient-frontier")
async def calculate_efficient_frontier(input_data: PortfolioOptimizationInput):
    """
    Generate efficient frontier for portfolio optimization
    """
    try:
        # Convert inputs to numpy arrays
        returns = np.array(input_data.returns)
        volatilities = np.array(input_data.volatilities)
        
        # Create covariance matrix from correlations and volatilities
        n_assets = len(returns)
        cov_matrix = np.zeros((n_assets, n_assets))
        
        for i in range(n_assets):
            for j in range(n_assets):
                cov_matrix[i, j] = input_data.correlations[i][j] * volatilities[i] * volatilities[j]
        
        # Generate efficient frontier
        result = portfolio.efficient_frontier(
            returns=returns,
            cov_matrix=cov_matrix,
            risk_free_rate=input_data.risk_free_rate,
            allow_short=input_data.allow_short
        )
        
        return result
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/regression-analysis")
async def run_regression_analysis(
    input_data: RegressionInput,
    db: Session = Depends(get_db)
):
    """
    Perform regression analysis on two stocks
    """
    try:
        # Call the service to perform the analysis
        results = await RegressionService.run_regression_analysis(
            db=db,
            x_ticker=input_data.x_ticker,
            y_ticker=input_data.y_ticker, 
            start_date=input_data.start_date,
            end_date=input_data.end_date,
            interval=input_data.interval,
            use_cache=input_data.use_cache
        )
        
        return results
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/recent-regressions")
async def get_recent_regressions(
    limit: int = 10,
    db: Session = Depends(get_db)
):
    """
    Get recent regression searches
    """
    try:
        searches = await RegressionService.get_recent_searches(db, limit)
        return searches
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) 