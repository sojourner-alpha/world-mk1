#!/bin/bash

# Run-dev script for running both frontend and backend in development mode

# Function to handle exit
cleanup() {
  echo "Shutting down servers..."
  # Kill all child processes
  pkill -P $$
  exit 0
}

# Trap signals
trap cleanup SIGINT SIGTERM

echo "═════════════════════════════════════════════"
echo "  World-MK1 Development Environment"
echo "═════════════════════════════════════════════"
echo ""
echo "Starting backend and frontend servers..."
echo ""

# Check Python environment
if [ ! -d "backend/venv" ]; then
  echo "Python virtual environment not found. Creating one..."
  cd backend
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
  cd ..
else
  echo "Using existing Python virtual environment"
fi

# Activate Python environment and start backend
cd backend
source venv/bin/activate
echo "Starting FastAPI backend on http://localhost:8000..."
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
cd ..

# Give the backend a moment to start
sleep 2

# Start frontend
cd frontend
echo "Starting Vite frontend on http://localhost:5173..."
npm run dev &
cd ..

echo ""
echo "═════════════════════════════════════════════"
echo "  Development servers are running!"
echo "  • Frontend: http://localhost:5173"
echo "  • Backend:  http://localhost:8000"
echo "  • API Docs: http://localhost:8000/docs"
echo ""
echo "  Press Ctrl+C to stop all servers"
echo "═════════════════════════════════════════════"

# Keep script running
wait 