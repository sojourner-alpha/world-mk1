"""
Regression analysis service for stock data
"""
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from typing import Dict, Any, Optional, List, Tuple
from sqlalchemy.orm import Session
import yfinance as yf
from statsmodels.stats.diagnostic import het_breuschpagan, acorr_ljungbox
from statsmodels.stats.stattools import jarque_bera
from scipy import stats
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.metrics import mean_squared_error, r2_score
import statsmodels.api as sm
from statsmodels.regression.quantile_regression import QuantReg
import arch

from app.models.regression import StockData, RegressionAnalysis, SearchHistory
from app.db import get_db

class RegressionService:
    """Service for performing regression analysis on stock data"""
    
    @staticmethod
    async def get_available_models() -> Dict[str, str]:
        """Get available regression model types"""
        return {
            "ols": "Ordinary Least Squares",
            "ridge": "Ridge Regression (L2)",
            "lasso": "Lasso Regression (L1)",
            "elastic_net": "Elastic Net Regression",
            "quantile": "Quantile Regression",
            "garch": "GARCH Volatility Model"
        }
    
    @staticmethod
    async def get_recent_searches(db: Session, limit: int = 10) -> List[Dict[str, Any]]:
        """Get recent regression searches"""
        searches = db.query(SearchHistory).order_by(
            SearchHistory.searched_at.desc()
        ).limit(limit).all()
        
        return [
            {
                "id": search.id,
                "regression_id": search.regression_id,
                "x_ticker": search.x_ticker,
                "y_ticker": search.y_ticker,
                "searched_at": search.searched_at.isoformat()
            }
            for search in searches
        ]
    
    @staticmethod
    async def run_regression_analysis(
        db: Session,
        x_ticker: str,
        y_ticker: str,
        start_date: str,
        end_date: Optional[str] = None,
        interval: str = "1d",
        model_type: str = "ols",
        add_features: bool = False,
        test_size: float = 0.2,
        use_cache: bool = True
    ) -> Dict[str, Any]:
        """
        Perform regression analysis between two stocks
        
        Args:
            db: Database session
            x_ticker: Independent variable ticker
            y_ticker: Dependent variable ticker
            start_date: Start date for analysis
            end_date: End date for analysis (defaults to today)
            interval: Data interval (1d, 1wk, 1mo)
            model_type: Type of regression model to use
            add_features: Whether to add additional features
            test_size: Test set size for validation
            use_cache: Whether to use cached results
            
        Returns:
            Dictionary containing regression results
        """
        # Convert dates
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.strptime(end_date, "%Y-%m-%d") if end_date else datetime.now()
        
        # Check cache if enabled
        if use_cache:
            cached = db.query(RegressionAnalysis).filter(
                RegressionAnalysis.x_ticker == x_ticker,
                RegressionAnalysis.y_ticker == y_ticker,
                RegressionAnalysis.start_date == start,
                RegressionAnalysis.end_date == end,
                RegressionAnalysis.interval == interval,
                RegressionAnalysis.model_type == model_type,
                RegressionAnalysis.add_features == add_features
            ).first()
            
            if cached:
                # Update search history
                search = SearchHistory(
                    regression_id=cached.id,
                    x_ticker=x_ticker,
                    y_ticker=y_ticker
                )
                db.add(search)
                db.commit()
                
                return await RegressionService._format_regression_results(cached)
        
        # Fetch stock data
        x_data = await RegressionService._fetch_stock_data(x_ticker, start, end, interval)
        y_data = await RegressionService._fetch_stock_data(y_ticker, start, end, interval)
        
        if x_data.empty or y_data.empty:
            raise ValueError("No data available for the specified period")
        
        # Prepare data
        X = x_data['Close'].values.reshape(-1, 1)
        y = y_data['Close'].values
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, shuffle=False
        )
        
        # Run regression
        model, results = await RegressionService._run_regression(
            X_train, y_train, X_test, y_test, model_type
        )
        
        # Calculate diagnostics
        diagnostics = await RegressionService._calculate_diagnostics(
            X_train, y_train, results
        )
        
        # Calculate correlation metrics
        correlation = await RegressionService._calculate_correlations(
            x_data['Close'], y_data['Close']
        )
        
        # Create regression record
        regression = RegressionAnalysis(
            x_ticker=x_ticker,
            y_ticker=y_ticker,
            start_date=start,
            end_date=end,
            interval=interval,
            model_type=model_type,
            add_features=add_features,
            test_size=test_size,
            use_cache=use_cache,
            slope=float(results['slope']),
            intercept=float(results['intercept']),
            r_squared=float(results['r_squared']),
            adjusted_r_squared=float(results['adjusted_r_squared']),
            p_value=float(results['p_value']),
            standard_error=float(results['standard_error']),
            f_statistic=float(results.get('f_statistic', 0)),
            aic=float(results.get('aic', 0)),
            bic=float(results.get('bic', 0)),
            residual_std_error=float(results.get('residual_std_error', 0)),
            coefficients=results.get('coefficients'),
            std_errors=results.get('std_errors'),
            t_values=results.get('t_values'),
            p_values=results.get('p_values'),
            anova_table=results.get('anova_table'),
            diagnostics=diagnostics,
            test_metrics=results.get('test_metrics'),
            correlation=correlation
        )
        
        db.add(regression)
        db.commit()
        
        # Add to search history
        search = SearchHistory(
            regression_id=regression.id,
            x_ticker=x_ticker,
            y_ticker=y_ticker
        )
        db.add(search)
        db.commit()
        
        return await RegressionService._format_regression_results(regression)
    
    @staticmethod
    async def _fetch_stock_data(
        ticker: str,
        start: datetime,
        end: datetime,
        interval: str
    ) -> pd.DataFrame:
        """Fetch stock data from yfinance"""
        try:
            stock = yf.Ticker(ticker)
            data = stock.history(start=start, end=end, interval=interval)
            return data
        except Exception as e:
            raise ValueError(f"Error fetching data for {ticker}: {str(e)}")
    
    @staticmethod
    async def _run_regression(
        X_train: np.ndarray,
        y_train: np.ndarray,
        X_test: np.ndarray,
        y_test: np.ndarray,
        model_type: str
    ) -> Tuple[Any, Dict[str, Any]]:
        """Run regression analysis"""
        results = {}
        
        if model_type == "ols":
            model = LinearRegression()
            model.fit(X_train, y_train)
            
            # Calculate statistics
            y_pred = model.predict(X_train)
            residuals = y_train - y_pred
            n = len(X_train)
            p = X_train.shape[1]
            
            # R-squared and adjusted R-squared
            r_squared = r2_score(y_train, y_pred)
            adjusted_r_squared = 1 - (1 - r_squared) * (n - 1) / (n - p - 1)
            
            # Standard error
            mse = mean_squared_error(y_train, y_pred)
            standard_error = np.sqrt(mse)
            
            # F-statistic and p-value
            f_statistic = (r_squared / p) / ((1 - r_squared) / (n - p - 1))
            f_pvalue = 1 - stats.f.cdf(f_statistic, p, n - p - 1)
            
            # AIC and BIC
            aic = n * np.log(mse) + 2 * p
            bic = n * np.log(mse) + p * np.log(n)
            
            results = {
                "slope": model.coef_[0],
                "intercept": model.intercept_,
                "r_squared": r_squared,
                "adjusted_r_squared": adjusted_r_squared,
                "p_value": f_pvalue,
                "standard_error": standard_error,
                "f_statistic": f_statistic,
                "aic": aic,
                "bic": bic,
                "residual_std_error": np.std(residuals)
            }
            
            # Test metrics
            y_test_pred = model.predict(X_test)
            results["test_metrics"] = {
                "mse": mean_squared_error(y_test, y_test_pred),
                "rmse": np.sqrt(mean_squared_error(y_test, y_test_pred)),
                "r2": r2_score(y_test, y_test_pred)
            }
            
        elif model_type == "ridge":
            model = Ridge()
            model.fit(X_train, y_train)
            # Add ridge-specific calculations
            
        elif model_type == "lasso":
            model = Lasso()
            model.fit(X_train, y_train)
            # Add lasso-specific calculations
            
        elif model_type == "elastic_net":
            model = ElasticNet()
            model.fit(X_train, y_train)
            # Add elastic net-specific calculations
            
        elif model_type == "quantile":
            model = QuantReg(y_train, sm.add_constant(X_train))
            results = model.fit(q=0.5)
            # Add quantile regression-specific calculations
            
        elif model_type == "garch":
            # Calculate returns
            returns = np.diff(np.log(y_train))
            model = arch.arch_model(returns, vol='Garch', p=1, q=1)
            results = model.fit(disp='off')
            # Add GARCH-specific calculations
            
        else:
            raise ValueError(f"Unsupported model type: {model_type}")
        
        return model, results
    
    @staticmethod
    async def _calculate_diagnostics(
        X: np.ndarray,
        y: np.ndarray,
        results: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Calculate regression diagnostics"""
        # Heteroskedasticity test
        het_test = het_breuschpagan(results.get('residuals', []), sm.add_constant(X))
        
        # Autocorrelation test
        acorr_test = acorr_ljungbox(results.get('residuals', []), lags=10)
        
        # Normality test
        jb_test = jarque_bera(results.get('residuals', []))
        
        return {
            "heteroskedasticity": {
                "test": "Breusch-Pagan",
                "statistic": float(het_test[0]),
                "p_value": float(het_test[1]),
                "conclusion": "Heteroskedasticity present" if het_test[1] < 0.05 else "No heteroskedasticity"
            },
            "autocorrelation": {
                "test": "Ljung-Box",
                "statistic": float(acorr_test[0][0]),
                "p_value": float(acorr_test[1][0]),
                "conclusion": "Autocorrelation present" if acorr_test[1][0] < 0.05 else "No autocorrelation"
            },
            "normality": {
                "test": "Jarque-Bera",
                "statistic": float(jb_test[0]),
                "p_value": float(jb_test[1]),
                "conclusion": "Non-normal residuals" if jb_test[1] < 0.05 else "Normal residuals"
            }
        }
    
    @staticmethod
    async def _calculate_correlations(
        x_series: pd.Series,
        y_series: pd.Series
    ) -> Dict[str, Any]:
        """Calculate correlation metrics"""
        # Pearson correlation
        pearson = stats.pearsonr(x_series, y_series)
        
        # Spearman correlation
        spearman = stats.spearmanr(x_series, y_series)
        
        # Rolling correlation (30-day window)
        rolling_corr = x_series.rolling(window=30).corr(y_series)
        
        return {
            "pearson": {
                "r": float(pearson[0]),
                "p-value": float(pearson[1]),
                "CI95%": [float(ci) for ci in pearson[2]],
                "bf10": float(stats.bayes_factor(pearson[0], len(x_series))),
                "power": float(stats.power_analysis(pearson[0], len(x_series)))
            },
            "spearman": {
                "r": float(spearman[0]),
                "p-value": float(spearman[1]),
                "CI95%": [float(ci) for ci in spearman[2]]
            },
            "rolling_correlation": {
                "mean": float(rolling_corr.mean()),
                "std": float(rolling_corr.std()),
                "min": float(rolling_corr.min()),
                "max": float(rolling_corr.max()),
                "current": float(rolling_corr.iloc[-1]) if not rolling_corr.empty else None
            },
            "time_period": {
                "start": x_series.index[0].isoformat(),
                "end": x_series.index[-1].isoformat(),
                "observations": len(x_series)
            }
        }
    
    @staticmethod
    async def _format_regression_results(
        regression: RegressionAnalysis
    ) -> Dict[str, Any]:
        """Format regression results for API response"""
        return {
            "id": regression.id,
            "x_ticker": regression.x_ticker,
            "y_ticker": regression.y_ticker,
            "start_date": regression.start_date.isoformat(),
            "end_date": regression.end_date.isoformat(),
            "data_points": regression.correlation["time_period"]["observations"],
            "model_type": regression.model_type,
            "statistics": {
                "model_type": regression.model_type,
                "coefficients": regression.coefficients,
                "std_errors": regression.std_errors,
                "t_values": regression.t_values,
                "p_values": regression.p_values,
                "r_squared": regression.r_squared,
                "adjusted_r_squared": regression.adjusted_r_squared,
                "f_statistic": regression.f_statistic,
                "f_pvalue": regression.p_value,
                "aic": regression.aic,
                "bic": regression.bic,
                "residual_std_error": regression.residual_std_error,
                "diagnostics": regression.diagnostics,
                "test_metrics": regression.test_metrics,
                "anova_table": regression.anova_table
            },
            "correlation": regression.correlation,
            "summary": regression.summary,
            "created_at": regression.created_at.isoformat()
        } 