"""
Regression Analysis module for financial data
"""
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional, Any, Union
import statsmodels.api as sm
from statsmodels.regression.linear_model import RegressionResults
import yfinance as yf

def fetch_stock_data(
    ticker: str, 
    start_date: Union[str, datetime], 
    end_date: Union[str, datetime] = None,
    interval: str = "1mo"
) -> pd.DataFrame:
    """
    Fetch stock price and earnings data from Yahoo Finance

    Args:
        ticker: Stock ticker symbol
        start_date: Start date for data
        end_date: End date for data (defaults to today)
        interval: Data interval ('1d', '1wk', '1mo', '3mo')

    Returns:
        DataFrame with stock data
    """
    # Convert dates to string format if they are datetime objects
    if isinstance(start_date, datetime):
        start_date = start_date.strftime("%Y-%m-%d")
    
    if end_date is None:
        end_date = datetime.now().strftime("%Y-%m-%d")
    elif isinstance(end_date, datetime):
        end_date = end_date.strftime("%Y-%m-%d")
    
    # Fetch stock data
    stock = yf.Ticker(ticker)
    df = stock.history(start=start_date, end=end_date, interval=interval)
    
    # Reset index to make Date a column
    df.reset_index(inplace=True)
    
    # Get quarterly earnings if available
    try:
        earnings = stock.quarterly_earnings
        if not earnings.empty:
            # Convert earnings date to datetime
            earnings.reset_index(inplace=True)
            earnings['Date'] = pd.to_datetime(earnings['Date'])
            
            # Merge with price data (left join to keep all price data)
            # This will add earnings where available
            df['Date'] = pd.to_datetime(df['Date'])
            df = pd.merge(df, earnings, on='Date', how='left')
    except:
        # If earnings data fetch fails, continue without it
        pass
    
    return df

def prepare_regression_data(
    x_data: pd.DataFrame, 
    y_data: pd.DataFrame,
    x_column: str = "Close",
    y_column: str = "Close"
) -> Tuple[pd.DataFrame, np.ndarray, np.ndarray]:
    """
    Prepare data for regression analysis by aligning dates

    Args:
        x_data: DataFrame for independent variable
        y_data: DataFrame for dependent variable
        x_column: Column to use for X variable
        y_column: Column to use for Y variable

    Returns:
        Tuple of (joined_df, X, y) where X and y are numpy arrays
    """
    # Ensure Date columns are datetime
    x_data['Date'] = pd.to_datetime(x_data['Date'])
    y_data['Date'] = pd.to_datetime(y_data['Date'])
    
    # Merge datasets on Date (inner join to keep only matching dates)
    joined_df = pd.merge(
        x_data[['Date', x_column]], 
        y_data[['Date', y_column]], 
        on='Date',
        how='inner',
        suffixes=('_x', '_y')
    )
    
    # Rename columns for clarity
    joined_df.rename(
        columns={f"{x_column}_x": "X", f"{y_column}_y": "y"}, 
        inplace=True
    )
    
    # Drop rows with missing data
    joined_df.dropna(inplace=True)
    
    # Sort by date
    joined_df.sort_values('Date', inplace=True)
    
    # Create numpy arrays for regression
    X = joined_df['X'].values
    y = joined_df['y'].values
    
    return joined_df, X, y

