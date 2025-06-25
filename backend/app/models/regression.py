"""
SQLAlchemy models for regression analysis
"""
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, JSON, ForeignKey, Index
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db import Base

class StockData(Base):
    """Model for stock price data"""
    __tablename__ = "stock_data"
    __table_args__ = {"schema": "finance"}
    
    id = Column(Integer, primary_key=True)
    ticker = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    close = Column(Float, nullable=False)
    volume = Column(Float)
    high = Column(Float)
    low = Column(Float)
    open = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Indexes
    __table_args__ = (
        Index("idx_stock_data_ticker_date", "ticker", "date"),
    )

class RegressionAnalysis(Base):
    """Model for regression analysis results"""
    __tablename__ = "regression_analysis"
    __table_args__ = {"schema": "finance"}
    
    id = Column(Integer, primary_key=True)
    x_ticker = Column(String, nullable=False)
    y_ticker = Column(String, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    interval = Column(String, nullable=False)
    model_type = Column(String, nullable=False)
    add_features = Column(Boolean, default=False)
    test_size = Column(Float, default=0.2)
    
    # Statistics
    r_squared = Column(Float)
    adjusted_r_squared = Column(Float)
    p_value = Column(Float)
    standard_error = Column(Float)
    f_statistic = Column(Float)
    aic = Column(Float)
    bic = Column(Float)
    residual_std_error = Column(Float)
    
    # Model results
    coefficients = Column(JSON)
    std_errors = Column(JSON)
    t_values = Column(JSON)
    p_values = Column(JSON)
    
    # Diagnostics and metrics
    diagnostics = Column(JSON)
    test_metrics = Column(JSON)
    correlation = Column(JSON)
    summary = Column(String)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    use_cache = Column(Boolean, default=True)
    
    # Relationships
    search_history = relationship("SearchHistory", back_populates="regression")
    
    # Indexes
    __table_args__ = (
        Index("idx_regression_tickers", "x_ticker", "y_ticker"),
        Index("idx_regression_dates", "start_date", "end_date"),
        Index("idx_regression_model", "model_type"),
    )

class SearchHistory(Base):
    """Model for regression search history"""
    __tablename__ = "search_history"
    __table_args__ = {"schema": "finance"}
    
    id = Column(Integer, primary_key=True)
    regression_id = Column(Integer, ForeignKey("finance.regression_analysis.id"))
    searched_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    regression = relationship("RegressionAnalysis", back_populates="search_history")
    
    # Indexes
    __table_args__ = (
        Index("idx_search_history_regression", "regression_id"),
        Index("idx_search_history_date", "searched_at"),
    ) 