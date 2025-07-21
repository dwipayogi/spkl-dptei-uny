"use server";

import sql from "@/db/db";

export interface AssessmentResult {
  lab_id: number;
  lab_name: string;
  period_id: number;
  period_title: string;
  startDate: string;
  endDate: string;
  percentage: number;
  lastInspection: string;
  has_document: boolean;
}

export interface AssessmentDetailResult {
  id: number;
  code: string;
  question: string;
  answer: string;
}

export interface AssessmentNotes {
  notes: string | null;
  file_url: string | null;
}

// Get assessment results summary for a specific lab across all periods
export async function getLabAssessmentResults(
  labId: number
): Promise<AssessmentResult[]> {
  try {
    // Get periods with assessments for this lab
    const periods = await sql`
      SELECT DISTINCT
        p."id" as period_id,
        p."title" as period_title,
        p."startDate",
        p."endDate"
      FROM "AssessmentPeriod" p
      JOIN "AssessmentAnswer" aa ON p."id" = aa."period_id"
      WHERE aa."lab_id" = ${labId}
      AND ("answer"->>'isConsolidated')::boolean = true
      ORDER BY p."startDate" DESC
    `;

    // Get lab info
    const labInfo = await sql`
      SELECT 
        "id" as lab_id,
        "name" as lab_name,
        "lastInspection"
      FROM "Laboratory"
      WHERE "id" = ${labId}
    `;

    if (!labInfo || labInfo.length === 0) {
      return [];
    }

    // For each period, calculate the assessment percentage
    const results = await Promise.all(
      periods.map(async (period) => {
        // Get the consolidated answers for this lab and period
        const assessmentData = await sql`
          SELECT 
            answer
          FROM "AssessmentAnswer"
          WHERE lab_id = ${labId} 
            AND period_id = ${period.period_id}
            AND ("answer"->>'isConsolidated')::boolean = true
          LIMIT 1
        `;

        // Check if there's a document for this assessment
        const documentCheck = await sql`
          SELECT file_url 
          FROM "AssessmentAnswer" 
          WHERE lab_id = ${labId}
            AND period_id = ${period.period_id}
            AND file_url IS NOT NULL
            AND ("answer"->>'isConsolidated')::boolean = true
          LIMIT 1
        `;

        // Get total questions for calculation
        const questions = await sql`SELECT COUNT(*) as count FROM "Assessment"`;
        const totalQuestions = parseInt(questions[0].count);

        // Extract responses from the consolidated answer
        const responses = assessmentData[0]?.answer?.responses || [];

        // Calculate points using same formula as updateLabComplianceLevel
        let points = 0;
        for (const response of responses) {
          if (response.value === "Ya") {
            points += 1;
          } else if (response.value === "Sebagian") {
            points += 0.5;
          }
          // "Tidak" answers get 0 points
        }

        // Calculate percentage
        const percentage = Math.round((points / totalQuestions) * 100);

        // Check if document exists
        const hasDocument =
          documentCheck &&
          documentCheck.length > 0 &&
          documentCheck[0].file_url;

        return {
          lab_id: labInfo[0].lab_id,
          lab_name: labInfo[0].lab_name,
          period_id: period.period_id,
          period_title: period.period_title,
          startDate: period.startDate,
          endDate: period.endDate,
          percentage: percentage,
          lastInspection: labInfo[0].lastInspection,
          has_document: !!hasDocument,
        };
      })
    );

    return results;
  } catch (error) {
    console.error(`Error fetching assessment results for lab ${labId}:`, error);
    return [];
  }
}

// Get detailed assessment answers for a specific lab and period
export async function getLabAssessmentDetails(
  labId: number,
  periodId: number
): Promise<AssessmentDetailResult[]> {
  try {
    // Get all assessment questions
    const questions = await sql`
      SELECT 
        "id",
        "code",
        "question"
      FROM "Assessment"
      ORDER BY "code" ASC
    `;

    // Get consolidated answers for this lab and period
    const consolidatedData = await sql`
      SELECT 
        answer
      FROM "AssessmentAnswer"
      WHERE "lab_id" = ${labId} 
        AND "period_id" = ${periodId}
        AND ("answer"->>'isConsolidated')::boolean = true
      LIMIT 1
    `;

    if (!consolidatedData || consolidatedData.length === 0) {
      return [];
    }

    const responses = consolidatedData[0].answer.responses || [];

    // Map questions to answers
    return questions.map((question) => {
      const response = responses.find((r: any) => r.questionId === question.id);
      return {
        id: question.id,
        code: question.code,
        question: question.question,
        answer: response?.value || "Tidak Dijawab",
      };
    });
  } catch (error) {
    console.error(
      `Error fetching assessment details for lab ${labId} and period ${periodId}:`,
      error
    );
    return [];
  }
}

// Get assessment notes for a specific lab and period
export async function getLabAssessmentNotes(
  labId: number,
  periodId: number
): Promise<AssessmentNotes> {
  try {
    const results = await sql`
      SELECT 
        "notes",
        "file_url"
      FROM "AssessmentAnswer"
      WHERE "lab_id" = ${labId} 
        AND "period_id" = ${periodId}
        AND ("answer"->>'isConsolidated')::boolean = true
      LIMIT 1
    `;

    if (results && results.length > 0) {
      return results[0] as AssessmentNotes;
    }

    return {
      notes: null,
      file_url: null,
    };
  } catch (error) {
    console.error(
      `Error fetching assessment notes for lab ${labId} and period ${periodId}:`,
      error
    );
    return {
      notes: null,
      file_url: null,
    };
  }
}
