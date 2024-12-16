# Smart Innovation Toolkit Platform

## Setup Instructions

1. Clone the repository
2. Copy `.env.example` to `.env` and update the values
3. Generate SSL certificates:
   ```bash
   mkcert -install
   cd certificates
   mkcert localhost
4. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
5. Start development servers:
   ```bash
   npm run dev

## Development
Frontend runs on: https://localhost:3000
Backend runs on: https://localhost:5000

## Environment Variables
See .env.example for required environment variables.