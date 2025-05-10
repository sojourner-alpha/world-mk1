# World-MK1: An Open Source Digital Multiverse

A personal portfolio website with an integrated financial analysis platform featuring CFA-level calculation tools and interactive components. This project serves as both a workbook for advanced financial analysis and a showcase of different conceptual spaces built with modern AI tools.

## 🌍 Project Vision: The Digital Multiverse

This project represents a new way of thinking about personal websites - not as static showcases, but as living digital spaces that reflect different aspects of thought, work, and creativity. It's built on the premise that our digital presence should be as multifaceted as we are.

- **Open Source Blueprint**: Take this framework and adapt it to build your own digital world
- **AI-Enhanced Development**: Leveraging modern AI tools to accelerate creation and analysis
- **Conceptual Spaces**: Different areas for different types of work and thought
- **Cross-disciplinary Tools**: Bringing powerful financial analysis capabilities to everyone

### The Different Spaces

#### 🔧 Workshop
The Workshop is a space for practical projects, tools, and professional experience. It showcases real-world applications, coding projects, and the technical skills used to build them. It's where ideas become tangible products and where the craftsperson's tools are displayed.

#### 📚 Study
The Study is dedicated to research, learning, and intellectual exploration. It houses investigations into markets, mental models, and meditative practices. This is where knowledge is gathered, analyzed, and synthesized into new insights, with sections on technical analysis, fundamental principles, and cross-disciplinary thinking.

#### 🛋️ Loft
The Loft is a personal space for creative inspiration, featuring books, art, music, and other media that influence thinking and creativity. It's a digital representation of the things that shape perspective outside of work - the cultural inputs that inform the outputs.

#### 💹 Finance 
The Finance section is the centerpiece of practical application - an AI powered analysis dashboard for the everyday investor, combining powerful analytical tools with an intuitive interface. This is where the intersection of machine learning and financial analysis creates something truly valuable.

## 🔍 A New Vision for Financial Analysis

At the core of this project is the belief that sophisticated financial analysis shouldn't be limited to institutions with expensive terminals. By combining modern AI capabilities with financial expertise, we're building:

- **Professional-grade Analysis**: CFA-level calculations accessible to retail investors
- **Machine Learning Integration**: AI-enhanced pattern recognition and predictive modeling
- **Intuitive Interface**: Complex analysis made accessible through thoughtful design
- **Educational Component**: Learning built into the platform to develop financial literacy
- **Symmetrical Access**: Democratizing access to advanced computational, analytical, and algorithms

