import * as quoteRepo from '../repositories/quoteRepositories';
import * as analysisRepo from '../repositories/analysisRepository';
import { analyzeDocument } from './fastApiService';
import { CreateQuoteDTO, UpdateStatusDTO } from '../types/dto';
import { QuoteStatus } from '../types/models';
import { NotFoundError, ValidationError, ServiceUnavailableError } from '../utils/errors';

export const getAllQuotes = async () => {
  return await quoteRepo.findAllQuotes();
};

export const getQuoteById = async (id: number) => {
  const quote = await quoteRepo.findQuoteById(id);

  if (!quote) {
    throw new NotFoundError(`Quote with id ${id} not found`);
  }

  return quote;
};

export const createQuote = async (dto: CreateQuoteDTO) => {
  if (!dto.customer_name || !dto.insurance_type || !dto.coverage_amount) {
    throw new ValidationError('customer_name, insurance_type and coverage_amount are required');
  }

  if (typeof dto.coverage_amount !== 'number' || dto.coverage_amount <= 0) {
    throw new ValidationError('coverage_amount must be a positive number');
  }

  return await quoteRepo.createQuote(dto);
};

export const analyzeQuote = async (id: number) => {
  // Check quote exists
  const quote = await quoteRepo.findQuoteById(id);
  if (!quote) {
    throw new NotFoundError(`Quote with id ${id} not found`);
  }

  // Check if already analyzed
  const existing = await analysisRepo.findAnalysisByQuoteId(id);
  if (existing) {
    throw new ValidationError(`Quote ${id} has already been analyzed`);
  }

  // Call FastAPI
  try {
    const analysisResult = await analyzeDocument({
      quote_id: quote.id,
      customer_name: quote.customer_name,
      insurance_type: quote.insurance_type,
      coverage_amount: quote.coverage_amount
    });

    // Save result
    const analysis = await analysisRepo.createAnalysis(id, analysisResult);

    // Return combined quote + analysis
    return {
      ...quote,
      analysis
    };

  } catch (error) {
    if (error instanceof Error && error.message === 'FastAPI service unavailable') {
      throw new ServiceUnavailableError('Document analysis service is currently unavailable');
    }
    throw error;
  }
};

export const updateQuoteStatus = async (id: number, dto: UpdateStatusDTO) => {
  // Check quote exists
  const quote = await quoteRepo.findQuoteById(id);
  if (!quote) {
    throw new NotFoundError(`Quote with id ${id} not found`);
  }

  // Validate status value
  const validStatuses = Object.values(QuoteStatus);
  if (!validStatuses.includes(dto.status)) {
    throw new ValidationError(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  return await quoteRepo.updateQuoteStatus(id, dto.status);
};