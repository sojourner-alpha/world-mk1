"""
Risk analysis module for financial calculations.
Contains functions for calculating various risk metrics and performing risk analysis.
"""
import numpy as np
import pandas as pd
from typing import Dict, List, Union, Optional, Tuple
from scipy import stats

# ----- Risk Metrics -----

def value_at_risk(returns: np.ndarray, confidence_level: float = 0.95, window: Optional[int] = None) -> float:
    """
    Calculate Value at Risk (VaR) using historical method
    
    Args:
        returns: Array of historical returns
        confidence_level: Confidence level (e.g., 0.95 for 95%)
        window: Rolling window size (if None, use entire series)
        
    Returns:
        float: Value at Risk as a positive number
    """
    if window is None:
        # Use entire series
        return -np.percentile(returns, 100 * (1 - confidence_level))
    else:
        # Use rolling window
        if len(returns) < window:
            raise ValueError(f"Length of returns ({len(returns)}) is less than window size ({window})")
        
        rolling_vars = []
        for i in range(len(returns) - window + 1):
            window_returns = returns[i:i+window]
            var = -np.percentile(window_returns, 100 * (1 - confidence_level))
            rolling_vars.append(var)
        
        return np.mean(rolling_vars)

def conditional_value_at_risk(returns: np.ndarray, confidence_level: float = 0.95) -> float:
    """
    Calculate Conditional Value at Risk (CVaR) / Expected Shortfall
    
    Args:
        returns: Array of historical returns
        confidence_level: Confidence level (e.g., 0.95 for 95%)
        
    Returns:
        float: Conditional Value at Risk as a positive number
    """
    var = value_at_risk(returns, confidence_level)
    return -np.mean(returns[returns <= -var])

def parametric_var(mean_return: float, std_dev: float, confidence_level: float = 0.95) -> float:
    """
    Calculate parametric Value at Risk assuming normal distribution
    
    Args:
        mean_return: Mean of returns
        std_dev: Standard deviation of returns
        confidence_level: Confidence level (e.g., 0.95 for 95%)
        
    Returns:
        float: Parametric VaR as a positive number
    """
    z_score = stats.norm.ppf(1 - confidence_level)
    return -(mean_return + z_score * std_dev)

def semi_deviation(returns: np.ndarray, target_return: float = 0.0) -> float:
    """
    Calculate semi-deviation (downside risk)
    
    Args:
        returns: Array of returns
        target_return: Target return threshold
        
    Returns:
        float: Semi-deviation
    """
    downside_returns = returns[returns < target_return] - target_return
    
    if len(downside_returns) == 0:
        return 0.0
    
    return np.sqrt(np.mean(downside_returns ** 2))

def downside_deviation_ratio(returns: np.ndarray, target_return: float = 0.0) -> float:
    """
    Calculate ratio of downside deviation to total deviation
    
    Args:
        returns: Array of returns
        target_return: Target return threshold
        
    Returns:
        float: Downside deviation ratio
    """
    semi_dev = semi_deviation(returns, target_return)
    total_dev = np.std(returns)
    
    if total_dev == 0:
        return 0.0
    
    return semi_dev / total_dev

# ----- Stress Testing -----

def stress_test_scenario(
    weights: np.ndarray,
    cov_matrix: np.ndarray,
    scenarios: Dict[str, np.ndarray]
) -> Dict[str, float]:
    """
    Perform stress testing using predefined scenarios
    
    Args:
        weights: Portfolio weights
        cov_matrix: Covariance matrix of asset returns
        scenarios: Dictionary of scenario names and shock vectors
        
    Returns:
        Dict: Portfolio returns under different scenarios
    """
    result = {}
    
    # Calculate baseline volatility
    baseline_volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
    result["baseline_volatility"] = float(baseline_volatility)
    
    # Calculate impact of each scenario
    for scenario_name, shock_vector in scenarios.items():
        # Portfolio return under the scenario
        scenario_return = np.dot(weights, shock_vector)
        result[f"{scenario_name}_return"] = float(scenario_return)
    
    return result