This space serves dual purposes:
1. A workbook for developing high-level financial analysis capabilities
2. A demonstration of how AI and finance can intersect to create powerful tools for everyone

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
├── start-dev.sh       # Development script
└── docker-compose.yml # Docker Compose configuration
```

## Recent Development Updates

### Enhanced Backend & Database Integration

1. **Robust Database Infrastructure**
   - Implemented PostgreSQL integration with SQLAlchemy
   - Created finance schema with tables for stock data, regression analysis, and search history
   - Added connection pooling and performance optimizations
   - Created database initialization script for reliable setup

2. **Advanced Regression Analysis**
   - Expanded regression module to support multiple model types:
     - OLS (Ordinary Least Squares)
     - Robust Regression
     - Ridge, Lasso, and Elastic Net Regularization
     - Quantile Regression
     - GARCH Volatility Models
   - Implemented diagnostic tests for heteroskedasticity, autocorrelation, and normality
   - Added caching layer for better performance

3. **LLM Integration**
   - Created LLM service for AI-powered analysis summaries
   - Added support for generating investment insights from regression results
   - Implemented API adapters for multiple LLM providers (OpenAI, Anthropic)
   - Added endpoints for regression summarization and insights

4. **Docker Environment Improvements**
   - Resolved configuration issues in docker-compose.yml
   - Enhanced Docker startup script with better error detection
   - Fixed path issues in Dockerfiles
   - Added robust error handling for various environment configurations

## Testing Plan for Next Session

### Phase 1: yfinance Integration & Data Verification

1. **yfinance Data Quality Check**
   - Test yfinance API access for different tickers (AAPL, MSFT, SPY)
   - Verify data completeness (price, volume, date ranges)
   - Check available intervals (1d, 1wk, 1mo) to determine optimal settings
   - Create a small test script to benchmark yfinance response times

2. **Database Integration with yfinance Data**
   - Test storing yfinance-sourced data in PostgreSQL
   - Implement efficient schema for time-series data
   - Verify data retrieval performance from database vs. direct API calls
   - Test caching mechanisms for frequently accessed stock data

3. **Regression Processing with yfinance Data**
   - Test regression module with different pairs of stocks
   - Validate statistical calculations against known results
   - Benchmark processing time for different date ranges and intervals
   - Identify optimal parameters for yfinance data fetching

### Phase 2: API & Frontend Integration

1. **Backend API Endpoint Testing**
   - Test the `/finance/regression-analysis` endpoint using sample yfinance data
   - Verify correct handling of different intervals and date ranges
   - Test error handling for invalid tickers or date ranges
   - Confirm results are stored correctly in the database

2. **Frontend API Client Integration**
   - Update frontend API client to handle yfinance-specific parameters
   - Implement proper error handling for yfinance limitations
   - Test retrieval and display of regression results
   - Develop UI feedback for data loading states

3. **Complete UI Flow Testing**
   - Test the regression analysis form with real tickers
   - Verify visualization components render yfinance data correctly
   - Test the recent searches functionality
   - Implement LLM-generated insights based on regression results

### Phase 3: Optimization & Robustness

1. **yfinance Performance Optimization**
   - Implement smart batching of yfinance requests to avoid rate limits
   - Add caching layer for frequently requested stocks
   - Test parallel processing of independent API calls
   - Monitor and log yfinance API errors for diagnostics

2. **Error Handling & Recovery**
   - Test system response to yfinance API failures
   - Implement retry mechanisms for transient errors
   - Provide meaningful error messages to users
   - Create fallback options when data is unavailable

3. **End-to-End Testing Scenarios**
   - Test highly correlated stocks (e.g., AAPL vs. MSFT)
   - Test uncorrelated stocks (e.g., AAPL vs. GLD)
   - Test different market sectors
   - Test various time periods (bull market, bear market, sideways)

## Financial Analysis Tools

### Python Library Features

The backend includes a comprehensive financial analysis library with:

- **Fundamental Analysis**: Financial ratio calculations, DuPont analysis, growth metrics
- **Technical Analysis**: Moving averages, oscillators, trend indicators
- **Valuation Models**: DCF models, valuation ratios, NPV/IRR calculators
- **Portfolio Management**: Portfolio optimization, efficient frontier, performance metrics
- **Risk Assessment**: Value at Risk calculations, Monte Carlo simulations, stress testing
- **Regression Analysis**: Advanced stock correlation and regression analysis with multiple models:
  - OLS (Ordinary Least Squares)
  - Robust Linear Regression
  - Ridge Regression (L2 regularization)
  - Lasso Regression (L1 regularization)
  - Elastic Net Regression
  - Quantile Regression
  - GARCH Volatility Models
  - Statistical diagnostic tests (heteroskedasticity, autocorrelation, normality)

### Interactive Components

The frontend includes interactive financial tools:

- **Mortgage Calculator**: For mortgage payment analysis
- **Financial Ratio Calculator**: For fundamental company analysis
- **Regression Analysis Tool**: Advanced tool for analyzing relationships between stocks
  - Multiple regression model types (OLS, Ridge, Lasso, etc.)
  - Historical stock data visualization
  - Correlation statistics (Pearson, Spearman, Rolling)
  - Model diagnostics and statistical summaries
  - Recent search history tracking
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

- Docker Desktop (recommended for easy setup)
- Git

### Docker Desktop Setup

#### macOS

1. Download Docker Desktop from the [official Docker website](https://www.docker.com/products/docker-desktop)
2. Install Docker Desktop by dragging it to the Applications folder
3. Launch Docker Desktop from your Applications folder
4. After startup, you'll see the Docker whale icon in the menu bar
5. Sign in to Docker if prompted
6. **Important:** After installation, close and reopen your Terminal to update your PATH
7. Verify Docker is working by running:
   ```bash
   docker --version
   docker-compose --version
   ```

If you run into permissions issues on macOS, you may need to:
1. Go to System Preferences > Security & Privacy
2. Click the lock icon to make changes
3. Approve Docker Desktop to run

#### Windows

1. Download Docker Desktop from the [official Docker website](https://www.docker.com/products/docker-desktop)
2. Run the installer and follow the prompts
3. Ensure "Use WSL 2 instead of Hyper-V" is selected (recommended)
4. Launch Docker Desktop from the Start menu
5. Sign in to Docker if prompted
6. **Important:** Restart your command prompt or PowerShell to update your PATH
7. Verify Docker is working by running:
   ```powershell
   docker --version
   docker-compose --version
   ```

### Quick Start with Docker (Recommended)

Using Docker is the easiest way to run the entire project with all dependencies:

```bash
# Clone the repository
git clone https://github.com/curtislederle/world-mk1.git
cd world-mk1

