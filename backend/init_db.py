"""
Database initialization script for the World-MK1 application.
This script creates the required schema and tables if they don't exist.
"""
import os
import sys
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import sqlalchemy as sa
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy import create_engine, text

# Get database URL from environment or use default
DATABASE_URL = os.environ.get(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@db:5432/finance"
)

def create_schema():
    """Create the finance schema if it doesn't exist"""
    # Connect to PostgreSQL
    engine = create_engine(DATABASE_URL)
    
    if not database_exists(engine.url):
        create_database(engine.url)
        print(f"Database created: {engine.url}")
    
    # Create schema if it doesn't exist
    with engine.connect() as conn:
        conn.execute(text("CREATE SCHEMA IF NOT EXISTS finance;"))
        conn.commit()
        print("Finance schema created or already exists")
    
    return engine

def init_models():
    """Initialize database models"""
    # Import models here to avoid circular imports
    from app.db import Base, engine
    from app.models.regression import StockData, RegressionAnalysis, SearchHistory
    
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully")

def main():
    """Main initialization function"""
    print("Initializing database...")
    
    try:
        # Create schema first
        engine = create_schema()
        
        # Initialize models
        init_models()
        
        print("Database initialization complete")
        return True
    
    except Exception as e:
        print(f"Error initializing database: {e}")
        return False

if __name__ == "__main__":
    success = main()
    if not success:
        sys.exit(1) 