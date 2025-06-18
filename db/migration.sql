-- Migration script for creating the database schema

-- Create Laboratory table
CREATE TABLE "Laboratory" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "person" VARCHAR NOT NULL,
  "percentage" INTEGER NOT NULL,
  "lastInspection" TIMESTAMP,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create Assessment table
CREATE TABLE "Assessment" (
  "id" SERIAL PRIMARY KEY,
  "code" VARCHAR NOT NULL UNIQUE,
  "question" VARCHAR NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create AssessmentPeriod table (needs to be created before AssessmentAnswer due to foreign key reference)
CREATE TABLE "AssessmentPeriod" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create AssessmentAnswer table
CREATE TABLE "AssessmentAnswer" (
  "id" SERIAL PRIMARY KEY,
  "lab_id" INTEGER NOT NULL,
  "ass_id" INTEGER NOT NULL,
  "period_id" INTEGER NOT NULL,
  "answer" JSONB NOT NULL,
  "notes" VARCHAR,
  "file_url" VARCHAR,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL,
  FOREIGN KEY ("lab_id") REFERENCES "Laboratory" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("ass_id") REFERENCES "Assessment" ("id") ON DELETE CASCADE,
  FOREIGN KEY ("period_id") REFERENCES "AssessmentPeriod" ("id") ON DELETE CASCADE
);

-- Create Document table
CREATE TABLE "Document" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR NOT NULL,
  "description" VARCHAR,
  "category" VARCHAR NOT NULL,
  "url" VARCHAR NOT NULL,
  "filename" VARCHAR NOT NULL,
  "fileType" VARCHAR NOT NULL,
  "fileSize" INTEGER NOT NULL,
  "uploadedBy" VARCHAR NOT NULL DEFAULT 'Admin',
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP NOT NULL
);

-- Create indexes
CREATE INDEX "laboratory_name_idx" ON "Laboratory" ("name");
CREATE INDEX "assessment_code_idx" ON "Assessment" ("code");
CREATE INDEX "assessment_answer_lab_id_idx" ON "AssessmentAnswer" ("lab_id");
CREATE INDEX "assessment_answer_ass_id_idx" ON "AssessmentAnswer" ("ass_id");
CREATE INDEX "assessment_answer_period_id_idx" ON "AssessmentAnswer" ("period_id");
CREATE INDEX "assessment_period_date_range_idx" ON "AssessmentPeriod" ("startDate", "endDate");
CREATE INDEX "document_title_idx" ON "Document" ("title");
CREATE INDEX "document_category_idx" ON "Document" ("category");