"""
Models for regression analysis and stock data
"""
from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship

from app.db import Base

class StockData(Base):
    """
    Model for storing stock price and earnings data
    """
    __tablename__ = "stock_data"

    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String, index=True)
    date = Column(DateTime, index=True)
    price = Column(Float)
    earnings = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Define indexes in the table
    __table_args__ = (
        {"schema": "finance"},
    )

class RegressionAnalysis(Base):
    """
    Model for storing regression analysis results
    """
    __tablename__ = "regression_analysis"

    id = Column(Integer, primary_key=True, index=True)
    
    # Independent variable (X)
    x_ticker = Column(String, index=True)
    
    # Dependent variable (Y)
    y_ticker = Column(String, index=True)
    
    # Analysis period
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    
    # Regression results
    slope = Column(Float)
    intercept = Column(Float)
    r_squared = Column(Float)
    adjusted_r_squared = Column(Float)
    p_value = Column(Float)
    standard_error = Column(Float)
    
    # ANOVA data
    anova_table = Column(JSON)
    
    # LLM summary
    summary = Column(Text, nullable=True)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    created_by = Column(String, nullable=True)
    
    # Define indexes in the table
    __table_args__ = (
        {"schema": "finance"},
    )

class SearchHistory(Base):
    """
    Model for tracking search history
    """
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)
    regression_id = Column(Integer, ForeignKey("finance.regression_analysis.id"))
    x_ticker = Column(String, index=True)
    y_ticker = Column(String, index=True)
    searched_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationship with regression analysis
    regression = relationship("RegressionAnalysis")
    
    # Define indexes in the table
    __table_args__ = (
        {"schema": "finance"},
    ) 