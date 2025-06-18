"use server";

import sql from "@/db/db";
import {
  DocumentMetadata,
  ParsedDocument,
  parseDocument,
} from "@/lib/blob-config";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";

// Function to get all documents
export async function getDocuments(): Promise<ParsedDocument[]> {
  try {
    const documents = await sql`
      SELECT * FROM "Document" ORDER BY "createdAt" DESC`;

    return documents.map((doc: any) => parseDocument(doc));
  } catch (error) {
    console.error("Error fetching documents:", error);
    return [];
  }
}

// Function to get a document by ID
export async function getDocument(id: number): Promise<ParsedDocument | null> {
  try {
    const result = await sql`
      SELECT * FROM "Document" WHERE id = ${id}`;

    if (result.length === 0) {
      return null;
    }

    return parseDocument(result[0]);
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
}

// Function to delete a document
export async function deleteDocument(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get document details to delete the blob
    const document = await sql`
      SELECT * FROM "Document" WHERE id = ${id}`;

    if (document.length === 0) {
      return { success: false, error: "Document not found" };
    }

    // Delete from database
    await sql`DELETE FROM "Document" WHERE id = ${id}`;

    // Delete from Vercel Blob
    const blobUrl = document[0].url;
    await del(blobUrl);

    revalidatePath("/dashboard/dokumen");
    return { success: true };
  } catch (error) {
    console.error("Error deleting document:", error);
    return { success: false, error: "Failed to delete document" };
  }
}
