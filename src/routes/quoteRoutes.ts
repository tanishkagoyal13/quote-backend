import { Router } from 'express';
import {
  getAllQuotes,
  getQuoteById,
  createQuote,
  analyzeQuote,
  updateQuoteStatus
} from '../controllers/quoteController';

const router = Router();

router.get('/', getAllQuotes);
router.get('/:id', getQuoteById);
router.post('/', createQuote);
router.post('/:id/analyze', analyzeQuote);
router.patch('/:id/status', updateQuoteStatus);

export default router;