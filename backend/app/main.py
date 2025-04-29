from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routes
from app.routes import finance

# Create FastAPI app
app = FastAPI(
    title="World-MK1 Finance API",
    description="Financial analysis and calculation API",
    version="0.1.0",
)

# Configure CORS
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Alternative dev server
    "https://curtislederle.com",  # Production domain
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API router setup
api_router = APIRouter(prefix="/api")
api_router.include_router(finance.router, prefix="/finance", tags=["finance"])

# Include API router
app.include_router(api_router)

# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Welcome to World-MK1 Finance API",
        "docs": "/docs",
        "redoc": "/redoc"
    }

# Test endpoint
@app.get("/api/finance/test")
async def test():
    return {"status": "ok", "message": "Finance API is running"}

# Run the app
if __name__ == "__main__":
    import uvicorn
    
    # Get port from environment variable or use default
    port = int(os.getenv("PORT", 8000))
    
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True) 