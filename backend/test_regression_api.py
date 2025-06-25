"""
Test script for regression analysis API
"""
import asyncio
import pytest
from datetime import datetime, timedelta
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db import Base, get_db
from app.models.regression import StockData, RegressionAnalysis, SearchHistory

# Create test database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

def override_get_db():
    """Override get_db dependency for testing"""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_get_available_models():
    """Test getting available regression models"""
    response = client.get("/api/finance/regression-models")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, dict)
    assert "ols" in data
    assert "ridge" in data
    assert "lasso" in data
    assert "elastic_net" in data
    assert "quantile" in data
    assert "garch" in data

def test_regression_analysis():
    """Test running regression analysis"""
    # Test data
    x_ticker = "AAPL"
    y_ticker = "MSFT"
    start_date = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
    end_date = datetime.now().strftime("%Y-%m-%d")
    
    # Test OLS regression
    response = client.post(
        "/api/finance/regression-analysis",
        json={
            "x_ticker": x_ticker,
            "y_ticker": y_ticker,
            "start_date": start_date,
            "end_date": end_date,
            "interval": "1d",
            "model_type": "ols",
            "add_features": False,
            "test_size": 0.2,
            "use_cache": False
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    
    # Verify response structure
    assert "id" in data
    assert data["x_ticker"] == x_ticker
    assert data["y_ticker"] == y_ticker
    assert "statistics" in data
    assert "correlation" in data
    
    # Verify statistics
    stats = data["statistics"]
    assert "r_squared" in stats
    assert "adjusted_r_squared" in stats
    assert "p_value" in stats
    assert "standard_error" in stats
    
    # Verify correlation metrics
    corr = data["correlation"]
    assert "pearson" in corr
    assert "spearman" in corr
    assert "rolling_correlation" in corr
    
    # Test error handling
    response = client.post(
        "/api/finance/regression-analysis",
        json={
            "x_ticker": "INVALID",
            "y_ticker": "INVALID",
            "start_date": start_date,
            "end_date": end_date
        }
    )
    assert response.status_code == 400

def test_recent_searches():
    """Test getting recent searches"""
    response = client.get("/api/finance/recent-regressions")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_regression_summary():
    """Test getting regression summary"""
    # First run a regression
    x_ticker = "AAPL"
    y_ticker = "MSFT"
    start_date = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
    end_date = datetime.now().strftime("%Y-%m-%d")
    
    response = client.post(
        "/api/finance/regression-analysis",
        json={
            "x_ticker": x_ticker,
            "y_ticker": y_ticker,
            "start_date": start_date,
            "end_date": end_date,
            "interval": "1d",
            "model_type": "ols",
            "add_features": False,
            "test_size": 0.2,
            "use_cache": False
        }
    )
    
    assert response.status_code == 200
    regression_id = response.json()["id"]
    
    # Test getting summary
    response = client.post(
        "/api/finance/regression-summary",
        json={"regression_id": regression_id}
    )
    assert response.status_code == 200
    data = response.json()
    assert "summary" in data

def test_regression_insights():
    """Test getting regression insights"""
    # First run a regression
    x_ticker = "AAPL"
    y_ticker = "MSFT"
    start_date = (datetime.now() - timedelta(days=365)).strftime("%Y-%m-%d")
    end_date = datetime.now().strftime("%Y-%m-%d")
    
    response = client.post(
        "/api/finance/regression-analysis",
        json={
            "x_ticker": x_ticker,
            "y_ticker": y_ticker,
            "start_date": start_date,
            "end_date": end_date,
            "interval": "1d",
            "model_type": "ols",
            "add_features": False,
            "test_size": 0.2,
            "use_cache": False
        }
    )
    
    assert response.status_code == 200
    regression_id = response.json()["id"]
    
    # Test getting insights
    response = client.post(
        "/api/finance/regression-insights",
        json={
            "regression_id": regression_id,
            "additional_context": "Market is in a bull phase",
            "model": "gpt-4",
            "temperature": 0.2,
            "max_tokens": 350
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert "insights" in data

if __name__ == "__main__":
    pytest.main([__file__]) 