# Make the script executable
chmod +x start-dev.sh

# Start the Docker development environment
./start-dev.sh
```

This script will:
- Check if Docker and Docker Compose are installed
- Build and start all containers (frontend, backend, PostgreSQL, pgAdmin)
- Display access URLs for each service
- Show the container logs

You can then access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- pgAdmin: http://localhost:5050 (email: admin@admin.com, password: admin)

### Alternative Development Setup

If you prefer to run components separately during development:

1. **Run database services in Docker**:
   ```bash
   docker compose up db pgadmin
   ```

2. **Run backend in local environment**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload --port 8000
   ```

3. **Run frontend with Vite**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

This approach offers faster refresh times during development.

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
    interval="1mo",
    model_type="ols"  # Can be "ols", "robust", "ridge", "lasso", "elastic_net", "quantile", "garch"
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
  - Supports multiple regression models (OLS, Robust, Ridge, Lasso, Elastic Net, Quantile, GARCH)
  - Returns detailed statistical analysis and diagnostics
- `GET /api/finance/recent-regressions`: Get list of recent regression searches
- `GET /api/finance/regression-models`: Get available regression model types
- `POST /api/finance/regression-summary`: Get AI-generated summary of regression analysis
- `POST /api/finance/regression-insights`: Get AI-generated investment insights based on regression analysis

## Roadmap

- [x] Stock data integration via Yahoo Finance API
- [x] Regression analysis infrastructure 
- [x] PostgreSQL database setup
- [x] Advanced regression models (OLS, Ridge, Lasso, Elastic Net, Quantile, GARCH)
- [x] Docker development environment
- [x] LLM integration for investment insights
- [ ] Visualization of regression results
- [ ] Interactive technical analysis charting
- [ ] Portfolio visualization tools
- [ ] Machine learning for financial analysis
- [ ] ESG analysis components

## Troubleshooting

### Docker Issues
- Make sure Docker Desktop is running before executing `start-dev.sh`
- If containers fail to start, try running `docker-compose down` followed by `./start-dev.sh`
- View logs with `docker-compose logs -f [service-name]` (service names: frontend, backend, postgres, pgadmin)

#### Common Docker Issues on macOS:
- If Docker commands aren't found, try restarting your Terminal after installation
- Ensure Docker Desktop is running (check for the whale icon in the menu bar)
- If you see "Error response from daemon: Bad response from Docker engine", restart Docker Desktop
- Sometimes Docker Desktop needs more resource allocation:
  1. Click the Docker icon in the menu bar
  2. Select "Preferences" or "Settings"
  3. Go to "Resources" tab
  4. Increase CPU, Memory and Swap as needed

### Database Connection
- The database may take a few moments to initialize on first run
- Check connection settings in pgAdmin: Host: postgres, Port: 5432, Username: postgres, Password: postgres

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