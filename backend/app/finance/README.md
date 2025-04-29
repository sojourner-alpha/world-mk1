# CFA-Level Financial Analysis Library

A comprehensive Python library for financial analysis, modeling, and calculations at the CFA level. This library provides modular tools for fundamental analysis, technical analysis, valuation, portfolio management, and risk assessment.

## Features

### Fundamental Analysis (`fundamentals.py`)

Calculate and analyze financial ratios, growth rates, and key metrics:

- Profitability ratios (ROE, ROA, margins)
- Liquidity ratios (current ratio, quick ratio)
- Efficiency ratios (asset turnover, inventory turnover)
- Solvency ratios (debt-to-equity, interest coverage)
- Growth calculations (CAGR, period-over-period)
- DuPont analysis
- Common-size financial statements

### Technical Analysis (`technical.py`)

Calculate technical indicators for price data analysis:

- Moving averages (SMA, EMA, WMA)
- Oscillators (RSI, Stochastic, MACD)
- Volatility indicators (Bollinger Bands)
- Volume indicators (On-Balance Volume, A/D Line)
- Trend indicators (ADX)

### Valuation (`valuation.py`)

Implement valuation models and calculate valuation ratios:

- Valuation ratios (P/E, P/B, P/S, EV/EBITDA)
- Discounted Cash Flow (DCF) valuation
- Weighted Average Cost of Capital (WACC)
- Net Present Value (NPV) and Internal Rate of Return (IRR)
- Comparable company analysis

### Portfolio Management (`portfolio.py`)

Tools for portfolio construction, optimization, and analysis:

- Portfolio return and risk calculations
- Portfolio optimization (maximum Sharpe ratio)
- Efficient frontier generation
- Performance metrics (alpha, beta, tracking error)
- Maximum drawdown analysis

### Risk Analysis (`risk.py`)

Risk management and stress testing tools:

- Value at Risk (VaR) calculations
- Conditional Value at Risk (CVaR)
- Monte Carlo simulations
- Stress testing
- Risk decomposition and contribution
- Risk parity optimization

## Usage

### Basic Examples

#### Calculating Financial Ratios

```python
from app.finance import fundamentals

# Calculate Return on Equity
roe = fundamentals.return_on_equity(net_income=100000, shareholders_equity=1000000)
print(f"ROE: {roe:.2%}")  # Output: ROE: 10.00%

# DuPont Analysis
dupont = fundamentals.dupont_analysis(
    net_income=100000,
    revenue=1000000,
    total_assets=2000000,
    shareholders_equity=1000000
)
print(f"ROE Components: {dupont}")
```

#### Portfolio Optimization

```python
import numpy as np
from app.finance import portfolio

# Sample data
returns = np.array([0.10, 0.15, 0.05, 0.08])
cov_matrix = np.array([
    [0.0100, 0.0018, 0.0011, 0.0014],
    [0.0018, 0.0225, 0.0010, 0.0070],
    [0.0011, 0.0010, 0.0400, 0.0020],
    [0.0014, 0.0070, 0.0020, 0.0100]
])

# Optimize portfolio
result = portfolio.optimize_portfolio(returns, cov_matrix, risk_free_rate=0.02)
print(f"Optimized weights: {result['weights']}")
print(f"Expected return: {result['expected_return']:.2%}")
print(f"Expected volatility: {result['expected_volatility']:.2%}")
print(f"Sharpe ratio: {result['sharpe_ratio']:.2f}")
```

#### Valuation

```python
from app.finance import valuation

# DCF Valuation
cash_flows = [100000, 120000, 150000, 180000, 210000]
terminal_growth_rate = 0.02
discount_rate = 0.10

result = valuation.dcf_valuation(
    cash_flows=cash_flows,
    discount_rate=discount_rate,
    terminal_growth_rate=terminal_growth_rate
)

print(f"Enterprise Value: ${result['enterprise_value']:,.2f}")
```

## API Integration

This library is designed to be easily integrated with FastAPI endpoints for web applications. See `routes/finance.py` for API endpoint implementations.

## Dependencies

- NumPy: For numerical computations
- Pandas: For data manipulation
- SciPy: For optimization routines
- NumPy-Financial: For financial functions
- Statsmodels: For statistical calculations

## License

Open source - available for educational and personal use. 