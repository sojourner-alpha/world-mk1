"""
Pydantic schemas for regression analysis
"""
from typing import Optional, Dict, List, Any
from pydantic import BaseModel, Field
from datetime import datetime

class RegressionAnalysisRequest(BaseModel):
    """Request schema for regression analysis"""
    x_ticker: str = Field(..., description="Ticker symbol for independent variable")
    y_ticker: str = Field(..., description="Ticker symbol for dependent variable")
    start_date: str = Field(..., description="Start date for analysis (YYYY-MM-DD)")
    end_date: str = Field(..., description="End date for analysis (YYYY-MM-DD)")
    interval: str = Field("1d", description="Data interval (1d, 1wk, 1mo)")
    model_type: str = Field("ols", description="Type of regression model to use")
    add_features: bool = Field(False, description="Whether to add technical indicators as features")
    test_size: float = Field(0.2, description="Proportion of data to use for testing")
    use_cache: bool = Field(True, description="Whether to use cached results if available")

class RegressionStatistics(BaseModel):
    """Statistics from regression analysis"""
    r_squared: float
    adjusted_r_squared: float
    p_value: float
    standard_error: float
    f_statistic: float
    aic: float
    bic: float
    residual_std_error: float

class RegressionCorrelation(BaseModel):
    """Correlation metrics"""
    pearson: Dict[str, float]
    spearman: Dict[str, float]
    rolling_correlation: List[Dict[str, Any]]

class RegressionAnalysisResponse(BaseModel):
    """Response schema for regression analysis"""
    id: int
    x_ticker: str
    y_ticker: str
    start_date: str
    end_date: str
    interval: str
    model_type: str
    statistics: RegressionStatistics
    correlation: RegressionCorrelation
    coefficients: Dict[str, float]
    std_errors: Dict[str, float]
    t_values: Dict[str, float]
    p_values: Dict[str, float]
    diagnostics: Dict[str, Any]
    test_metrics: Dict[str, float]
    created_at: datetime

class RegressionSummaryRequest(BaseModel):
    """Request schema for regression summary"""
    regression_id: int = Field(..., description="ID of the regression analysis")

class RegressionSummaryResponse(BaseModel):
    """Response schema for regression summary"""
    summary: str
    statistics: Dict[str, Any]
    diagnostics: Dict[str, Any]
    test_metrics: Dict[str, float]

class RegressionInsightsRequest(BaseModel):
    """Request schema for regression insights"""
    regression_id: int = Field(..., description="ID of the regression analysis")
    additional_context: Optional[str] = Field(None, description="Additional market context")
    model: str = Field("gpt-4", description="LLM model to use")
    temperature: float = Field(0.2, description="Temperature for LLM generation")
    max_tokens: int = Field(350, description="Maximum tokens for LLM response")

class RegressionInsightsResponse(BaseModel):
    """Response schema for regression insights"""
    insights: str

class RecentSearchesResponse(BaseModel):
    """Response schema for recent searches"""
    id: int
    x_ticker: str
    y_ticker: str
    model_type: str
    created_at: datetime
    statistics: Dict[str, Any] 