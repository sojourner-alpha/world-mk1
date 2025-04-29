"""
Portfolio analysis and optimization module.
Contains functions for portfolio management, risk analysis, and portfolio optimization.
"""
import numpy as np
import pandas as pd
from typing import Dict, List, Union, Optional, Tuple

# ----- Portfolio Return and Risk -----

def portfolio_return(weights: np.ndarray, returns: np.ndarray) -> float:
    """
    Calculate expected portfolio return
    
    Args:
        weights: Array of portfolio weights
        returns: Array of expected returns for each asset
        
    Returns:
        float: Expected portfolio return
    """
    return np.dot(weights, returns)

def portfolio_variance(weights: np.ndarray, cov_matrix: np.ndarray) -> float:
    """
    Calculate portfolio variance
    
    Args:
        weights: Array of portfolio weights
        cov_matrix: Covariance matrix of asset returns
        
    Returns:
        float: Portfolio variance
    """
    return np.dot(weights.T, np.dot(cov_matrix, weights))

def portfolio_volatility(weights: np.ndarray, cov_matrix: np.ndarray) -> float:
    """
    Calculate portfolio volatility (standard deviation)
    
    Args:
        weights: Array of portfolio weights
        cov_matrix: Covariance matrix of asset returns
        
    Returns:
        float: Portfolio volatility
    """
    return np.sqrt(portfolio_variance(weights, cov_matrix))

def portfolio_sharpe_ratio(
    weights: np.ndarray, 
    returns: np.ndarray, 
    cov_matrix: np.ndarray,
    risk_free_rate: float = 0.0
) -> float:
    """
    Calculate portfolio Sharpe ratio
    
    Args:
        weights: Array of portfolio weights
        returns: Array of expected returns for each asset
        cov_matrix: Covariance matrix of asset returns
        risk_free_rate: Risk-free rate
        
    Returns:
        float: Portfolio Sharpe ratio
    """
    p_return = portfolio_return(weights, returns)
    p_volatility = portfolio_volatility(weights, cov_matrix)
    
    return (p_return - risk_free_rate) / p_volatility

# ----- Portfolio Optimization -----

def optimize_portfolio(
    returns: np.ndarray,
    cov_matrix: np.ndarray,
    risk_free_rate: float = 0.0,
    target_return: Optional[float] = None,
    target_volatility: Optional[float] = None,
    max_weight: float = 1.0,
    allow_short: bool = False
) -> Dict[str, Union[float, List[float]]]:
    """
    Optimize portfolio to maximize Sharpe ratio or achieve target return with minimum risk
    
    Args:
        returns: Array of expected returns for each asset
        cov_matrix: Covariance matrix of asset returns
        risk_free_rate: Risk-free rate
        target_return: Target portfolio return (optional)
        target_volatility: Target portfolio volatility (optional)
        max_weight: Maximum weight for any single asset
        allow_short: Whether to allow short selling
        
    Returns:
        Dict: Optimized portfolio information
    """
    try:
        from scipy.optimize import minimize
    except ImportError:
        raise ImportError("scipy.optimize is required for portfolio optimization")
    
    n_assets = len(returns)
    
    # Bounds for weights
    min_weight = -max_weight if allow_short else 0.0
    bounds = tuple((min_weight, max_weight) for _ in range(n_assets))
    
    # Constraint that weights sum to 1
    constraints = [{'type': 'eq', 'fun': lambda x: np.sum(x) - 1}]
    
    # Initial guess (equal weights)
    init_weights = np.array([1.0 / n_assets] * n_assets)
    
    if target_return is not None:
        # Minimize volatility subject to target return
        constraints.append({'type': 'eq', 'fun': lambda x: portfolio_return(x, returns) - target_return})
        objective = lambda x: portfolio_volatility(x, cov_matrix)
    elif target_volatility is not None:
        # Maximize return subject to target volatility
        constraints.append({'type': 'eq', 'fun': lambda x: portfolio_volatility(x, cov_matrix) - target_volatility})
        objective = lambda x: -portfolio_return(x, returns)
    else:
        # Maximize Sharpe ratio
        objective = lambda x: -portfolio_sharpe_ratio(x, returns, cov_matrix, risk_free_rate)
    
    # Run optimization
    result = minimize(
        objective,
        init_weights,
        method='SLSQP',
        bounds=bounds,
        constraints=constraints
    )
    
    # Extract results
    optimized_weights = result['x']
    expected_return = portfolio_return(optimized_weights, returns)
    expected_volatility = portfolio_volatility(optimized_weights, cov_matrix)
    sharpe_ratio = portfolio_sharpe_ratio(optimized_weights, returns, cov_matrix, risk_free_rate)
    
    return {
        "weights": optimized_weights.tolist(),
        "expected_return": float(expected_return),
        "expected_volatility": float(expected_volatility),
        "sharpe_ratio": float(sharpe_ratio),
        "success": result['success']
    }

