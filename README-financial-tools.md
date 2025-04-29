# Financial Analysis Tools & Library

This repository contains a comprehensive set of financial analysis tools and libraries designed for both educational purposes and practical application in investment analysis, portfolio management, and financial decision-making.

## Components

### 1. Python Financial Analysis Library

A CFA-level library for financial analysis, including:

- **Fundamental Analysis**: Financial ratio calculations, DuPont analysis, growth metrics
- **Technical Analysis**: Moving averages, oscillators, trend indicators, volume analysis
- **Valuation**: DCF models, valuation ratios, comparable company analysis
- **Portfolio Management**: Portfolio optimization, efficient frontier, performance analysis
- **Risk Assessment**: Value at Risk, Monte Carlo simulations, stress testing

### 2. FastAPI Backend

A RESTful API that provides financial calculation endpoints:

- Ratio calculators and fundamental analysis
- DCF and NPV/IRR calculators
- Portfolio optimization
- Technical indicator generation
- Risk metrics

### 3. React Frontend Components

Interactive financial calculators and visualization tools:

- Mortgage Calculator
- Financial Ratio Calculator
- *(Coming Soon)* Portfolio Optimizer
- *(Coming Soon)* Stock Analysis Dashboard
- *(Coming Soon)* Technical Chart Analysis

## Technology Stack

- **Backend**: Python, FastAPI, NumPy, Pandas, SciPy
- **Frontend**: React, TypeScript, TailwindCSS
- **Data Visualization**: Recharts (planned)
- **API Communication**: Axios

## Getting Started

### Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/financial-tools.git
   cd financial-tools
   ```

2. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

4. Start the services:
   ```
   # Terminal 1: Start the backend
   cd backend
   uvicorn app.main:app --reload
   
   # Terminal 2: Start the frontend
   cd frontend
   npm run dev
   ```

## Using the Library

### Python Library Import

```python
# Import modules directly
from app.finance import fundamentals, technical, valuation, portfolio, risk

# Calculate a financial ratio
roe = fundamentals.return_on_equity(
    net_income=1000000, 
    shareholders_equity=10000000
)

# Perform portfolio optimization
optimal_portfolio = portfolio.optimize_portfolio(
    returns=asset_returns,
    cov_matrix=covariance_matrix,
    risk_free_rate=0.02
)
```

### API Endpoints

The API is available at `http://localhost:8000/api/finance/` with the following endpoints:

- `/fundamental-ratios` - Calculate financial ratios
- `/technical-indicators` - Generate technical indicators
- `/valuation-ratios` - Calculate valuation metrics
- `/dcf` - Perform discounted cash flow analysis
- `/portfolio-optimization` - Optimize portfolios
- `/efficient-frontier` - Generate efficient frontier

## Roadmap

- [ ] Add stock data fetching from external APIs
- [ ] Implement visualization for technical indicators
- [ ] Create interactive portfolio builder
- [ ] Add machine learning models for price prediction
- [ ] Extend to ESG analysis tools

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is available for educational and personal use. 