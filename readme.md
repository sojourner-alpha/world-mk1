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
│   │   └── finance/         # Financial analysis library
│   │       ├── fundamentals.py  # Financial ratio calculations
│   │       ├── technical.py     # Technical analysis indicators
│   │       ├── valuation.py     # Valuation models and ratios
│   │       ├── portfolio.py     # Portfolio optimization
│   │       └── risk.py          # Risk analysis tools
│   └── app/                 # Main application code
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

### Interactive Components

The frontend includes interactive financial tools:

- **Mortgage Calculator**: For mortgage payment analysis
- **Financial Ratio Calculator**: For fundamental company analysis
- **Library Documentation**: Interactive documentation of available financial functions
- *(Coming Soon)* Portfolio Optimizer and Technical Analysis Tools

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- Git

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

### Manual Setup

#### Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Start development server
npm run dev
```

#### Backend

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env

# Start development server
uvicorn app.main:app --reload
```

### Using Docker

```bash
# Start both services
npm run docker:dev

# Or use docker-compose directly
docker-compose up

# Stop services
npm run docker:down
```

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

### Example: Portfolio Optimization

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
```

## API Documentation

When the backend is running, auto-generated API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Roadmap

- [ ] Stock data integration from external financial APIs
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
- [NumPy](https://numpy.org/) and [Pandas](https://pandas.pydata.org/)
- [SciPy](https://scipy.org/)