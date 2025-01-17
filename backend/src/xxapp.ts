import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { requestLogger } from './middleware/logging.middleware';
import logger from './utils/logger';
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8000;

// Create HTTPS server
https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, '../../certificates/localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../certificates/localhost.pem'))
  }, 
  app
).listen(PORT, () => {
  logger.info(`⚡️[server]: Secure server running at https://localhost:${PORT}`);
});

export default app;