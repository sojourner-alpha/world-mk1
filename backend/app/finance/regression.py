"""
Regression Analysis module for financial data
"""
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, List, Tuple, Optional, Any, Union
import json

# Core statistical libraries
import statsmodels.api as sm
from statsmodels.regression.linear_model import RegressionResults
from statsmodels.stats.diagnostic import het_breuschpagan, acorr_ljungbox
from statsmodels.stats.stattools import jarque_bera
from statsmodels.tsa.stattools import adfuller

# Regularization and ML tools
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_squared_error, r2_score

# Panel data and advanced econometrics
import linearmodels.panel as plm
from linearmodels.panel import PanelOLS
from linearmodels.asset_pricing import LinearFactorModel

# Quick stats and effect sizes
import pingouin as pg

# Volatility modeling
import arch as arch_pkg
from arch import arch_model

# Data source
import yfinance as yf

# Regression model types
REGRESSION_MODELS = {
    "ols": "Ordinary Least Squares",
    "robust": "Robust Linear Regression",
    "ridge": "Ridge Regression",
    "lasso": "Lasso Regression",
    "elastic_net": "Elastic Net Regression",
    "quantile": "Quantile Regression",
    "panel": "Panel Regression (Fixed Effects)",
    "garch": "GARCH Volatility Model"
}

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
    y_column: str = "Close",
    add_features: bool = False
) -> Tuple[pd.DataFrame, np.ndarray, np.ndarray]:
    """
    Prepare data for regression analysis by aligning dates

    Args:
        x_data: DataFrame for independent variable
        y_data: DataFrame for dependent variable
        x_column: Column to use for X variable
        y_column: Column to use for Y variable
        add_features: Whether to add engineered features

    Returns:
        Tuple of (joined_df, X, y) where X and y are numpy arrays
    """
    # Ensure Date columns are datetime
    x_data['Date'] = pd.to_datetime(x_data['Date'])
    y_data['Date'] = pd.to_datetime(y_data['Date'])
    
    # Merge datasets on Date (inner join to keep only matching dates)
    joined_df = pd.merge(
        x_data, 
        y_data, 
        on='Date',
        how='inner',
        suffixes=('_x', '_y')
    )
    
    # Rename columns for clarity
    x_col_name = f"{x_column}_x"
    y_col_name = f"{y_column}_y"
    
    # Create basic feature
    X = joined_df[x_col_name].values.reshape(-1, 1)
    y = joined_df[y_col_name].values
    
    # Add engineered features if requested
    if add_features:
        # Add lagged values (t-1, t-2)
        joined_df['x_lag1'] = joined_df[x_col_name].shift(1)
        joined_df['x_lag2'] = joined_df[x_col_name].shift(2)
        
        # Add rolling statistics
        joined_df['x_ma5'] = joined_df[x_col_name].rolling(window=5).mean()
        joined_df['x_std5'] = joined_df[x_col_name].rolling(window=5).std()
        
        # Add price momentum
        joined_df['x_mom'] = joined_df[x_col_name].pct_change()
        
        # Add seasonality features
        joined_df['month'] = joined_df['Date'].dt.month
        joined_df['quarter'] = joined_df['Date'].dt.quarter
        
        # Drop NaN values from feature engineering
        joined_df.dropna(inplace=True)
        
        # Select features for model
        feature_cols = [x_col_name, 'x_lag1', 'x_lag2', 'x_ma5', 'x_std5', 'x_mom']
        X = joined_df[feature_cols].values
        y = joined_df[y_col_name].values
    
    # Sort by date
    joined_df.sort_values('Date', inplace=True)
    
    return joined_df, X, y

