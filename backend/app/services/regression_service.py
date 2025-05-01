"""
Service for regression analysis operations
"""
from datetime import datetime
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
        max_age_days: int = 30
    ) -> Optional[Dict[str, Any]]:
        """
        Get saved regression analysis from database if recent enough
        
        Args:
            db: Database session
            x_ticker: Independent variable ticker
            y_ticker: Dependent variable ticker
            max_age_days: Maximum age in days for cached results
            
        Returns:
            Dictionary with regression results or None if not found/too old
        """
        # Calculate cutoff date
        cutoff_date = datetime.now() - datetime.timedelta(days=max_age_days)
        
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
        # Create new regression analysis record
        db_analysis = RegressionAnalysis(
            x_ticker=x_ticker,
            y_ticker=y_ticker,
            start_date=results['start_date'],
            end_date=results['end_date'],
            slope=results['statistics']['slope'],
            intercept=results['statistics']['intercept'],
            r_squared=results['statistics']['r_squared'],
            adjusted_r_squared=results['statistics']['adjusted_r_squared'],
            p_value=results['statistics']['p_value'],
            standard_error=results['statistics']['standard_error'],
            anova_table=results['statistics']['anova_table'],
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
            use_cache: Whether to use cached results if available
            user_id: Optional user ID for tracking
            
        Returns:
            Dictionary with regression results
        """
        # Check for cached results if requested
        if use_cache:
            cached = await RegressionService.get_saved_regression(db, x_ticker, y_ticker)
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
            interval=interval
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