def efficient_frontier(
    returns: np.ndarray,
    cov_matrix: np.ndarray,
    risk_free_rate: float = 0.0,
    num_portfolios: int = 20,
    min_return: Optional[float] = None,
    max_return: Optional[float] = None,
    allow_short: bool = False
) -> Dict[str, List[float]]:
    """
    Generate efficient frontier portfolios
    
    Args:
        returns: Array of expected returns for each asset
        cov_matrix: Covariance matrix of asset returns
        risk_free_rate: Risk-free rate
        num_portfolios: Number of portfolios to generate along the frontier
        min_return: Minimum portfolio return to consider
        max_return: Maximum portfolio return to consider
        allow_short: Whether to allow short selling
        
    Returns:
        Dict: Lists of returns, volatilities, and Sharpe ratios along the frontier
    """
    # Determine range of returns to consider
    if min_return is None or max_return is None:
        # Find minimum variance and maximum return portfolios to establish bounds
        min_var_portfolio = optimize_portfolio(returns, cov_matrix, allow_short=allow_short)
        max_return_idx = np.argmax(returns)
        max_return_weights = np.zeros(len(returns))
        max_return_weights[max_return_idx] = 1.0
        max_return_val = returns[max_return_idx]
        
        if min_return is None:
            min_return = min_var_portfolio['expected_return']
        
        if max_return is None:
            max_return = max_return_val
    
    # Generate target returns
    target_returns = np.linspace(min_return, max_return, num_portfolios)
    
    # Calculate optimal portfolios for each target return
    efficient_portfolios = []
    for target_return in target_returns:
        portfolio = optimize_portfolio(
            returns, 
            cov_matrix, 
            risk_free_rate,
            target_return=target_return,
            allow_short=allow_short
        )
        efficient_portfolios.append(portfolio)
    
    # Extract frontier data
    frontier_returns = [p['expected_return'] for p in efficient_portfolios]
    frontier_volatilities = [p['expected_volatility'] for p in efficient_portfolios]
    frontier_sharpe_ratios = [p['sharpe_ratio'] for p in efficient_portfolios]
    frontier_weights = [p['weights'] for p in efficient_portfolios]
    
    return {
        "returns": frontier_returns,
        "volatilities": frontier_volatilities,
        "sharpe_ratios": frontier_sharpe_ratios,
        "weights": frontier_weights
    }

# ----- Performance Metrics -----

def calculate_beta(returns: np.ndarray, market_returns: np.ndarray) -> float:
    """
    Calculate portfolio beta relative to market
    
    Beta = Covariance(Portfolio Returns, Market Returns) / Variance(Market Returns)
    
    Args:
        returns: Array of portfolio returns
        market_returns: Array of market returns
        
    Returns:
        float: Portfolio beta
    """
    covariance = np.cov(returns, market_returns)[0, 1]
    market_variance = np.var(market_returns)
    
    if market_variance == 0:
        raise ValueError("Market variance is zero")
    
    return covariance / market_variance

