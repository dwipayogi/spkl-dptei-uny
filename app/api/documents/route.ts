import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { DocumentMetadata } from "@/lib/blob-config";
import sql from "@/db/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!file || !title || !category) {
      return NextResponse.json(
        { error: "File, title, and category are required" },
        { status: 400 }
      );
    }

    // Upload file to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    });

    // Get file size and type
    const fileSize = file.size;
    const fileType = file.name.split(".").pop()?.toUpperCase() || "UNKNOWN";

    // Save document metadata to database
    const result = await sql`
      INSERT INTO "Document" (
        title, 
        description, 
        category, 
        url, 
        filename, 
        fileType, 
        fileSize,
        updatedAt
      ) 
      VALUES (
        ${title}, 
        ${description}, 
        ${category}, 
        ${blob.url}, 
        ${file.name}, 
        ${fileType}, 
        ${fileSize},
        NOW()
      ) 
      RETURNING *`;

    const document = result[0] as DocumentMetadata;

    return NextResponse.json({
      success: true,
      document,
    });
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const documents = await sql`
      SELECT * FROM "Document" ORDER BY "createdAt" DESC`;

    return NextResponse.json({ documents });
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}
