# World-MK1

A personal portfolio website with an integrated finance API for financial calculations and payment processing.

## Project Overview

This project combines a React-based personal website with a Python FastAPI backend for financial tools:

- **Portfolio Website**: Showcases professional work, studies, and creative projects
- **Finance API**: Provides financial calculations and payment processing capabilities
- **Interactive Tools**: Includes mortgage calculators, NPV/IRR tools, and more

## Project Structure

The project is divided into two main components:

```
world-mk1/
├── frontend/          # React/TypeScript SPA with Vite
│   ├── src/pages      # Website sections (Finance, Workshop, Study, etc.)
│   ├── src/components # Reusable UI components
│   └── public/        # Static assets and images
│
├── backend/           # Python FastAPI backend
│   ├── app/           # Main application code 
│   ├── app/routes     # API endpoints
│   └── app/models     # Database models
│
├── docker/            # Docker configuration
├── run-dev.sh         # Development script
└── docker-compose.yml # Docker Compose configuration
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.10+)
- Git

### Quick Start

The easiest way to run the entire project is using the provided script:

```bash
# Make the script executable (first time only)
chmod +x run-dev.sh

# Start both frontend and backend
./run-dev.sh
```

This will:
- Set up a Python virtual environment if needed
- Install all dependencies
- Start the FastAPI backend on http://localhost:8000
- Start the Vite frontend on http://localhost:5173

### Manual Setup

#### Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file from template
cp .env.example .env

# Start development server
npm run dev
```

#### Backend

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
cp .env.example .env

# Start development server
uvicorn app.main:app --reload
```

### Using Docker

```bash
# Start both services
npm run docker:dev

# Or use docker-compose directly
docker-compose up

# Stop services
npm run docker:down
```

## Features

### Frontend

- **Multi-page SPA**: Workshop (portfolio), Finance, Study, Loft, and more
- **Responsive Design**: Mobile and desktop optimized with Tailwind CSS
- **Interactive Elements**: GSAP animations, 3D components, and visual effects
- **CV Generation**: Dynamic resume display and PDF download
- **Terminal UI**: Command-line inspired interface for Finance section

### Backend

- **Financial Calculators**: Mortgage, NPV, IRR, etc.
- **Stripe Integration**: Payment processing for financial tools
- **Data Persistence**: SQLAlchemy models for user data
- **API Documentation**: Auto-generated with FastAPI
- **JWT Authentication**: Secure user access (coming soon)

## Development

### Available Scripts

From the project root:

```bash
# Start both frontend and backend
npm run dev

# Start only the frontend
npm run frontend:dev

# Start only the backend
npm run backend:dev

# Build the frontend
npm run frontend:build

# Deploy the frontend to GitHub Pages
npm run frontend:deploy
```

### API Documentation

When the backend is running, auto-generated API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Deployment

### GitHub Pages (Frontend Only)

The frontend can be deployed to GitHub Pages while keeping the backend code in the repository:

```bash
npm run frontend:deploy
```

The site will be deployed to https://curtislederle.com

### Full Stack Deployment (Coming Soon)

Instructions for deploying both frontend and backend to Railway will be added soon.

## License

This project is private and not licensed for public use or distribution.

## Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Stripe](https://stripe.com/)