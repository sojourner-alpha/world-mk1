"""
Database initialization script
"""
import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.db import Base
from app.models.regression import StockData, RegressionAnalysis, SearchHistory

# Database configuration
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "finance")

# Create database URL
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

def create_schema():
    """Create the finance schema if it doesn't exist"""
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        conn.execute(text("CREATE SCHEMA IF NOT EXISTS finance"))
        conn.commit()

def init_models():
    """Initialize database models"""
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(bind=engine)

def main():
    """Main initialization function"""
    print("Initializing database...")
    
    # Create schema
    print("Creating finance schema...")
    create_schema()
    
    # Initialize models
    print("Creating database tables...")
    init_models()
    
    print("Database initialization complete!")

if __name__ == "__main__":
    main() 