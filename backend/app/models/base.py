from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
import os
from datetime import datetime

# Load database URL from environment variables or use default
database_url = os.getenv("DATABASE_URL", "sqlite:///./finance.db")

# Create SQLAlchemy engine and session
engine = create_engine(database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Base models for finance application
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    payments = relationship("Payment", back_populates="user")
    calculations = relationship("Calculation", back_populates="user")

class Payment(Base):
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stripe_payment_id = Column(String, unique=True, index=True)
    amount = Column(Float)
    currency = Column(String, default="usd")
    status = Column(String)  # 'succeeded', 'pending', 'failed'
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="payments")

class Calculation(Base):
    __tablename__ = "calculations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    calc_type = Column(String)  # 'mortgage', 'npv', 'irr', etc.
    input_data = Column(String)  # JSON string of input parameters
    result_data = Column(String)  # JSON string of calculation results
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="calculations")

# Create all tables in the database
def create_tables():
    Base.metadata.create_all(bind=engine) 