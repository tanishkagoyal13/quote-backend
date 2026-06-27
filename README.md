# Quote Backend API

A REST API built with Node.js, TypeScript, and Express for managing insurance quote requests. Integrates with a FastAPI service for AI-powered document analysis.

## Tech Stack

- **Node.js** with **TypeScript**
- **Express.js** — web framework
- **Prisma ORM** — database access
- **PostgreSQL** — database
- **Zod** — request validation
- **Axios** — HTTP client for FastAPI integration
- **FastAPI** (Python) — external document analysis service

## Project Structure

```
quote-backend/
├── src/
│   ├── controllers/        # HTTP request handlers
│   ├── routes/             # Route definitions
│   ├── services/           # Business logic
│   ├── repositories/       # Database operations
│   ├── middleware/         # Error handler, logger, request ID
│   ├── utils/              # Prisma client, error classes, Zod schemas
│   └── types/              # TypeScript interfaces and DTOs
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
├── fastapi-service/
│   └── main.py             # FastAPI document analysis service
├── .env.example            # Environment variable template
└── README.md
```

## Prerequisites

- Node.js v18+
- PostgreSQL (local install or Docker)
- Python 3.8+
- pip

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/tanishkagoyal13/quote-backend.git
cd quote-backend
```

### 2. Install Node.js dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory based on `.env.example`:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/quote_db"
FASTAPI_URL="http://localhost:8000"
PORT=3000
```

Replace `USER` and `PASSWORD` with your PostgreSQL credentials.

> Note: If your password contains special characters (e.g. `@`), URL-encode them (e.g. `@` becomes `%40`).

### 4. Create the database

In your PostgreSQL shell or pgAdmin, run:

```sql
CREATE DATABASE quote_db;
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

This creates all required tables in your database.

### 6. Set up the FastAPI service

In a separate terminal:

```bash
cd fastapi-service
pip install fastapi uvicorn
python -m uvicorn main:app --reload --port 8000
```

FastAPI will run on `http://localhost:8000`

### 7. Start the Node.js server

In your main terminal:

```bash
npm run dev
```

Server runs on `http://localhost:3000`

> You need both servers running simultaneously for the analyze endpoint to work.

---

## API Endpoints

### Health Check

```
GET /health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-06-27T10:00:00.000Z"
}
```

---

### Create a Quote

```
POST /quotes
Content-Type: application/json
```

Request body:
```json
{
  "customer_name": "John Doe",
  "insurance_type": "Health",
  "coverage_amount": 250000
}
```

Response `201`:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "insurance_type": "Health",
    "coverage_amount": 250000,
    "status": "New",
    "created_at": "2026-06-27T10:00:00.000Z",
    "updated_at": "2026-06-27T10:00:00.000Z"
  }
}
```

---

### Get All Quotes

```
GET /quotes
```

Response `200`:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "insurance_type": "Health",
      "coverage_amount": 250000,
      "status": "In_Review",
      "created_at": "2026-06-27T10:00:00.000Z",
      "updated_at": "2026-06-27T10:05:00.000Z",
      "analysis": {
        "id": 1,
        "quote_id": 1,
        "risk_level": "Medium",
        "missing_items": ["proof_of_income", "medical_history"],
        "confidence": 0.85,
        "analyzed_at": "2026-06-27T10:02:00.000Z"
      }
    }
  ]
}
```

---

### Get Quote by ID

```
GET /quotes/:id
```

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "insurance_type": "Health",
    "coverage_amount": 250000,
    "status": "New",
    "created_at": "2026-06-27T10:00:00.000Z",
    "updated_at": "2026-06-27T10:00:00.000Z",
    "analysis": null
  }
}
```

---

### Analyze a Quote

```
POST /quotes/:id/analyze
```

No request body required.

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "insurance_type": "Health",
    "coverage_amount": 250000,
    "status": "New",
    "created_at": "2026-06-27T10:00:00.000Z",
    "updated_at": "2026-06-27T10:00:00.000Z",
    "analysis": {
      "id": 1,
      "quote_id": 1,
      "risk_level": "Medium",
      "missing_items": ["proof_of_income", "medical_history"],
      "confidence": 0.85,
      "analyzed_at": "2026-06-27T10:02:00.000Z"
    }
  }
}
```

---

### Update Quote Status

```
PATCH /quotes/:id/status
Content-Type: application/json
```

Request body:
```json
{
  "status": "In_Review"
}
```

Valid status values: `New`, `In_Review`, `Needs_Info`, `Completed`

Response `200`:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customer_name": "John Doe",
    "insurance_type": "Health",
    "coverage_amount": 250000,
    "status": "In_Review",
    "created_at": "2026-06-27T10:00:00.000Z",
    "updated_at": "2026-06-27T10:05:00.000Z"
  }
}
```

---

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "ErrorType",
  "message": "Human readable message"
}
```

| Status Code | Error Type | Cause |
|---|---|---|
| 400 | ValidationError | Missing or invalid request fields |
| 400 | ValidationError | Invalid status value |
| 400 | ValidationError | Quote already analyzed |
| 404 | NotFoundError | Quote ID does not exist |
| 503 | ServiceUnavailableError | FastAPI service is down |
| 500 | InternalServerError | Unexpected server error |

---

## Bonus Features

### Request Logging
Every request is logged to the console with method, path, status code, and response time:
```
[2026-06-27T10:00:00.000Z] POST /quotes 201 - 45ms
[2026-06-27T10:00:01.000Z] GET /quotes 200 - 12ms
```

### Request ID
Every request and response includes a unique `X-Request-ID` header for traceability:
```
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
```

---

## FastAPI Document Analysis Service

The FastAPI service runs separately and handles document risk analysis.

- Runs on: `http://localhost:8000`
- Interactive docs: `http://localhost:8000/docs`
- Health check: `http://localhost:8000/health`

### Request
```json
{
  "quote_id": 1,
  "customer_name": "John Doe",
  "insurance_type": "Health",
  "coverage_amount": 250000
}
```

### Response
```json
{
  "risk_level": "Medium",
  "missing_items": ["proof_of_income", "medical_history"],
  "confidence": 0.85
}
```

Risk levels are determined by coverage amount:
- `Low` — coverage below $100,000
- `Medium` — coverage between $100,000 and $500,000
- `High` — coverage above $500,000

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Run compiled production build |

---

## Database Schema

### QuoteRequest
| Field | Type | Description |
|---|---|---|
| id | Int | Auto-increment primary key |
| customer_name | String | Name of the customer |
| insurance_type | String | Type of insurance |
| coverage_amount | Float | Coverage amount in dollars |
| status | Enum | New, In_Review, Needs_Info, Completed |
| created_at | DateTime | Auto-set on creation |
| updated_at | DateTime | Auto-updated on every change |

### AnalysisResult
| Field | Type | Description |
|---|---|---|
| id | Int | Auto-increment primary key |
| quote_id | Int | Foreign key to QuoteRequest |
| risk_level | String | Low, Medium, or High |
| missing_items | Json | Array of missing document names |
| confidence | Float | Confidence score between 0 and 1 |
| analyzed_at | DateTime | Auto-set on creation |