def monte_carlo_var(
    weights: np.ndarray,
    mean_returns: np.ndarray,
    cov_matrix: np.ndarray,
    confidence_level: float = 0.95,
    n_simulations: int = 10000,
    time_horizon: int = 1
) -> Dict[str, float]:
    """
    Calculate Value at Risk using Monte Carlo simulation
    
    Args:
        weights: Portfolio weights
        mean_returns: Mean returns for each asset
        cov_matrix: Covariance matrix of asset returns
        confidence_level: Confidence level (e.g., 0.95 for 95%)
        n_simulations: Number of simulations
        time_horizon: Time horizon in days
        
    Returns:
        Dict: VaR results from Monte Carlo simulation
    """
    # Generate random portfolio returns
    np.random.seed(42)  # For reproducibility
    
    # Generate correlated random returns
    rand_returns = np.random.multivariate_normal(
        mean_returns * time_horizon,
        cov_matrix * time_horizon,
        n_simulations
    )
    
    # Calculate portfolio returns for each simulation
    portfolio_returns = np.dot(rand_returns, weights)
    
    # Calculate VaR and CVaR
    var = -np.percentile(portfolio_returns, 100 * (1 - confidence_level))
    cvar = -np.mean(portfolio_returns[portfolio_returns <= -var])
    
    # Calculate other statistics
    mean_return = np.mean(portfolio_returns)
    median_return = np.median(portfolio_returns)
    min_return = np.min(portfolio_returns)
    max_return = np.max(portfolio_returns)
    
    return {
        "var": float(var),
        "cvar": float(cvar),
        "mean_return": float(mean_return),
        "median_return": float(median_return),
        "min_return": float(min_return),
        "max_return": float(max_return),
        "confidence_level": confidence_level,
        "time_horizon": time_horizon
    }

# ----- Risk Decomposition -----

def risk_contribution(weights: np.ndarray, cov_matrix: np.ndarray) -> np.ndarray:
    """
    Calculate risk contribution of each asset to portfolio risk
    
    Args:
        weights: Portfolio weights
        cov_matrix: Covariance matrix of asset returns
        
    Returns:
        np.ndarray: Risk contribution of each asset
    """
    portfolio_vol = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
    
    # Marginal risk contribution
    marginal_contrib = np.dot(cov_matrix, weights) / portfolio_vol
    
    # Risk contribution
    risk_contrib = weights * marginal_contrib
    
    return risk_contrib

def risk_parity_optimization(
    cov_matrix: np.ndarray, 
    risk_budget: Optional[np.ndarray] = None,
    max_iterations: int = 100,
    tolerance: float = 1e-6
) -> Dict[str, Union[np.ndarray, float, bool]]:
    """
    Perform risk parity portfolio optimization
    
    Args:
        cov_matrix: Covariance matrix of asset returns
        risk_budget: Target risk contribution for each asset (defaults to equal risk)
        max_iterations: Maximum number of iterations
        tolerance: Convergence tolerance
        
    Returns:
        Dict: Optimized portfolio weights and risk contributions
    """
    try:
        from scipy.optimize import minimize
    except ImportError:
        raise ImportError("scipy.optimize is required for risk parity optimization")
    
    n_assets = cov_matrix.shape[0]
    
    # Default to equal risk budget if not provided
    if risk_budget is None:
        risk_budget = np.ones(n_assets) / n_assets
    
    # Ensure risk budget is normalized
    risk_budget = risk_budget / np.sum(risk_budget)
    
    # Define objective function for risk parity
    def objective(weights):
        weights = np.clip(weights, 1e-6, 1)
        weights = weights / np.sum(weights)  # Normalize
        
        portfolio_vol = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
        risk_contrib = risk_contribution(weights, cov_matrix)
        
        # Target is to have risk contribution proportional to risk_budget
        target_risk_contrib = risk_budget * portfolio_vol
        
        # Sum of squared differences
        return np.sum((risk_contrib - target_risk_contrib) ** 2)
    
    # Initial guess (equal weight)
    init_weights = np.ones(n_assets) / n_assets
    
    # Constraints
    constraints = [{'type': 'eq', 'fun': lambda x: np.sum(x) - 1}]
    bounds = tuple((1e-6, 1) for _ in range(n_assets))
    
    # Optimize
    result = minimize(
        objective,
        init_weights,
        method='SLSQP',
        bounds=bounds,
        constraints=constraints,
        options={'maxiter': max_iterations, 'ftol': tolerance}
    )
    
    # Extract results
    optimized_weights = result['x'] / np.sum(result['x'])  # Re-normalize
    portfolio_vol = np.sqrt(np.dot(optimized_weights.T, np.dot(cov_matrix, optimized_weights)))
    actual_risk_contrib = risk_contribution(optimized_weights, cov_matrix)
    risk_contrib_percent = actual_risk_contrib / np.sum(actual_risk_contrib)
    
    return {
        "weights": optimized_weights.tolist(),
        "portfolio_volatility": float(portfolio_vol),
        "risk_contributions": actual_risk_contrib.tolist(),
        "risk_contributions_percent": risk_contrib_percent.tolist(),
        "target_risk_budget": risk_budget.tolist(),
        "success": result['success']
    } 