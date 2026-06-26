import prisma from '../utils/db';
import { CreateQuoteDTO } from '../types/dto';
import { QuoteStatus } from '../types/models';

export const findAllQuotes = async () => {
  return await prisma.quoteRequest.findMany({
    include: { analysis: true },
    orderBy: { created_at: 'desc' }
  });
};

export const findQuoteById = async (id: number) => {
  return await prisma.quoteRequest.findUnique({
    where: { id },
    include: { analysis: true }
  });
};

export const createQuote = async (dto: CreateQuoteDTO) => {
  return await prisma.quoteRequest.create({
    data: {
      customer_name: dto.customer_name,
      insurance_type: dto.insurance_type,
      coverage_amount: dto.coverage_amount
    }
  });
};

export const updateQuoteStatus = async (id: number, status: QuoteStatus) => {
  return await prisma.quoteRequest.update({
    where: { id },
    data: { status }
  });
};