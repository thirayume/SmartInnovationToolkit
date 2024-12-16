import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors({
  origin: 'https://localhost:3000', // Allow frontend origin
  credentials: true
}));
app.use(express.json());

// SSL configuration
const sslOptions: https.ServerOptions = {
  key: fs.readFileSync(path.join(__dirname, '../../certificates/localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../../certificates/localhost.pem'))
};

const PORT: number = parseInt(process.env.PORT || '8000', 10);

// Test route to verify API is working
app.get('/test', (req: Request, res: Response) => {
  res.json({ 
    message: 'API is working!',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.get('/api/test', (req: Request, res: Response) => {
  res.json({ 
    message: 'Backend API is working!',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Academic Platform API',
    version: '1.0.0',
    status: 'Active',
    endpoints: {
      root: '/',
      test: '/test',
      apiTest: '/api/test'
    }
  });
});

// Error handling for undefined routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
      path: req.path
    }
  });
});

// Create HTTPS server
https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`⚡️[server]: Secure server running at https://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  - GET /');
  console.log('  - GET /test');
  console.log('  - GET /api/test');
});