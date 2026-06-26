-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('New', 'In_Review', 'Needs_Info', 'Completed');

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" SERIAL NOT NULL,
    "customer_name" TEXT NOT NULL,
    "insurance_type" TEXT NOT NULL,
    "coverage_amount" DOUBLE PRECISION NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'New',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalysisResult" (
    "id" SERIAL NOT NULL,
    "quote_id" INTEGER NOT NULL,
    "risk_level" TEXT NOT NULL,
    "missing_items" JSONB NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "analyzed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalysisResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisResult_quote_id_key" ON "AnalysisResult"("quote_id");

-- AddForeignKey
ALTER TABLE "AnalysisResult" ADD CONSTRAINT "AnalysisResult_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "QuoteRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
