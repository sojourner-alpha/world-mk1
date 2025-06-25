"""
Database connection module
"""
import os
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database configuration
DB_USER = os.getenv("DB_USER", "postgres")
DB_PASSWORD = os.getenv("DB_PASSWORD", "postgres")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_NAME = os.getenv("DB_NAME", "finance")

# Create database URL
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create engine
engine = create_engine(
    DATABASE_URL,
    pool_size=5,               # Number of connections to keep open
    max_overflow=10,           # Max number of connections to open above pool_size
    pool_timeout=30,           # Seconds to wait before giving up on getting a connection
    pool_recycle=1800,         # Recycle connections after 30 minutes to handle stale connections
    pool_pre_ping=True         # Test connections with a ping before using
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create base class for models with schema name
Base = declarative_base()

# Set schema for all tables (can be overridden in model classes)
@event.listens_for(Base.metadata, 'before_create')
def receive_before_create(target, connection, **kw):
    """Set default schema for all tables"""
    schema_translate_map = {None: "finance"}
    connection.dialect.default_schema_name = "finance"

def get_db():
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 