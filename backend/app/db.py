"""
Database connection utilities
"""
import os
from sqlalchemy import create_engine, event
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool

# Get database URL from environment variable or use default
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/finance")

# Configure SQLAlchemy engine with appropriate PostgreSQL settings
engine = create_engine(
    DATABASE_URL,
    pool_size=5,               # Number of connections to keep open
    max_overflow=10,           # Max number of connections to open above pool_size
    pool_timeout=30,           # Seconds to wait before giving up on getting a connection
    pool_recycle=1800,         # Recycle connections after 30 minutes to handle stale connections
    pool_pre_ping=True,        # Test connections with a ping before using
    pool_class=QueuePool      # Use QueuePool for connection pooling
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

# Dependency to get DB session
def get_db():
    """
    Get database session for dependency injection in FastAPI
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 