def perform_regression_analysis(
    X: np.ndarray, 
    y: np.ndarray,
    model_type: str = "ols",
    test_size: float = 0.2,
    alpha: float = 1.0
) -> Tuple[Any, Dict[str, Any]]:
    """
    Perform regression analysis with specified model

    Args:
        X: Independent variable array
        y: Dependent variable array
        model_type: Type of regression model
        test_size: Proportion of data to use for testing
        alpha: Regularization strength for Ridge/Lasso

    Returns:
        Tuple of (results object, statistics dictionary)
    """
    # Split data for testing if needed
    if test_size > 0:
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, shuffle=False)
    else:
        X_train, y_train = X, y
        X_test, y_test = None, None
    
    # Initialize stats dictionary
    stats = {}
    
    # Select and fit model based on type
    if model_type == "ols":
        # Standard OLS regression with statsmodels
        X_train_sm = sm.add_constant(X_train)
        model = sm.OLS(y_train, X_train_sm)
        results = model.fit()
        
        # Extract ANOVA table
        anova_table = sm.stats.anova_lm(results)
        
        # Diagnostic tests
        residuals = results.resid
        
        # Heteroskedasticity test (Breusch-Pagan)
        bp_test = het_breuschpagan(residuals, results.model.exog)
        
        # Autocorrelation test (Ljung-Box)
        lb_test = acorr_ljungbox(residuals, lags=[1], return_df=True)
        
        # Normality test (Jarque-Bera)
        jb_test = jarque_bera(residuals)
        
        # Extract basic statistics
        stats = {
            "model_type": "ols",
            "coefficients": results.params.tolist(),
            "std_errors": results.bse.tolist(),
            "t_values": results.tvalues.tolist(),
            "p_values": results.pvalues.tolist(),
            "r_squared": results.rsquared,
            "adjusted_r_squared": results.rsquared_adj,
            "f_statistic": results.fvalue,
            "f_pvalue": results.f_pvalue,
            "aic": results.aic,
            "bic": results.bic,
            "residual_std_error": np.sqrt(results.mse_resid),
            "diagnostics": {
                "heteroskedasticity": {
                    "test": "Breusch-Pagan",
                    "statistic": float(bp_test[0]),
                    "p_value": float(bp_test[1]),
                    "conclusion": "Heteroskedasticity present" if bp_test[1] < 0.05 else "Homoskedasticity"
                },
                "autocorrelation": {
                    "test": "Ljung-Box",
                    "statistic": float(lb_test['lb_stat'].iloc[0]),
                    "p_value": float(lb_test['lb_pvalue'].iloc[0]),
                    "conclusion": "Autocorrelation present" if lb_test['lb_pvalue'].iloc[0] < 0.05 else "No autocorrelation"
                },
                "normality": {
                    "test": "Jarque-Bera",
                    "statistic": float(jb_test[0]),
                    "p_value": float(jb_test[1]),
                    "conclusion": "Non-normal residuals" if jb_test[1] < 0.05 else "Normal residuals"
                }
            },
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
        
        # Calculate predictions and errors if test data is available
        if X_test is not None:
            X_test_sm = sm.add_constant(X_test)
            y_pred = results.predict(X_test_sm)
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_pred)
            
            stats["test_metrics"] = {
                "mse": float(mse),
                "rmse": float(rmse),
                "r2": float(r2)
            }
    
    elif model_type == "robust":
        # Robust regression (handling outliers better)
        X_train_sm = sm.add_constant(X_train)
        model = sm.RLM(y_train, X_train_sm, M=sm.robust.norms.HuberT())
        results = model.fit()
        
        stats = {
            "model_type": "robust",
            "coefficients": results.params.tolist(),
            "std_errors": results.bse.tolist(),
            "t_values": results.tvalues.tolist(),
            "p_values": results.pvalues.tolist(),
            "scale": float(results.scale)
        }
        
        # Calculate predictions and errors if test data is available
        if X_test is not None:
            X_test_sm = sm.add_constant(X_test)
            y_pred = results.predict(X_test_sm)
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_pred)
            
            stats["test_metrics"] = {
                "mse": float(mse),
                "rmse": float(rmse),
                "r2": float(r2)
            }
    
    elif model_type == "ridge":
        # Ridge regression (L2 regularization)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        
        # Cross-validation to find optimal alpha
        alphas = np.logspace(-4, 2, 20)
        ridge_cv = GridSearchCV(
            Ridge(fit_intercept=True, random_state=42),
            param_grid={"alpha": alphas},
            cv=5,
            scoring="neg_mean_squared_error"
        )
        ridge_cv.fit(X_train_scaled, y_train)
        best_alpha = ridge_cv.best_params_["alpha"]
        
        # Fit final model with best alpha
        ridge = Ridge(alpha=best_alpha, fit_intercept=True, random_state=42)
        ridge.fit(X_train_scaled, y_train)
        results = ridge
        
        stats = {
            "model_type": "ridge",
            "coefficients": ridge.coef_.tolist(),
            "intercept": float(ridge.intercept_),
            "alpha": float(best_alpha),
            "cv_results": {
                "best_score": float(-ridge_cv.best_score_),  # Convert negative MSE back to positive
                "best_alpha": float(best_alpha)
            }
        }
        
        # Calculate predictions and errors if test data is available
        if X_test is not None:
            X_test_scaled = scaler.transform(X_test)
            y_pred = ridge.predict(X_test_scaled)
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_pred)
            
            stats["test_metrics"] = {
                "mse": float(mse),
                "rmse": float(rmse),
                "r2": float(r2)
            }
    
    elif model_type == "lasso":
        # Lasso regression (L1 regularization)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        
        # Cross-validation to find optimal alpha
        alphas = np.logspace(-4, 2, 20)
        lasso_cv = GridSearchCV(
            Lasso(fit_intercept=True, random_state=42, max_iter=10000),
            param_grid={"alpha": alphas},
            cv=5,
            scoring="neg_mean_squared_error"
        )
        lasso_cv.fit(X_train_scaled, y_train)
        best_alpha = lasso_cv.best_params_["alpha"]
        
        # Fit final model with best alpha
        lasso = Lasso(alpha=best_alpha, fit_intercept=True, random_state=42, max_iter=10000)
        lasso.fit(X_train_scaled, y_train)
        results = lasso
        
        stats = {
            "model_type": "lasso",
            "coefficients": lasso.coef_.tolist(),
            "intercept": float(lasso.intercept_),
            "alpha": float(best_alpha),
            "cv_results": {
                "best_score": float(-lasso_cv.best_score_),  # Convert negative MSE back to positive
                "best_alpha": float(best_alpha)
            }
        }
        
        # Calculate predictions and errors if test data is available
        if X_test is not None:
            X_test_scaled = scaler.transform(X_test)
            y_pred = lasso.predict(X_test_scaled)
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_pred)
            
            stats["test_metrics"] = {
                "mse": float(mse),
                "rmse": float(rmse),
                "r2": float(r2)
            }
    
    elif model_type == "elastic_net":
        # Elastic Net regression (mix of L1 and L2 regularization)
        scaler = StandardScaler()
        X_train_scaled = scaler.fit_transform(X_train)
        
        # Cross-validation to find optimal parameters
        param_grid = {
            "alpha": np.logspace(-4, 2, 10),
            "l1_ratio": np.linspace(0.1, 0.9, 9)
        }
        en_cv = GridSearchCV(
            ElasticNet(fit_intercept=True, random_state=42, max_iter=10000),
            param_grid=param_grid,
            cv=5,
            scoring="neg_mean_squared_error"
        )
        en_cv.fit(X_train_scaled, y_train)
        best_alpha = en_cv.best_params_["alpha"]
        best_l1_ratio = en_cv.best_params_["l1_ratio"]
        
        # Fit final model with best parameters
        en = ElasticNet(alpha=best_alpha, l1_ratio=best_l1_ratio, fit_intercept=True, random_state=42, max_iter=10000)
        en.fit(X_train_scaled, y_train)
        results = en
        
        stats = {
            "model_type": "elastic_net",
            "coefficients": en.coef_.tolist(),
            "intercept": float(en.intercept_),
            "alpha": float(best_alpha),
            "l1_ratio": float(best_l1_ratio),
            "cv_results": {
                "best_score": float(-en_cv.best_score_),  # Convert negative MSE back to positive
                "best_alpha": float(best_alpha),
                "best_l1_ratio": float(best_l1_ratio)
            }
        }
        
        # Calculate predictions and errors if test data is available
        if X_test is not None:
            X_test_scaled = scaler.transform(X_test)
            y_pred = en.predict(X_test_scaled)
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_pred)
            
            stats["test_metrics"] = {
                "mse": float(mse),
                "rmse": float(rmse),
                "r2": float(r2)
            }
    
    elif model_type == "quantile":
        # Quantile regression
        X_train_sm = sm.add_constant(X_train)
        model = sm.QuantReg(y_train, X_train_sm)
        
        # Fit models at different quantiles
        quantiles = [0.1, 0.25, 0.5, 0.75, 0.9]
        quantile_models = {}
        
        for q in quantiles:
            quantile_models[q] = model.fit(q=q)
        
        # Use median (q=0.5) as main result
        results = quantile_models[0.5]
        
        stats = {
            "model_type": "quantile",
            "quantiles": quantiles,
            "coefficients": {str(q): model.tolist() for q, model in quantile_models.items()},
            "standard_errors": {str(q): model.bse.tolist() for q, model in quantile_models.items()},
            "t_values": {str(q): model.tvalues.tolist() for q, model in quantile_models.items()},
            "p_values": {str(q): model.pvalues.tolist() for q, model in quantile_models.items()},
            "pseudo_r2": {str(q): float(model.prsquared) for q, model in quantile_models.items()},
        }
        
        # Calculate predictions for median model if test data is available
        if X_test is not None:
            X_test_sm = sm.add_constant(X_test)
            y_pred = results.predict(X_test_sm)
            mse = mean_squared_error(y_test, y_pred)
            rmse = np.sqrt(mse)
            
            stats["test_metrics"] = {
                "mse": float(mse),
                "rmse": float(rmse)
            }
    
    elif model_type == "garch":
        # GARCH volatility model (for time series)
        # Works best with return data rather than price levels
        returns = pd.Series(y).pct_change().dropna()
        
        # Fit GARCH(1,1) model
        model = arch_model(returns, vol="GARCH", p=1, q=1)
        results = model.fit(disp="off")
        
        stats = {
            "model_type": "garch",
            "coefficients": results.params.tolist(),
            "std_errors": results.std_err.tolist(),
            "t_values": results.tvalues.tolist(),
            "p_values": results.pvalues.tolist(),
            "aic": float(results.aic),
            "bic": float(results.bic),
            "log_likelihood": float(results.loglikelihood),
            "volatility": results.conditional_volatility.tolist()
        }
    
    else:
        # Default to OLS if unknown model type is specified
        X_train_sm = sm.add_constant(X_train)
        model = sm.OLS(y_train, X_train_sm)
        results = model.fit()
        
        # Extract basic statistics
        stats = {
            "model_type": "ols",
            "coefficients": results.params.tolist(),
            "std_errors": results.bse.tolist(),
            "t_values": results.tvalues.tolist(),
            "p_values": results.pvalues.tolist(),
            "r_squared": results.rsquared,
            "adjusted_r_squared": results.rsquared_adj,
            "f_statistic": results.fvalue,
            "f_pvalue": results.f_pvalue
        }
    
    return results, stats

