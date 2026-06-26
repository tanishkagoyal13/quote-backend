import prisma from '../utils/db';
import { AnalyzeResponse } from '../types/dto';

export const createAnalysis = async (quote_id: number, data: AnalyzeResponse) => {
  return await prisma.analysisResult.create({
    data: {
      quote_id,
      risk_level: data.risk_level,
      missing_items: data.missing_items,
      confidence: data.confidence
    }
  });
};

export const findAnalysisByQuoteId = async (quote_id: number) => {
  return await prisma.analysisResult.findUnique({
    where: { quote_id }
  });
};