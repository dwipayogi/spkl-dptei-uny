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
    // Use a single optimized query to get all necessary data at once
    const [labInfo, totalQuestionsResult, assessmentDataResults] = await Promise.all([
      // Get lab info
      sql`
        SELECT 
          "id" as lab_id,
          "name" as lab_name,
          "lastInspection"
        FROM "Laboratory"
        WHERE "id" = ${labId}
      `,
      // Get total questions count
      sql`SELECT COUNT(*) as count FROM "Assessment"`,
      // Get all assessment data with period info in one query
      sql`
        SELECT 
          p."id" as period_id,
          p."title" as period_title,
          p."startDate",
          p."endDate",
          aa."answer",
          aa."file_url"
        FROM "AssessmentPeriod" p
        JOIN "AssessmentAnswer" aa ON p."id" = aa."period_id"
        WHERE aa."lab_id" = ${labId}
        AND ("answer"->>'isConsolidated')::boolean = true
        ORDER BY p."startDate" DESC
      `
    ]);

    if (!labInfo || labInfo.length === 0) {
      return [];
    }

    const totalQuestions = parseInt(totalQuestionsResult[0].count);
    const lab = labInfo[0];

    // Process all assessment data without additional queries
    const results: AssessmentResult[] = assessmentDataResults.map((assessment) => {
      const responses = assessment.answer?.responses || [];

      // Calculate points
      let points = 0;
      for (const response of responses) {
        if (response.value === "Ya") {
          points += 1;
        } else if (response.value === "Sebagian") {
          points += 0.5;
        }
      }

      const percentage = totalQuestions > 0 ? Math.round((points / totalQuestions) * 100) : 0;

      return {
        lab_id: lab.lab_id,
        lab_name: lab.lab_name,
        period_id: assessment.period_id,
        period_title: assessment.period_title,
        startDate: assessment.startDate,
        endDate: assessment.endDate,
        percentage,
        lastInspection: lab.lastInspection,
        has_document: !!assessment.file_url,
      };
    });

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
    // Fetch questions and consolidated data in parallel
    const [questions, consolidatedData] = await Promise.all([
      sql`
        SELECT 
          "id",
          "code",
          "question"
        FROM "Assessment"
        ORDER BY "code" ASC
      `,
      sql`
        SELECT 
          answer
        FROM "AssessmentAnswer"
        WHERE "lab_id" = ${labId} 
          AND "period_id" = ${periodId}
          AND ("answer"->>'isConsolidated')::boolean = true
        LIMIT 1
      `
    ]);

    if (!consolidatedData || consolidatedData.length === 0) {
      return [];
    }

    const responses = consolidatedData[0].answer.responses || [];

    // Create a map for O(1) lookup instead of O(n) find
    const responseMap = new Map<number, string>();
    for (const response of responses) {
      responseMap.set(response.questionId, response.value);
    }

    // Map questions to answers
    return questions.map((question) => ({
      id: question.id,
      code: question.code,
      question: question.question,
      answer: responseMap.get(question.id) || "Tidak Dijawab",
    }));
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
