# World-MK1

A personal portfolio website with an integrated financial analysis platform featuring CFA-level calculation tools and interactive components.

## Project Overview

This project combines a React-based personal website with a Python FastAPI backend for comprehensive financial analysis:

- **Portfolio Website**: Showcases professional work, studies, and creative projects
- **Financial Analysis Library**: Provides CFA-level financial calculations and tools
- **Interactive Components**: Includes financial calculators, visualization tools, and educational resources

## Project Structure

The project is divided into two main components:

```
world-mk1/
├── frontend/                # React/TypeScript SPA with Vite
│   ├── src/pages            # Website sections (Finance, Workshop, Study, etc.)
│   ├── src/components       # Reusable UI components
│   │   └── finance/         # Financial analysis components
│   └── src/api              # API client for communicating with the backend
│
├── backend/                 # Python FastAPI backend
│   ├── app/                 # Main application code
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # Database models
│   │   ├── services/        # Business logic services
│   │   └── finance/         # Financial analysis library
│   │       ├── fundamentals.py  # Financial ratio calculations
│   │       ├── technical.py     # Technical analysis indicators
│   │       ├── valuation.py     # Valuation models and ratios
│   │       ├── portfolio.py     # Portfolio optimization
│   │       ├── risk.py          # Risk analysis tools
│   │       └── regression.py    # Stock regression analysis
│   └── migrations/          # Alembic database migrations
│
├── docker/            # Docker configuration
├── run-dev.sh         # Development script
└── docker-compose.yml # Docker Compose configuration
```

## Financial Analysis Tools

### Python Library Features

The backend includes a comprehensive financial analysis library with:

- **Fundamental Analysis**: Financial ratio calculations, DuPont analysis, growth metrics
- **Technical Analysis**: Moving averages, oscillators, trend indicators
- **Valuation Models**: DCF models, valuation ratios, NPV/IRR calculators
- **Portfolio Management**: Portfolio optimization, efficient frontier, performance metrics
- **Risk Assessment**: Value at Risk calculations, Monte Carlo simulations, stress testing
- **Regression Analysis**: Stock correlation analysis, ANOVA calculations, and statistical modeling

### Interactive Components

The frontend includes interactive financial tools:

- **Mortgage Calculator**: For mortgage payment analysis
- **Financial Ratio Calculator**: For fundamental company analysis
- **Regression Analysis Tool**: For analyzing relationships between stocks
- **Library Documentation**: Interactive documentation of available financial functions
- *(Coming Soon)* Portfolio Optimizer and Technical Analysis Tools

## Database Infrastructure

The application uses a PostgreSQL database for persistent storage:

- **Stock Data**: Historical price and earnings data for stocks
- **Regression Analysis**: Results of regression analyses between stocks
- **Search History**: Record of user searches for quick retrieval

The database layer uses:
- **SQLAlchemy**: ORM for database interactions
- **Alembic**: Database migration system
- **PostgreSQL**: Robust relational database
- **pgAdmin**: Database administration interface

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- Git
- Docker and Docker Compose (recommended)

### Quick Start

The easiest way to run the entire project is using the provided script:

```bash
# Make the script executable (first time only)
chmod +x run-dev.sh

# Start both frontend and backend
./run-dev.sh
```

This will:
- Set up a Python virtual environment if needed
- Install all dependencies
- Start the FastAPI backend on http://localhost:8000
- Start the Vite frontend on http://localhost:5173

### Using Docker

```bash
# Start all services (frontend, backend, PostgreSQL, pgAdmin)
docker-compose up

# Stop services
docker-compose down
```

Access pgAdmin at http://localhost:5050 (email: admin@admin.com, password: admin)

## Using the Financial Library

### Example: Calculating Financial Ratios

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
```

### Example: Performing Regression Analysis

```python
from app.finance import regression

# Run regression analysis between two stocks
results = regression.run_stock_regression(
    x_ticker="AAPL",
    y_ticker="MSFT",
    start_date="2018-01-01",
    end_date="2023-01-01",
    interval="1mo"
)

# Access regression statistics
r_squared = results["statistics"]["r_squared"]
print(f"R-squared: {r_squared:.2%}")  # Example: R-squared: 78.50%

# Access the summary
print(results["summary"])
```

## API Documentation

When the backend is running, auto-generated API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Regression Analysis API Endpoints

- `POST /api/finance/regression-analysis`: Perform regression analysis between two stocks
- `GET /api/finance/recent-regressions`: Get list of recent regression searches

## Roadmap

- [x] Stock data integration via Yahoo Finance API
- [x] Regression analysis infrastructure
- [x] PostgreSQL database setup
- [ ] Visualization of regression results
- [ ] Interactive technical analysis charting
- [ ] Portfolio visualization tools
- [ ] Machine learning for financial analysis
- [ ] ESG analysis components

## Deployment

### GitHub Pages (Frontend Only)

The frontend can be deployed to GitHub Pages while keeping the backend code in the repository:

```bash
npm run frontend:deploy
```

The site will be deployed to https://curtislederle.com

### Full Stack Deployment (Coming Soon)

Instructions for deploying both frontend and backend to Railway will be added soon.

## License

This project is private and not licensed for public use or distribution.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy](https://sqlalchemy.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [NumPy](https://numpy.org/) and [Pandas](https://pandas.pydata.org/)
- [SciPy](https://scipy.org/) and [statsmodels](https://www.statsmodels.org/)