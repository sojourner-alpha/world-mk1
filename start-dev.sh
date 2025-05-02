#!/bin/bash

# Start development environment with Docker Compose

echo "═════════════════════════════════════════════"
echo "  World-MK1 Docker Development Environment"
echo "═════════════════════════════════════════════"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Error: Docker is not installed or not in PATH"
  echo "Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
  exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
  # Try using Docker Compose V2 syntax if available
  if docker compose version &> /dev/null; then
    echo "Using Docker Compose V2..."
    DOCKER_COMPOSE="docker compose"
  else
    echo "Error: docker-compose is not installed or not in PATH"
    echo "Please install Docker Compose from https://docs.docker.com/compose/install/"
    exit 1
  fi
else
  DOCKER_COMPOSE="docker-compose"
fi

# Function to handle exit
cleanup() {
  echo "Shutting down services..."
  $DOCKER_COMPOSE down
  exit 0
}

# Trap signals
trap cleanup SIGINT SIGTERM

# Ensure we have the latest changes
echo "Building and starting services..."
$DOCKER_COMPOSE up --build -d

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
echo "  To view logs: $DOCKER_COMPOSE logs -f"
echo "  Press Ctrl+C to stop all services"
echo "═════════════════════════════════════════════"

# Show logs
$DOCKER_COMPOSE logs -f 