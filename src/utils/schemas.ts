import { z } from 'zod';
import { QuoteStatus } from '../types/models';

export const createQuoteSchema = z.object({
  customer_name: z.string().min(1, 'customer_name is required'),
  insurance_type: z.string().min(1, 'insurance_type is required'),
  coverage_amount: z.number().positive('coverage_amount must be a positive number')
});

const validStatuses = Object.values(QuoteStatus) as [QuoteStatus, ...QuoteStatus[]];

export const updateStatusSchema = z.object({
  status: z.enum(validStatuses, {
    message: `status must be one of: ${Object.values(QuoteStatus).join(', ')}`
  })
});