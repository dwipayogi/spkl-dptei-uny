"use server";

import sql from "@/db/db";

export interface AssessmentPeriod {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentWithLab {
  labId: number;
  labName: string;
  percentage: number | null;
  periodId: number;
}

export type AssessmentPeriodFormData = {
  title: string;
  startDate: string;
  endDate: string;
};

export async function getAssessmentPeriods(): Promise<AssessmentPeriod[]> {
  try {
    const result = await sql`
      SELECT * FROM "AssessmentPeriod" 
      ORDER BY "startDate" DESC
    `;

    return result as AssessmentPeriod[];
  } catch (error) {
    console.error("Error fetching assessment periods:", error);
    return [];
  }
}

export async function getAssessmentsByPeriod(
  periodId: number
): Promise<AssessmentWithLab[]> {
  try {
    // Get all labs
    const labs = await sql`
      SELECT 
        id as "labId", 
        name as "labName"
      FROM "Laboratory"
      ORDER BY name ASC
    `;

    // For each lab, fetch its assessment data for the specified period
    const labsWithAssessments = await Promise.all(
      labs.map(async (lab) => {
        // Check if assessment exists for this lab and period
        const assessmentAnswers = await sql`
          SELECT 
            ass_id,
            answer->>'value' as answer_value
          FROM "AssessmentAnswer"
          WHERE lab_id = ${lab.labId} 
            AND period_id = ${periodId}
            AND answer->>'value' != 'notes'
        `;

        // Calculate percentage if assessments exist
        let percentage = null;
        if (assessmentAnswers.length > 0) {
          // Get total questions for calculation
          const questions =
            await sql`SELECT COUNT(*) as count FROM "Assessment"`;
          const totalQuestions = parseInt(questions[0].count);

          // Calculate points using same formula as updateLabComplianceLevel
          let points = 0;
          for (const answer of assessmentAnswers) {
            if (answer.answer_value === "Ya") {
              points += 1;
            } else if (answer.answer_value === "Sebagian") {
              points += 0.5;
            }
            // "Tidak" answers get 0 points
          }

          // Calculate percentage
          percentage = Math.round((points / totalQuestions) * 100);
        }

        return {
          labId: lab.labId,
          labName: lab.labName,
          percentage,
          periodId,
        };
      })
    );

    return labsWithAssessments;
  } catch (error) {
    console.error(`Error fetching assessments for period ${periodId}:`, error);
    return [];
  }
}

export async function createAssessmentPeriod(
  data: AssessmentPeriodFormData
): Promise<{ success: boolean; id?: number; error?: string }> {
  try {
    const now = new Date().toISOString();

    const result = await sql`
      INSERT INTO "AssessmentPeriod" (
        "title", 
        "startDate", 
        "endDate", 
        "createdAt", 
        "updatedAt"
      )
      VALUES (
        ${data.title}, 
        ${data.startDate}, 
        ${data.endDate},
        ${now}, 
        ${now}
      )
      RETURNING "id"
    `;

    if (result && result.length > 0) {
      return { success: true, id: result[0].id };
    }

    return { success: false, error: "Failed to create assessment period" };
  } catch (error) {
    console.error("Error creating assessment period:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
