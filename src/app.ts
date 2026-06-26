import express, { Application } from 'express';
import quoteRoutes from './routes/quoteRoutes';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import { requestId } from './middleware/requestId';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(requestId);
app.use(requestLogger);

// Routes
app.use('/quotes', quoteRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Global error handler - must be last
app.use(errorHandler);

export default app;