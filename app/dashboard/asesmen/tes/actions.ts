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
      // Process each answer
      for (const answer of answers) {
        // Check if an answer already exists
        const existingAnswer = await sql`
          SELECT "id" FROM "AssessmentAnswer"
          WHERE "lab_id" = ${labId} 
            AND "period_id" = ${periodId} 
            AND "ass_id" = ${answer.questionId}
        `;

        if (existingAnswer && existingAnswer.length > 0) {
          // Update existing answer
          await sql`
            UPDATE "AssessmentAnswer"
            SET 
              "answer" = ${JSON.stringify({ value: answer.value })},
              "updatedAt" = ${now}
            WHERE "id" = ${existingAnswer[0].id}
          `;
        } else {
          // Insert new answer
          await sql`
            INSERT INTO "AssessmentAnswer" (
              "lab_id",
              "ass_id",
              "period_id",
              "answer",
              "createdAt",
              "updatedAt"
            )
            VALUES (
              ${labId},
              ${answer.questionId},
              ${periodId},
              ${JSON.stringify({ value: answer.value })},
              ${now},
              ${now}
            )
          `;
        }
      }

      // Store general notes and file URL
      // First check if notes entry exists (using a dummy questionId of 0)
      const existingNotes = await sql`
        SELECT "id" FROM "AssessmentAnswer"
        WHERE "lab_id" = ${labId} 
          AND "period_id" = ${periodId} 
          AND "notes" IS NOT NULL
      `;

      if (existingNotes && existingNotes.length > 0) {
        // Update existing notes and file URL
        await sql`
          UPDATE "AssessmentAnswer"
          SET 
            "notes" = ${notes},
            "file_url" = ${fileUrl || null},
            "updatedAt" = ${now}
          WHERE "id" = ${existingNotes[0].id}
        `;
      } else if (notes || fileUrl) {
        // Get any assessment id as a reference
        const assessments = await sql`
          SELECT "id" FROM "Assessment"
          LIMIT 1
        `;

        if (assessments && assessments.length > 0) {
          // Use the first assessment ID as a reference
          const assId = assessments[0].id;

          // Insert notes as a special entry
          await sql`
            INSERT INTO "AssessmentAnswer" (
              "lab_id",
              "ass_id",
              "period_id",
              "answer",
              "notes",
              "file_url",
              "createdAt",
              "updatedAt"
            )
            VALUES (
              ${labId},
              ${assId},
              ${periodId},
              ${JSON.stringify({ value: "notes" })},
              ${notes},
              ${fileUrl || null},
              ${now},
              ${now}
            )
          `;
        }
      } // Update the lab compliance level using the dedicated function
      const updateResult = await updateLabComplianceLevel(labId, periodId);

      if (!updateResult.success) {
        throw new Error(
          updateResult.error || "Failed to update compliance level"
        );
      }

      // Commit the transaction
      await sql`COMMIT`;

      // Revalidate the asesmen page path to show updated data
      revalidatePath("/dashboard/asesmen");

      return { success: true };
    } catch (error) {
      // Rollback in case of any error
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

    // Begin a transaction
    await sql`BEGIN`;

    try {
      // Get all assessment questions to know the total possible points
      const questions = await sql`SELECT COUNT(*) as count FROM "Assessment"`;
      const totalQuestions = parseInt(questions[0].count);

      if (totalQuestions === 0) {
        await sql`ROLLBACK`;
        return {
          success: false,
          error: "No assessment questions found",
        };
      }

      // Get all answers for this lab and period
      const answers = await sql`
        SELECT 
          a."answer"->>'value' as value
        FROM "AssessmentAnswer" a
        WHERE a."lab_id" = ${labId} 
          AND a."period_id" = ${periodId}
          AND a."answer"->>'value' != 'notes'
      `;

      // Calculate compliance level
      let points = 0;

      for (const answer of answers) {
        if (answer.value === "Ya") {
          points += 1;
        } else if (answer.value === "Sebagian") {
          points += 0.5;
        }
        // "Tidak" answers get 0 points
      }

      // Calculate percentage (rounded to nearest integer)
      const percentage = Math.round((points / totalQuestions) * 100);

      // Update the laboratory table with the new percentage and lastInspection date
      await sql`
        UPDATE "Laboratory"
        SET 
          "percentage" = ${percentage},
          "lastInspection" = ${now},
          "updatedAt" = ${now}
        WHERE "id" = ${labId}
      `;

      // Commit the transaction
      await sql`COMMIT`; // Revalidate related paths to show updated data
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
      // Rollback in case of any error
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
