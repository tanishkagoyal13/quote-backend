from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import random

app = FastAPI()

class AnalyzeRequest(BaseModel):
    quote_id: int
    customer_name: str
    insurance_type: str
    coverage_amount: float

class AnalyzeResponse(BaseModel):
    risk_level: str
    missing_items: List[str]
    confidence: float

@app.post("/analyze", response_model=AnalyzeResponse)
def analyze(request: AnalyzeRequest):
    is_high = request.coverage_amount > 500000
    is_medium = request.coverage_amount > 100000

    risk_level = "High" if is_high else "Medium" if is_medium else "Low"

    all_items = [
        "proof_of_income",
        "previous_insurance_records",
        "medical_history",
        "property_documents",
        "identity_verification"
    ]

    missing_items = random.sample(all_items, random.randint(0, 3))
    confidence = round(random.uniform(0.70, 0.95), 2)

    return AnalyzeResponse(
        risk_level=risk_level,
        missing_items=missing_items,
        confidence=confidence
    )

@app.get("/health")
def health():
    return {"status": "ok"}