def calculate_alpha(
    returns: np.ndarray, 
    market_returns: np.ndarray, 
    risk_free_rate: float,
    beta: Optional[float] = None
) -> float:
    """
    Calculate portfolio alpha (Jensen's alpha)
    
    Alpha = Portfolio Return - [Risk Free Rate + Beta * (Market Return - Risk Free Rate)]
    
    Args:
        returns: Array of portfolio returns
        market_returns: Array of market returns
        risk_free_rate: Risk-free rate
        beta: Pre-calculated beta (optional)
        
    Returns:
        float: Portfolio alpha
    """
    if beta is None:
        beta = calculate_beta(returns, market_returns)
    
    portfolio_return = np.mean(returns)
    market_return = np.mean(market_returns)
    
    expected_return = risk_free_rate + beta * (market_return - risk_free_rate)
    alpha = portfolio_return - expected_return
    
    return alpha

def calculate_tracking_error(returns: np.ndarray, benchmark_returns: np.ndarray) -> float:
    """
    Calculate tracking error
    
    Tracking Error = Standard Deviation(Portfolio Returns - Benchmark Returns)
    
    Args:
        returns: Array of portfolio returns
        benchmark_returns: Array of benchmark returns
        
    Returns:
        float: Tracking error
    """
    return np.std(returns - benchmark_returns)

def calculate_information_ratio(returns: np.ndarray, benchmark_returns: np.ndarray) -> float:
    """
    Calculate information ratio
    
    Information Ratio = (Portfolio Return - Benchmark Return) / Tracking Error
    
    Args:
        returns: Array of portfolio returns
        benchmark_returns: Array of benchmark returns
        
    Returns:
        float: Information ratio
    """
    excess_return = np.mean(returns - benchmark_returns)
    tracking_error = calculate_tracking_error(returns, benchmark_returns)
    
    if tracking_error == 0:
        raise ValueError("Tracking error is zero")
    
    return excess_return / tracking_error

def calculate_sortino_ratio(
    returns: np.ndarray, 
    risk_free_rate: float = 0.0,
    target_return: float = 0.0
) -> float:
    """
    Calculate Sortino ratio
    
    Sortino Ratio = (Portfolio Return - Target Return) / Downside Deviation
    
    Args:
        returns: Array of portfolio returns
        risk_free_rate: Risk-free rate
        target_return: Minimum acceptable return
        
    Returns:
        float: Sortino ratio
    """
    excess_returns = returns - target_return
    downside_returns = excess_returns[excess_returns < 0]
    
    if len(downside_returns) == 0:
        return float('inf')  # No downside deviation
    
    downside_deviation = np.sqrt(np.mean(downside_returns ** 2))
    
    if downside_deviation == 0:
        return float('inf')  # No downside deviation
    
    return (np.mean(returns) - risk_free_rate) / downside_deviation

def calculate_maximum_drawdown(returns: np.ndarray) -> Dict[str, float]:
    """
    Calculate maximum drawdown and related metrics
    
    Args:
        returns: Array of portfolio returns
        
    Returns:
        Dict: Maximum drawdown metrics
    """
    # Convert returns to cumulative returns
    cumulative_returns = (1 + returns).cumprod()
    
    # Running maximum
    running_max = np.maximum.accumulate(cumulative_returns)
    
    # Drawdown
    drawdown = (cumulative_returns - running_max) / running_max
    
    # Maximum drawdown and its index
    max_drawdown = np.min(drawdown)
    max_drawdown_idx = np.argmin(drawdown)
    
    # Find peak index
    peak_idx = np.where(cumulative_returns[:max_drawdown_idx+1] == running_max[max_drawdown_idx])[0][-1]
    
    # Find recovery index if recovery happens
    try:
        recovery_idx = np.where(cumulative_returns[max_drawdown_idx:] >= cumulative_returns[peak_idx])[0][0] + max_drawdown_idx
    except:
        recovery_idx = None
    
    result = {
        "max_drawdown": float(max_drawdown),
        "peak_idx": int(peak_idx),
        "trough_idx": int(max_drawdown_idx),
        "recovery_idx": int(recovery_idx) if recovery_idx is not None else None,
        "drawdown_length": int(max_drawdown_idx - peak_idx),
        "recovery_length": int(recovery_idx - max_drawdown_idx) if recovery_idx is not None else None
    }
    
    return result 