def run_correlation_analysis(
    x_data: pd.DataFrame,
    y_data: pd.DataFrame,
    x_column: str = "Close",
    y_column: str = "Close"
) -> Dict[str, Any]:
    """
    Run correlation analysis between two stocks

    Args:
        x_data: DataFrame for first stock
        y_data: DataFrame for second stock
        x_column: Column to use for first stock
        y_column: Column to use for second stock

    Returns:
        Dictionary with correlation statistics
    """
    # Prepare data
    joined_df, X, y = prepare_regression_data(x_data, y_data, x_column, y_column)
    
    # Rename columns for clarity
    x_ticker = x_data['ticker'].iloc[0] if 'ticker' in x_data.columns else 'X'
    y_ticker = y_data['ticker'].iloc[0] if 'ticker' in y_data.columns else 'Y'
    
    x_col_name = f"{x_column}_x"
    y_col_name = f"{y_column}_y"
    
    # Calculate Pearson correlation
    pearson = pg.corr(joined_df[x_col_name], joined_df[y_col_name])
    
    # Calculate Spearman rank correlation
    spearman = pg.corr(joined_df[x_col_name], joined_df[y_col_name], method='spearman')
    
    # Calculate partial correlation with market if available
    partial_corr = None
    if 'SPY' in joined_df.columns:
        partial_corr = pg.partial_corr(data=joined_df, x=x_col_name, y=y_col_name, covar='SPY')
    
    # Calculate rolling correlation (6-month window)
    joined_df['rolling_corr'] = joined_df[x_col_name].rolling(window=6).corr(joined_df[y_col_name])
    
    return {
        "pearson": {
            "r": float(pearson['r']),
            "p-value": float(pearson['p-val']),
            "CI95%": [float(pearson['CI95%'][0]), float(pearson['CI95%'][1])],
            "bf10": float(pearson['BF10']),
            "power": float(pearson['power'])
        },
        "spearman": {
            "r": float(spearman['r']),
            "p-value": float(spearman['p-val']),
            "CI95%": [float(spearman['CI95%'][0]), float(spearman['CI95%'][1])]
        },
        "partial_correlation": None if partial_corr is None else {
            "r": float(partial_corr['r']),
            "p-value": float(partial_corr['p-val'])
        },
        "rolling_correlation": {
            "mean": float(joined_df['rolling_corr'].mean()),
            "std": float(joined_df['rolling_corr'].std()),
            "min": float(joined_df['rolling_corr'].min()),
            "max": float(joined_df['rolling_corr'].max()),
            "current": float(joined_df['rolling_corr'].iloc[-1]) if not pd.isna(joined_df['rolling_corr'].iloc[-1]) else None
        },
        "time_period": {
            "start": joined_df['Date'].min().strftime("%Y-%m-%d"),
            "end": joined_df['Date'].max().strftime("%Y-%m-%d"),
            "observations": len(joined_df)
        }
    }

