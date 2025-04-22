from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import database models
from app.models.base import create_tables

# Create FastAPI app
app = FastAPI(
    title="World-MK1 Finance API",
    description="API for financial calculations and payment processing",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternate dev port
        "https://curtislederle.com",  # Production
        "*"  # During development - restrict this in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check endpoint
@app.get("/")
async def root():
    return {"status": "healthy", "message": "Finance API is running"}

# Simple test endpoint for connection testing
@app.get("/api/finance/test")
async def test_connection():
    return {"status": "connected", "message": "Successfully connected to Finance API"}

# Import and include routers
from app.routes import stripe, finance

app.include_router(stripe.router, prefix="/api/stripe", tags=["stripe"])
app.include_router(finance.router, prefix="/api/finance", tags=["finance"])

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    create_tables() 