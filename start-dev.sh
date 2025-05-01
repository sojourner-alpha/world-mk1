#!/bin/bash

# Start development environment with Docker Compose

echo "═════════════════════════════════════════════"
echo "  World-MK1 Docker Development Environment"
echo "═════════════════════════════════════════════"
echo ""

# Function to handle exit
cleanup() {
  echo "Shutting down services..."
  docker-compose down
  exit 0
}

# Trap signals
trap cleanup SIGINT SIGTERM

# Ensure we have the latest changes
echo "Building and starting services..."
docker-compose up --build -d

# Wait for services to start
echo "Waiting for services to start..."
sleep 5

echo ""
echo "═════════════════════════════════════════════"
echo "  Development services are running!"
echo "  • Frontend: http://localhost:3000"
echo "  • Backend:  http://localhost:8000"
echo "  • API Docs: http://localhost:8000/docs"
echo "  • pgAdmin:  http://localhost:5050"
echo ""
echo "    pgAdmin login:"
echo "    • Email:    admin@admin.com"
echo "    • Password: admin"
echo ""
echo "  To view logs: docker-compose logs -f"
echo "  Press Ctrl+C to stop all services"
echo "═════════════════════════════════════════════"

# Show logs
docker-compose logs -f 