def generate_summary(
    results: Any, 
    x_ticker: str, 
    y_ticker: str,
    model_type: str = "ols",
    stats: Dict[str, Any] = None
) -> str:
    """
    Generate a human-readable summary of regression results

    Args:
        results: Regression results object
        x_ticker: Independent variable ticker symbol
        y_ticker: Dependent variable ticker symbol
        model_type: Type of regression model used
        stats: Statistics dictionary from regression analysis

    Returns:
        String summary of regression analysis
    """
    if stats is None:
        # If stats are not provided, try to extract them from results
        if model_type == "ols" and hasattr(results, "rsquared"):
            r_squared = results.rsquared
            p_value = results.f_pvalue
            params = results.params
        else:
            # Default values if can't extract
            r_squared = 0
            p_value = 1
            params = [0, 0]
    else:
        # Extract values from stats dictionary
        if model_type == "ols":
            r_squared = stats.get("r_squared", 0)
            p_value = stats.get("f_pvalue", 1)
            params = stats.get("coefficients", [0, 0])
        elif model_type == "ridge" or model_type == "lasso" or model_type == "elastic_net":
            r_squared = stats.get("test_metrics", {}).get("r2", 0) if "test_metrics" in stats else 0
            p_value = 0  # Not directly available for sklearn models
            params = [stats.get("intercept", 0)] + stats.get("coefficients", [0])
        elif model_type == "quantile":
            # Use median (0.5) quantile
            r_squared = stats.get("pseudo_r2", {}).get("0.5", 0)
            p_value = 0  # Not directly available
            params = stats.get("coefficients", {}).get("0.5", [0, 0])
        elif model_type == "garch":
            r_squared = 0  # Not directly applicable
            p_value = 0  # Not directly applicable
            params = stats.get("coefficients", [0, 0])
        else:
            r_squared = 0
            p_value = 1
            params = [0, 0]
    
    # Determine significance
    significance = "not statistically significant"
    if p_value < 0.01:
        significance = "highly statistically significant"
    elif p_value < 0.05:
        significance = "statistically significant"
    elif p_value < 0.1:
        significance = "marginally significant"
    
    # Determine relationship direction
    if model_type == "ols":
        relationship = "positive" if params[1] > 0 else "negative"
    else:
        # For other models, check if first coefficient is positive
        relationship = "positive" if len(params) > 1 and params[1] > 0 else "negative"
    
    # Determine relationship strength
    strength = "strong" if abs(r_squared) > 0.7 else "moderate" if abs(r_squared) > 0.3 else "weak"
    
    # Create model-specific summary
    if model_type == "ols":
        summary = f"""
Regression Analysis Summary: {x_ticker} vs. {y_ticker} (OLS Method)

The regression analysis shows a {strength} {relationship} relationship between {x_ticker} and {y_ticker}. 
The model explains {r_squared:.2%} of the variation in {y_ticker} prices (R²={r_squared:.4f}).

This relationship is {significance} (p={p_value:.4f}).

The regression equation is:
{y_ticker} = {params[0]:.4f} + {params[1]:.4f} × {x_ticker}

This means that for each $1 increase in {x_ticker}, {y_ticker} tends to change by ${params[1]:.4f}.
"""
    
    elif model_type == "robust":
        summary = f"""
Robust Regression Analysis: {x_ticker} vs. {y_ticker}

The robust regression shows a {strength} {relationship} relationship between {x_ticker} and {y_ticker}.
This method is less sensitive to outliers than standard OLS regression.

The regression equation is:
{y_ticker} = {params[0]:.4f} + {params[1]:.4f} × {x_ticker}
"""
    
    elif model_type == "ridge":
        summary = f"""
Ridge Regression Analysis: {x_ticker} vs. {y_ticker}

The ridge regression (with L2 regularization) shows a {relationship} relationship between {x_ticker} and {y_ticker}.
Test R²={r_squared:.4f}

The optimal alpha (regularization strength) is {stats.get('alpha', 0):.6f}.

The regression equation is:
{y_ticker} = {params[0]:.4f} + {params[1]:.4f} × {x_ticker}
"""
    
    elif model_type == "lasso":
        summary = f"""
Lasso Regression Analysis: {x_ticker} vs. {y_ticker}

The lasso regression (with L1 regularization) shows a {relationship} relationship between {x_ticker} and {y_ticker}.
Test R²={r_squared:.4f}

The optimal alpha (regularization strength) is {stats.get('alpha', 0):.6f}.

The regression equation is:
{y_ticker} = {params[0]:.4f} + {params[1]:.4f} × {x_ticker}

Lasso regression performs feature selection by setting some coefficients to zero.
"""
    
    elif model_type == "elastic_net":
        summary = f"""
Elastic Net Regression Analysis: {x_ticker} vs. {y_ticker}

The elastic net regression (with combined L1 and L2 regularization) shows a {relationship} relationship.
Test R²={r_squared:.4f}

The optimal alpha is {stats.get('alpha', 0):.6f} with L1 ratio {stats.get('l1_ratio', 0):.2f}.

The regression equation is:
{y_ticker} = {params[0]:.4f} + {params[1]:.4f} × {x_ticker}
"""
    
    elif model_type == "quantile":
        summary = f"""
Quantile Regression Analysis: {x_ticker} vs. {y_ticker}

The quantile regression shows how {x_ticker} affects different percentiles of {y_ticker}.
This analysis is useful for understanding the relationship beyond the mean.

Median (50th percentile) regression equation:
{y_ticker} = {params[0]:.4f} + {params[1]:.4f} × {x_ticker}

Pseudo-R² for median model: {r_squared:.4f}
"""
    
    elif model_type == "garch":
        summary = f"""
GARCH Volatility Analysis: {y_ticker}

The GARCH(1,1) model analyzes the volatility patterns in {y_ticker} returns.
This model is useful for forecasting time-varying volatility and risk.

Key parameters:
- Omega (constant): {params[0]:.6f}
- Alpha (ARCH term): {params[1]:.6f}
- Beta (GARCH term): {params[2]:.6f}

The persistence (α+β) is {params[1] + params[2]:.6f}, indicating {'high' if params[1] + params[2] > 0.9 else 'moderate' if params[1] + params[2] > 0.5 else 'low'} volatility persistence.
"""
    
    else:
        summary = f"""
Regression Analysis: {x_ticker} vs. {y_ticker}

The analysis indicates a {strength} {relationship} relationship between these stocks.
"""
    
    # Add diagnostic information if available
    if model_type == "ols" and "diagnostics" in stats:
        diagnostics = stats["diagnostics"]
        summary += f"""
Diagnostic Tests:
- {diagnostics['heteroskedasticity']['conclusion']} (p={diagnostics['heteroskedasticity']['p_value']:.4f})
- {diagnostics['autocorrelation']['conclusion']} (p={diagnostics['autocorrelation']['p_value']:.4f})
- {diagnostics['normality']['conclusion']} (p={diagnostics['normality']['p_value']:.4f})
"""
    
    # Add test metrics if available
    if "test_metrics" in stats:
        test_metrics = stats["test_metrics"]
        summary += f"""
Out-of-sample Performance:
- RMSE: {test_metrics.get('rmse', 0):.4f}
- R²: {test_metrics.get('r2', 0):.4f}
"""
    
    return summary.strip()

