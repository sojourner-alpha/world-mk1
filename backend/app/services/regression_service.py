"""
Service for regression analysis operations
"""
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
import json

from app.models.regression import StockData, RegressionAnalysis, SearchHistory
from app.finance import regression

class RegressionService:
    """
    Service for handling regression analysis operations
    """
    
    @staticmethod
    async def store_stock_data(db: Session, ticker: str, data: Dict[str, Any]) -> None:
        """
        Store stock data in the database
        
        Args:
            db: Database session
            ticker: Stock ticker symbol
            data: Stock data dictionary with date, price, earnings
        """
        # Check if record already exists
        existing = db.query(StockData).filter(
            StockData.ticker == ticker,
            StockData.date == data['date']
        ).first()
        
        if not existing:
            # Create new record
            db_stock_data = StockData(
                ticker=ticker,
                date=data['date'],
                price=data['price'],
                earnings=data.get('earnings')
            )
            db.add(db_stock_data)
            db.commit()
    
    @staticmethod
    async def get_saved_regression(
        db: Session, 
        x_ticker: str, 
        y_ticker: str,
        model_type: str = "ols",
        max_age_days: int = 30
    ) -> Optional[Dict[str, Any]]:
        """
        Get saved regression analysis from database if recent enough
        
        Args:
            db: Database session
            x_ticker: Independent variable ticker
            y_ticker: Dependent variable ticker
            model_type: Regression model type
            max_age_days: Maximum age in days for cached results
            
        Returns:
            Dictionary with regression results or None if not found/too old
        """
        # Calculate cutoff date
        cutoff_date = datetime.now() - timedelta(days=max_age_days)
        
        # Query for recent analysis
        analysis = db.query(RegressionAnalysis).filter(
            RegressionAnalysis.x_ticker == x_ticker,
            RegressionAnalysis.y_ticker == y_ticker,
            RegressionAnalysis.created_at >= cutoff_date
        ).order_by(RegressionAnalysis.created_at.desc()).first()
        
        if not analysis:
            return None
        
        # Convert to dictionary
        return {
            "id": analysis.id,
            "x_ticker": analysis.x_ticker,
            "y_ticker": analysis.y_ticker,
            "model_type": model_type,
            "start_date": analysis.start_date,
            "end_date": analysis.end_date,
            "slope": analysis.slope,
            "intercept": analysis.intercept,
            "r_squared": analysis.r_squared,
            "adjusted_r_squared": analysis.adjusted_r_squared,
            "p_value": analysis.p_value,
            "standard_error": analysis.standard_error,
            "anova_table": analysis.anova_table,
            "summary": analysis.summary,
            "created_at": analysis.created_at,
        }
    
    @staticmethod
    async def save_regression_analysis(
        db: Session, 
        x_ticker: str, 
        y_ticker: str,
        results: Dict[str, Any],
        user_id: Optional[str] = None
    ) -> int:
        """
        Save regression analysis results to database
        
        Args:
            db: Database session
            x_ticker: Independent variable ticker
            y_ticker: Dependent variable ticker
            results: Regression analysis results
            user_id: Optional user ID for tracking
            
        Returns:
            ID of saved regression analysis
        """
        # Extract statistics
        stats = results.get('statistics', {})
        
        # For different model types, extract coefficients differently
        model_type = results.get('model_type', 'ols')
        
        # Default values
        slope = 0
        intercept = 0
        r_squared = 0
        
        if model_type == 'ols':
            # Standard OLS regression
            if 'coefficients' in stats and len(stats['coefficients']) > 1:
                intercept = stats['coefficients'][0] 
                slope = stats['coefficients'][1]
            r_squared = stats.get('r_squared', 0)
            adjusted_r_squared = stats.get('adjusted_r_squared', 0)
            p_value = stats.get('f_pvalue', 1)
            standard_error = stats.get('std_errors', [0, 0])[1] if 'std_errors' in stats and len(stats['std_errors']) > 1 else 0
            
        elif model_type in ['ridge', 'lasso', 'elastic_net']:
            # Regularized regression from scikit-learn
            intercept = stats.get('intercept', 0)
            slope = stats.get('coefficients', [0])[0] if 'coefficients' in stats and len(stats['coefficients']) > 0 else 0
            r_squared = stats.get('test_metrics', {}).get('r2', 0) if 'test_metrics' in stats else 0
            adjusted_r_squared = 0  # Not directly available
            p_value = 0  # Not directly available
            standard_error = 0  # Not directly available
            
        elif model_type == 'quantile':
            # Quantile regression (median)
            if 'coefficients' in stats and '0.5' in stats['coefficients'] and len(stats['coefficients']['0.5']) > 1:
                intercept = stats['coefficients']['0.5'][0]
                slope = stats['coefficients']['0.5'][1]
            r_squared = stats.get('pseudo_r2', {}).get('0.5', 0)
            adjusted_r_squared = 0  # Not directly available
            p_value = 0  # Not directly available
            standard_error = 0  # Not directly available
            
        else:
            # Default fallback
            if 'coefficients' in stats and len(stats['coefficients']) > 1:
                intercept = stats['coefficients'][0]
                slope = stats['coefficients'][1]
            r_squared = 0
            adjusted_r_squared = 0
            p_value = 1
            standard_error = 0
        
        # Create new regression analysis record
        db_analysis = RegressionAnalysis(
            x_ticker=x_ticker,
            y_ticker=y_ticker,
            start_date=results['start_date'],
            end_date=results['end_date'],
            slope=slope,
            intercept=intercept,
            r_squared=r_squared,
            adjusted_r_squared=adjusted_r_squared,
            p_value=p_value,
            standard_error=standard_error,
            anova_table=stats.get('anova_table', {}),
            summary=results['summary'],
            created_at=datetime.now(),
            created_by=user_id
        )
        
        db.add(db_analysis)
        db.commit()
        db.refresh(db_analysis)
        
        # Create search history record
        db_search = SearchHistory(
            regression_id=db_analysis.id,
            x_ticker=x_ticker,
            y_ticker=y_ticker,
            searched_at=datetime.now()
        )
        
        db.add(db_search)
        db.commit()
        
        return db_analysis.id
    
    @staticmethod
    async def get_recent_searches(db: Session, limit: int = 10) -> List[Dict[str, Any]]:
        """
        Get recent regression searches
        
        Args:
            db: Database session
            limit: Maximum number of results to return
            
        Returns:
            List of recent searches with timestamps
        """
        searches = db.query(SearchHistory).order_by(
            SearchHistory.searched_at.desc()
        ).limit(limit).all()
        
        return [
            {
                "id": search.id,
                "regression_id": search.regression_id,
                "x_ticker": search.x_ticker,
                "y_ticker": search.y_ticker,
                "searched_at": search.searched_at,
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
        interval: str = "1mo",
        model_type: str = "ols",
        add_features: bool = False,
        test_size: float = 0.2,
        use_cache: bool = True,
        user_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Run regression analysis on two stocks
        
        Args:
            db: Database session
            x_ticker: Independent variable ticker
            y_ticker: Dependent variable ticker
            start_date: Start date for analysis
            end_date: End date for analysis
            interval: Data interval
            model_type: Type of regression model
            add_features: Whether to add engineered features
            test_size: Proportion of data to use for testing
            use_cache: Whether to use cached results if available
            user_id: Optional user ID for tracking
            
        Returns:
            Dictionary with regression results
        """
        # Check for cached results if requested
        if use_cache:
            cached = await RegressionService.get_saved_regression(db, x_ticker, y_ticker, model_type)
            if cached:
                # Record this search in history
                db_search = SearchHistory(
                    regression_id=cached['id'],
                    x_ticker=x_ticker,
                    y_ticker=y_ticker,
                    searched_at=datetime.now()
                )
                db.add(db_search)
                db.commit()
                
                return cached
        
        # Run new regression analysis
        results = regression.run_stock_regression(
            x_ticker=x_ticker,
            y_ticker=y_ticker,
            start_date=start_date,
            end_date=end_date,
            interval=interval,
            model_type=model_type,
            add_features=add_features,
            test_size=test_size
        )
        
        # Save results to database
        analysis_id = await RegressionService.save_regression_analysis(
            db=db,
            x_ticker=x_ticker,
            y_ticker=y_ticker,
            results=results,
            user_id=user_id
        )
        
        # Add ID to results
        results['id'] = analysis_id
        
        return results
    
    @staticmethod
    async def get_available_models() -> Dict[str, str]:
        """
        Get available regression model types
        
        Returns:
            Dictionary of model types and descriptions
        """
        return regression.REGRESSION_MODELS 