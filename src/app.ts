import express, { Application } from 'express';
import quoteRoutes from './routes/quoteRoutes';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/quotes', quoteRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;