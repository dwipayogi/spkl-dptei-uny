"use server";

import sql from "@/db/db";
import { revalidatePath } from "next/cache";

export interface Laboratory {
  id: number;
  name: string;
  person: string;
  percentage: number;
  lastInspection?: string;
  createdAt: string;
  updatedAt: string;
}

export type LaboratoryFormData = {
  name: string;
  person: string;
  percentage: number;
  lastInspection: string;
};

export async function getLaboratories(): Promise<Laboratory[]> {
  try {
    const result = await sql`
      SELECT * FROM "Laboratory" 
      ORDER BY "name" ASC
    `;

    return result as Laboratory[];
  } catch (error) {
    console.error("Error fetching laboratories:", error);
    return [];
  }
}

export async function getLaboratory(id: number): Promise<Laboratory | null> {
  try {
    const result = await sql`
      SELECT * FROM "Laboratory" 
      WHERE "id" = ${id}
    `;

    if (result && result.length > 0) {
      return result[0] as Laboratory;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching laboratory with id ${id}:`, error);
    return null;
  }
}

export async function createLaboratory(
  data: LaboratoryFormData
): Promise<{ success: boolean; id?: number; error?: string }> {
  try {
    const now = new Date().toISOString();

    const result = await sql`
      INSERT INTO "Laboratory" (
        "name", 
        "person", 
        "percentage", 
        "createdAt", 
        "updatedAt"
      )
      VALUES (
        ${data.name}, 
        ${data.person}, 
        ${data.percentage},
        ${now}, 
        ${now}
      )
      RETURNING "id"
    `;

    if (result && result.length > 0) {
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/laboratorium");
      revalidatePath("/dashboard/asesmen");
      return { success: true, id: result[0].id };
    }

    return { success: false, error: "Failed to create laboratory" };
  } catch (error) {
    console.error("Error creating laboratory:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function updateLaboratory(
  id: number,
  data: LaboratoryFormData
): Promise<{ success: boolean; error?: string }> {
  try {
    const now = new Date().toISOString();

    await sql`
      UPDATE "Laboratory"
      SET 
        "name" = ${data.name},
        "person" = ${data.person},
        "percentage" = ${data.percentage},
        "lastInspection" = ${data.lastInspection},
        "updatedAt" = ${now}
      WHERE "id" = ${id}
    `;

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/laboratorium");
    revalidatePath("/dashboard/asesmen");
    return { success: true };
  } catch (error) {
    console.error(`Error updating laboratory with id ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function deleteLaboratory(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await sql`
      DELETE FROM "Laboratory"
      WHERE "id" = ${id}
    `;

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/laboratorium");
    revalidatePath("/dashboard/asesmen");
    return { success: true };
  } catch (error) {
    console.error(`Error deleting laboratory with id ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
