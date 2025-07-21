"use server";

import sql from "@/db/db";
import { revalidatePath } from "next/cache";

export interface AssessmentQuestion {
  id: number;
  code: string;
  question: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssessmentAnswer {
  id?: number;
  lab_id: number;
  ass_id: number;
  period_id: number;
  answer: {
    value: string;
    notes?: string;
    file_url?: string;
  };
  notes?: string;
  file_url?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AssessmentFormData {
  labId: number;
  periodId: number;
  answers: {
    questionId: number;
    value: string; // "Ya", "Sebagian", "Tidak"
  }[];
  notes: string;
  fileUrl?: string;
}

// Get all assessment questions
export async function getAssessmentQuestions(): Promise<AssessmentQuestion[]> {
  try {
    const results = await sql`
      SELECT * FROM "Assessment"
      ORDER BY "code" ASC
    `;

    return results as AssessmentQuestion[];
  } catch (error) {
    console.error("Error fetching assessment questions:", error);
    return [];
  }
}

// Get assessment questions by lab and period
export async function getAssessmentAnswersByLabAndPeriod(
  labId: number,
  periodId: number
): Promise<AssessmentAnswer[]> {
  try {
    const results = await sql`
      SELECT * FROM "AssessmentAnswer"
      WHERE "lab_id" = ${labId} AND "period_id" = ${periodId}
      ORDER BY "ass_id" ASC
    `;

    return results as AssessmentAnswer[];
  } catch (error) {
    console.error(
      `Error fetching assessment answers for lab ${labId} and period ${periodId}:`,
      error
    );
    return [];
  }
}

// Save assessment answers for a lab
export async function saveAssessmentAnswers(
  data: AssessmentFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const now = new Date().toISOString();
    const { labId, periodId, answers, notes, fileUrl } = data;

    // Begin a transaction
    await sql`BEGIN`;

    try {
      // Get the first assessment ID to use as our anchor for consolidated data
      const firstAssessment = await sql`SELECT MIN(id) as id FROM "Assessment" LIMIT 1`;
      if (!firstAssessment || !firstAssessment[0] || !firstAssessment[0].id) {
        throw new Error("No assessment questions found");
      }

      const anchorAssessmentId = firstAssessment[0].id;

      // Create a consolidated JSON structure for all answers
      const consolidatedAnswers = {
        isConsolidated: true, // Special marker indicating this is consolidated data
        responses: answers.map((answer) => ({
          questionId: answer.questionId,
          value: answer.value,
        })),
        updatedAt: now,
      };

      // Check if a consolidated record already exists
      const existingRecord = await sql`
        SELECT "id" FROM "AssessmentAnswer" 
        WHERE "lab_id" = ${labId} 
        AND "period_id" = ${periodId} 
        AND "ass_id" = ${anchorAssessmentId}
        AND ("answer"->>'isConsolidated')::boolean = true
      `;

      if (existingRecord.length > 0) {
        // Update existing record
        await sql`
          UPDATE "AssessmentAnswer" SET
            "answer" = ${JSON.stringify(consolidatedAnswers)},
            "notes" = ${notes},
            "file_url" = ${fileUrl || null},
            "updatedAt" = ${now}
          WHERE "id" = ${existingRecord[0].id}
        `;
      } else {
        // Insert new record
        await sql`
          INSERT INTO "AssessmentAnswer" (
            "lab_id",
            "period_id",
            "ass_id",
            "answer",
            "notes",
            "file_url",
            "createdAt",
            "updatedAt"
          )
          VALUES (
            ${labId},
            ${periodId},
            ${anchorAssessmentId},
            ${JSON.stringify(consolidatedAnswers)},
            ${notes},
            ${fileUrl || null},
            ${now},
            ${now}
          )
        `;
      }

      // Update the lab compliance level
      const updateResult = await updateLabComplianceLevel(labId, periodId);
      if (!updateResult.success) {
        throw new Error(updateResult.error || "Failed to update compliance level");
      }

      // Commit the transaction
      await sql`COMMIT`;

      // Revalidate paths
      revalidatePath("/dashboard/asesmen");
      revalidatePath("/dashboard/laboratorium");
      revalidatePath("/dashboard/asesmen/view");

      return { success: true };
    } catch (error) {
      await sql`ROLLBACK`;
      throw error;
    }
  } catch (error) {
    console.error("Error saving assessment answers:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

// Get laboratory details by ID
export async function getLaboratory(id: number) {
  try {
    const result = await sql`
      SELECT * FROM "Laboratory" 
      WHERE "id" = ${id}
    `;

    if (result && result.length > 0) {
      return result[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching laboratory with id ${id}:`, error);
    return null;
  }
}

// Get assessment period details by ID
export async function getAssessmentPeriod(id: number) {
  try {
    const result = await sql`
      SELECT * FROM "AssessmentPeriod" 
      WHERE "id" = ${id}
    `;

    if (result && result.length > 0) {
      return result[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching assessment period with id ${id}:`, error);
    return null;
  }
}

// Populate assessment table if it's empty (initialization function)
export async function initializeAssessmentQuestions(
  questions: { code: string; question: string }[]
) {
  try {
    // Check if assessment table is empty
    const existing = await sql`SELECT COUNT(*) FROM "Assessment"`;

    if (existing[0].count === "0") {
      const now = new Date().toISOString();

      // Insert all questions
      for (const q of questions) {
        await sql`
          INSERT INTO "Assessment" ("code", "question", "createdAt", "updatedAt")
          VALUES (${q.code}, ${q.question}, ${now}, ${now})
        `;
      }
      return { success: true };
    }

    return {
      success: true,
      message: "Assessment questions already initialized",
    };
  } catch (error) {
    console.error("Error initializing assessment questions:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

/**
 * Calculates and updates the laboratory compliance level based on assessment answers
 * - Ya (Yes) = 1 point
 * - Sebagian (Partially) = 0.5 points
 * - Tidak (No) = 0 points
 * - Total compliance level is calculated as a percentage out of 100
 */
export async function updateLabComplianceLevel(
  labId: number,
  periodId: number
): Promise<{ success: boolean; percentage?: number; error?: string }> {
  try {
    const now = new Date().toISOString();
    await sql`BEGIN`;

    try {
      const questions = await sql`SELECT COUNT(*) as count FROM "Assessment"`;
      const totalQuestions = parseInt(questions[0].count);

      if (totalQuestions === 0) {
        await sql`ROLLBACK`;
        return { success: false, error: "No assessment questions found" };
      }

      // Get the consolidated answers
      const answersResult = await sql`
        SELECT "answer" 
        FROM "AssessmentAnswer" 
        WHERE "lab_id" = ${labId} 
          AND "period_id" = ${periodId}
          AND ("answer"->>'isConsolidated')::boolean = true
        LIMIT 1
      `;

      if (!answersResult || answersResult.length === 0) {
        await sql`ROLLBACK`;
        return { success: false, error: "No assessment answers found" };
      }

      const consolidatedAnswers = answersResult[0].answer;
      const responses = consolidatedAnswers.responses || [];

      // Calculate compliance level
      let points = 0;
      for (const response of responses) {
        if (response.value === "Ya") {
          points += 1;
        } else if (response.value === "Sebagian") {
          points += 0.5;
        }
      }

      // Calculate percentage
      const percentage = Math.round((points / totalQuestions) * 100);

      // Update the laboratory table
      await sql`
        UPDATE "Laboratory"
        SET 
          "percentage" = ${percentage},
          "lastInspection" = ${now},
          "updatedAt" = ${now}
        WHERE "id" = ${labId}
      `;

      await sql`COMMIT`;

      // Revalidate paths
      revalidatePath("/dashboard/asesmen");
      revalidatePath("/dashboard/laboratorium");
      revalidatePath("/dashboard/asesmen/view");
      revalidatePath(`/dashboard/asesmen/view?labId=${labId}`);
      revalidatePath(`/dashboard/asesmen/view/detail`);
      revalidatePath(
        `/dashboard/asesmen/view/detail?labId=${labId}&periodId=${periodId}`
      );

      return { success: true, percentage };
    } catch (error) {
      await sql`ROLLBACK`;
      throw error;
    }
  } catch (error) {
    console.error(`Error updating compliance level for lab ${labId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
