"use server";

import { put } from "@vercel/blob";
import sql from "@/db/db";
import { DocumentMetadata, DocumentUploadResponse } from "@/lib/blob-config";

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

export async function uploadDocument(
  data: DocumentFormData
): Promise<DocumentUploadResponse> {
  try {
    // Upload file to Vercel Blob
    const blob = await put(data.file.name, data.file, {
      access: "public",
    });

    const now = new Date().toISOString();

    // Save document metadata to database
    const result = await sql`
      INSERT INTO "Document" (
        "title", 
        "description", 
        "category", 
        "url",
        "filename",
        "fileType",
        "fileSize",
        "uploadedBy",
        "createdAt", 
        "updatedAt"
      )
      VALUES (
        ${data.title}, 
        ${data.description}, 
        ${data.category},
        ${blob.url},
        ${data.file.name},
        ${data.file.type},
        ${data.file.size},
        ${"System"}, 
        ${now}, 
        ${now}
      )
      RETURNING *
    `;

    if (result && result.length > 0) {
      return {
        success: true,
        document: {
          id: result[0].id,
          title: result[0].title,
          description: result[0].description,
          category: result[0].category,
          url: result[0].url,
          filename: result[0].filename,
          fileType: result[0].fileType,
          fileSize: result[0].fileSize,
          uploadedBy: result[0].uploadedBy,
          createdAt: result[0].createdAt,
          updatedAt: result[0].updatedAt,
        },
      };
    }

    return { success: false, error: "Failed to save document to database" };
  } catch (error) {
    console.error("Error uploading document:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
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

    return { success: true };
  } catch (error) {
    console.error(`Error deleting document with id ${id}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
