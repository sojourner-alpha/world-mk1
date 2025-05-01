"""
Test script for regression analysis API
"""
import requests
import json
from datetime import datetime, timedelta

# Configuration
API_URL = "http://localhost:8000/api/finance"
TEST_X_TICKER = "AAPL"
TEST_Y_TICKER = "MSFT"
START_DATE = (datetime.now() - timedelta(days=365*5)).strftime("%Y-%m-%d")  # 5 years ago

def test_regression_analysis():
    """
    Test the regression analysis API endpoint
    """
    print(f"Testing regression analysis: {TEST_X_TICKER} vs {TEST_Y_TICKER}...")
    
    # Request data
    data = {
        "x_ticker": TEST_X_TICKER,
        "y_ticker": TEST_Y_TICKER,
        "start_date": START_DATE,
        "interval": "1mo",
        "use_cache": True
    }
    
    # Send request
    response = requests.post(f"{API_URL}/regression-analysis", json=data)
    
    # Check response
    if response.status_code == 200:
        result = response.json()
        print("Regression analysis successful!")
        print(f"Data points: {result.get('data_points', 'N/A')}")
        print(f"R-squared: {result.get('statistics', {}).get('r_squared', 'N/A'):.4f}")
        print(f"P-value: {result.get('statistics', {}).get('p_value', 'N/A'):.6f}")
        print("\nSummary:")
        print(result.get('summary', 'No summary available'))
        return True
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return False

def test_recent_regressions():
    """
    Test the recent regressions API endpoint
    """
    print("\nTesting recent regressions...")
    
    # Send request
    response = requests.get(f"{API_URL}/recent-regressions?limit=5")
    
    # Check response
    if response.status_code == 200:
        result = response.json()
        print("Recent regressions retrieved successfully!")
        print(f"Found {len(result)} recent searches")
        
        if result:
            print("\nRecent searches:")
            for search in result:
                print(f"- {search.get('x_ticker')} vs {search.get('y_ticker')} on {search.get('searched_at', 'unknown date')}")
        return True
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        return False

if __name__ == "__main__":
    print("=== Regression Analysis API Test ===\n")
    test_regression_analysis()
    test_recent_regressions()
    print("\n=== Test Complete ===") 