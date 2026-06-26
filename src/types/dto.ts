import { QuoteStatus } from './models';

// POST /quotes - request body
export interface CreateQuoteDTO {
  customer_name: string;
  insurance_type: string;
  coverage_amount: number;
}

// PATCH /quotes/:id/status - request body
export interface UpdateStatusDTO {
  status: QuoteStatus;
}

// FastAPI outgoing request
export interface AnalyzeRequest {
  quote_id: number;
  customer_name: string;
  insurance_type: string;
  coverage_amount: number;
}

// FastAPI incoming response
export interface AnalyzeResponse {
  risk_level: string;
  missing_items: string[];
  confidence: number;
}

// Standard API success response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// Standard API error response
export interface ApiError {
  success: boolean;
  error: string;
  message: string;
}