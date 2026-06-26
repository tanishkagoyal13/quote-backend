import { Router } from 'express';
import {
  getAllQuotes,
  getQuoteById,
  createQuote,
  analyzeQuote,
  updateQuoteStatus
} from '../controllers/quoteController';
import { validate } from '../middleware/validate';
import { createQuoteSchema, updateStatusSchema } from '../utils/schemas';

const router = Router();

router.get('/', getAllQuotes);
router.get('/:id', getQuoteById);
router.post('/', validate(createQuoteSchema), createQuote);
router.post('/:id/analyze', analyzeQuote);
router.patch('/:id/status', validate(updateStatusSchema), updateQuoteStatus);

export default router;