def run_stock_regression(
    x_ticker: str,
    y_ticker: str,
    start_date: Union[str, datetime],
    end_date: Union[str, datetime] = None,
    interval: str = "1mo",
    model_type: str = "ols",
    add_features: bool = False,
    test_size: float = 0.2
) -> Dict[str, Any]:
    """
    Run full regression analysis on two stocks

    Args:
        x_ticker: Independent variable ticker symbol
        y_ticker: Dependent variable ticker symbol
        start_date: Start date for analysis
        end_date: End date for analysis (defaults to today)
        interval: Data interval ('1d', '1wk', '1mo', '3mo')
        model_type: Type of regression model to use
        add_features: Whether to add engineered features
        test_size: Proportion of data to use for testing

    Returns:
        Dictionary with regression results and metadata
    """
    # Fetch data for both stocks
    x_data = fetch_stock_data(x_ticker, start_date, end_date, interval)
    y_data = fetch_stock_data(y_ticker, start_date, end_date, interval)
    
    # Add ticker information to dataframes
    x_data['ticker'] = x_ticker
    y_data['ticker'] = y_ticker
    
    # Prepare data for regression
    joined_df, X, y = prepare_regression_data(x_data, y_data, add_features=add_features)
    
    # Run correlation analysis
    correlation_results = run_correlation_analysis(x_data, y_data)
    
    # Perform regression analysis
    results, stats = perform_regression_analysis(X, y, model_type=model_type, test_size=test_size)
    
    # Generate summary
    summary = generate_summary(results, x_ticker, y_ticker, model_type, stats)
    
    # Combine results into a dictionary
    return {
        "x_ticker": x_ticker,
        "y_ticker": y_ticker,
        "start_date": joined_df['Date'].min(),
        "end_date": joined_df['Date'].max(),
        "data_points": len(joined_df),
        "statistics": stats,
        "correlation": correlation_results,
        "model_type": model_type,
        "summary": summary,
        "created_at": datetime.now(),
    } 