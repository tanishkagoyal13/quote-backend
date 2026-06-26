import axios from 'axios';
import { AnalyzeRequest, AnalyzeResponse } from '../types/dto';

export const analyzeDocument = async (payload: AnalyzeRequest): Promise<AnalyzeResponse> => {
  const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

  try {
    const response = await axios.post<AnalyzeResponse>(
      `${FASTAPI_URL}/analyze`,
      payload,
      { timeout: 10000 }
    );
    return response.data;

  } catch (error) {
    throw new Error('FastAPI service unavailable');
  }
};