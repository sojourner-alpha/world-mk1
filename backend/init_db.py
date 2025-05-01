"""
Database initialization script
"""
import os
import sys
import logging
from sqlalchemy import create_engine, text

# Add the parent directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from app.db import engine

def init_db():
    """
    Initialize database with required schemas
    """
    try:
        # Create finance schema if it doesn't exist
        with engine.connect() as conn:
            conn.execute(text("CREATE SCHEMA IF NOT EXISTS finance;"))
            conn.commit()
            logging.info("Finance schema created or already exists")
        
        # Initialize Alembic migration
        os.system("cd backend && alembic revision --autogenerate -m 'Initial migration'")
        os.system("cd backend && alembic upgrade head")
        
        logging.info("Database initialization completed successfully")
        return True
    
    except Exception as e:
        logging.error(f"Error initializing database: {e}")
        return False

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    init_db() 