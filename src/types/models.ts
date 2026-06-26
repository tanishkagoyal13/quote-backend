export enum QuoteStatus {
  New = 'New',
  In_Review = 'In_Review',
  Needs_Info = 'Needs_Info',
  Completed = 'Completed'
}

export interface QuoteRequest {
  id: number;
  customer_name: string;
  insurance_type: string;
  coverage_amount: number;
  status: QuoteStatus;
  created_at: Date;
  updated_at: Date;
  analysis?: AnalysisResult;
}

export interface AnalysisResult {
  id: number;
  quote_id: number;
  risk_level: string;
  missing_items: string[];
  confidence: number;
  analyzed_at: Date;
}