def perform_regression_analysis(
    X: np.ndarray, 
    y: np.ndarray
) -> Tuple[RegressionResults, Dict[str, Any]]:
    """
    Perform linear regression analysis

    Args:
        X: Independent variable array
        y: Dependent variable array

    Returns:
        Tuple of (results object, statistics dictionary)
    """
    # Add constant to X for intercept
    X_with_const = sm.add_constant(X)
    
    # Fit linear regression model
    model = sm.OLS(y, X_with_const)
    results = model.fit()
    
    # Extract ANOVA table
    anova_table = sm.stats.anova_lm(results)
    
    # Convert to dictionary format
    stats = {
        "slope": results.params[1] if len(results.params) > 1 else results.params[0],
        "intercept": results.params[0] if len(results.params) > 1 else 0,
        "r_squared": results.rsquared,
        "adjusted_r_squared": results.rsquared_adj,
        "p_value": results.f_pvalue,
        "standard_error": results.bse[1] if len(results.bse) > 1 else results.bse[0],
        "anova_table": {
            "df_model": int(anova_table.loc['x1', 'df']) if 'x1' in anova_table.index else int(anova_table.loc['Residual', 'df']),
            "df_residual": int(anova_table.loc['Residual', 'df']),
            "df_total": int(anova_table.loc['x1', 'df']) + int(anova_table.loc['Residual', 'df']),
            "sum_squares_model": float(anova_table.loc['x1', 'sum_sq']) if 'x1' in anova_table.index else 0,
            "sum_squares_residual": float(anova_table.loc['Residual', 'sum_sq']),
            "sum_squares_total": float(anova_table.loc['x1', 'sum_sq']) + float(anova_table.loc['Residual', 'sum_sq']) if 'x1' in anova_table.index else float(anova_table.loc['Residual', 'sum_sq']),
            "mean_square_model": float(anova_table.loc['x1', 'mean_sq']) if 'x1' in anova_table.index else 0,
            "mean_square_residual": float(anova_table.loc['Residual', 'mean_sq']),
            "f_value": float(anova_table.loc['x1', 'F']) if 'x1' in anova_table.index else 0,
            "p_value": float(anova_table.loc['x1', 'PR(>F)']) if 'x1' in anova_table.index else 1,
        }
    }
    
    return results, stats

def generate_summary(results: RegressionResults, x_ticker: str, y_ticker: str) -> str:
    """
    Generate a human-readable summary of regression results

    Args:
        results: Regression results object
        x_ticker: Independent variable ticker symbol
        y_ticker: Dependent variable ticker symbol

    Returns:
        String summary of regression analysis
    """
    # This would ideally use an LLM for more sophisticated analysis
    # For now, we'll use a template-based approach
    
    significance = "not statistically significant"
    if results.f_pvalue < 0.01:
        significance = "highly statistically significant"
    elif results.f_pvalue < 0.05:
        significance = "statistically significant"
    elif results.f_pvalue < 0.1:
        significance = "marginally significant"
    
    relationship = "positive" if results.params[1] > 0 else "negative"
    strength = "strong" if abs(results.rsquared) > 0.7 else "moderate" if abs(results.rsquared) > 0.3 else "weak"
    
    summary = f"""
Regression Analysis Summary: {x_ticker} vs. {y_ticker}

The regression analysis shows a {strength} {relationship} relationship between {x_ticker} and {y_ticker}. 
The model explains {results.rsquared:.2%} of the variation in {y_ticker} prices (R²={results.rsquared:.4f}).

This relationship is {significance} (p={results.f_pvalue:.4f}).

The regression equation is:
{y_ticker} = {results.params[0]:.4f} + {results.params[1]:.4f} × {x_ticker}

This means that for each $1 increase in {x_ticker}, {y_ticker} tends to change by ${results.params[1]:.4f}.
    """
    
    return summary.strip()

def run_stock_regression(
    x_ticker: str,
    y_ticker: str,
    start_date: Union[str, datetime],
    end_date: Union[str, datetime] = None,
    interval: str = "1mo"
) -> Dict[str, Any]:
    """
    Run full regression analysis on two stocks

    Args:
        x_ticker: Independent variable ticker symbol
        y_ticker: Dependent variable ticker symbol
        start_date: Start date for analysis
        end_date: End date for analysis (defaults to today)
        interval: Data interval ('1d', '1wk', '1mo', '3mo')

    Returns:
        Dictionary with regression results and metadata
    """
    # Fetch data for both stocks
    x_data = fetch_stock_data(x_ticker, start_date, end_date, interval)
    y_data = fetch_stock_data(y_ticker, start_date, end_date, interval)
    
    # Prepare data for regression
    joined_df, X, y = prepare_regression_data(x_data, y_data)
    
    # Perform regression analysis
    results, stats = perform_regression_analysis(X, y)
    
    # Generate summary
    summary = generate_summary(results, x_ticker, y_ticker)
    
    # Combine results into a dictionary
    return {
        "x_ticker": x_ticker,
        "y_ticker": y_ticker,
        "start_date": joined_df['Date'].min(),
        "end_date": joined_df['Date'].max(),
        "data_points": len(joined_df),
        "statistics": stats,
        "summary": summary,
        "created_at": datetime.now(),
    } 