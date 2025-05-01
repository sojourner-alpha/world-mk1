# Database Documentation

This document outlines the database structure for the World-MK1 financial analysis platform.

## Overview

The application uses PostgreSQL for data storage with the following structure:

- Schema: `finance`
- Tables:
  - `stock_data`: Historical stock prices and earnings data
  - `regression_analysis`: Results of regression analyses between stocks
  - `search_history`: History of regression analysis searches

## Schema Details

### Table: `stock_data`

Stores historical stock data retrieved from Yahoo Finance.

| Column      | Type      | Description                         |
|-------------|-----------|-------------------------------------|
| id          | Integer   | Primary key                         |
| ticker      | String    | Stock ticker symbol                 |
| date        | DateTime  | Date of the data point              |
| price       | Float     | Closing price                       |
| earnings    | Float     | Quarterly earnings (if available)   |
| created_at  | DateTime  | Record creation timestamp           |
| updated_at  | DateTime  | Record update timestamp             |

### Table: `regression_analysis`

Stores results from regression analyses between pairs of stocks.

| Column             | Type      | Description                        |
|--------------------|-----------|------------------------------------|
| id                 | Integer   | Primary key                        |
| x_ticker           | String    | Independent variable ticker        |
| y_ticker           | String    | Dependent variable ticker          |
| start_date         | DateTime  | Start date of analysis             |
| end_date           | DateTime  | End date of analysis               |
| slope              | Float     | Regression slope coefficient       |
| intercept          | Float     | Regression intercept               |
| r_squared          | Float     | R-squared value                    |
| adjusted_r_squared | Float     | Adjusted R-squared value           |
| p_value            | Float     | P-value of the regression          |
| standard_error     | Float     | Standard error of the estimate     |
| anova_table        | JSON      | ANOVA table data                   |
| summary            | Text      | Human-readable summary             |
| created_at         | DateTime  | Analysis timestamp                 |
| created_by         | String    | User ID (for future auth)          |

### Table: `search_history`

Tracks user searches for regression analyses.

| Column         | Type      | Description                    |
|---------------|-----------|--------------------------------|
| id            | Integer   | Primary key                    |
| regression_id | Integer   | Foreign key to regression_analysis |
| x_ticker      | String    | Independent variable ticker    |
| y_ticker      | String    | Dependent variable ticker      |
| searched_at   | DateTime  | Search timestamp               |

## Working with the Database

### pgAdmin Access

When running with Docker, pgAdmin is available at [http://localhost:5050](http://localhost:5050).

Login credentials:
- Email: admin@admin.com
- Password: admin

After logging in, add a new server with:
- Name: World-MK1
- Host: db
- Port: 5432
- Username: postgres
- Password: postgres

### Direct PostgreSQL Access

You can connect directly to the PostgreSQL database:

```bash
# Using npm script
npm run db:psql

# Or with docker-compose
docker-compose exec db psql -U postgres -d finance
```

Common PostgreSQL commands:
- `\d`: List tables
- `\d finance.regression_analysis`: Describe table
- `\q`: Quit psql

### Migrations

The application uses Alembic for database migrations:

```bash
# Generate a migration
cd backend
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Revert last migration
alembic downgrade -1
```

## Data Flow

1. Stock data is fetched from Yahoo Finance API
2. Regression analysis is performed on the data
3. Results are stored in the database
4. The API serves results to the frontend
5. Previous searches can be retrieved from search history 