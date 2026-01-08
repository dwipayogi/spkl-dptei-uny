"use server";

import sql from "@/db/db";
import { revalidatePath } from "next/cache";

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
    // Fetch all data in parallel for better performance
    const [labs, questionsResult, assessmentAnswers] = await Promise.all([
      // Get all labs
      sql`
        SELECT 
          id as "labId", 
          name as "labName"
        FROM "Laboratory"
        ORDER BY name ASC
      `,
      // Get total questions count
      sql`SELECT COUNT(*) as count FROM "Assessment"`,
      // Get all consolidated assessments for this period at once
      sql`
        SELECT 
          lab_id as "labId",
          answer
        FROM "AssessmentAnswer"
        WHERE period_id = ${periodId}
          AND ("answer"->>'isConsolidated')::boolean = true
      `
    ]);

    const totalQuestions = parseInt(questionsResult[0].count);

    // Create a map for O(1) lookup of assessments by lab ID
    const assessmentMap = new Map<number, { responses: Array<{ value: string }> }>();
    for (const assessment of assessmentAnswers) {
      assessmentMap.set(assessment.labId, assessment.answer);
    }

    // Map labs to their assessment data without additional queries
    const labsWithAssessments: AssessmentWithLab[] = labs.map((lab) => {
      const assessment = assessmentMap.get(lab.labId);
      let percentage: number | null = null;

      if (assessment) {
        const responses = assessment.responses || [];
        let points = 0;
        for (const response of responses) {
          if (response.value === "Ya") {
            points += 1;
          } else if (response.value === "Sebagian") {
            points += 0.5;
          }
        }
        percentage = totalQuestions > 0 ? Math.round((points / totalQuestions) * 100) : 0;
      }

      return {
        labId: lab.labId,
        labName: lab.labName,
        percentage,
        periodId,
      };
    });

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
      revalidatePath("/dashboard/asesmen");
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
