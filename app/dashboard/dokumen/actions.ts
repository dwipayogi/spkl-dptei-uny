"use server";

import sql from "@/db/db";
import { revalidatePath } from "next/cache";

export interface Document {
  id: number;
  title: string;
  description: string;
  category: string;
  url: string;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export type DocumentFormData = {
  title: string;
  description: string;
  category: string;
  file: File;
};

export async function getDocuments(): Promise<Document[]> {
  try {
    const result = await sql`
      SELECT * FROM "Document" 
      ORDER BY "createdAt" DESC
    `;

    return result as Document[];
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

export async function getDocument(id: number): Promise<Document | null> {
  try {
    const result = await sql`
      SELECT * FROM "Document" 
      WHERE "id" = ${id}
    `;

    if (result && result.length > 0) {
      return result[0] as Document;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document with id ${id}:`, error);
    return null;
  }
}

export async function deleteDocument(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await sql`
      DELETE FROM "Document"
      WHERE "id" = ${id}
    `;

    revalidatePath("/dashboard/dokumen");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error(`Error deleting document with id ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
