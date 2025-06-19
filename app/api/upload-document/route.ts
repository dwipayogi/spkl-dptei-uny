import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import sql from "@/db/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const file = formData.get("file") as File;

    // Validate required fields
    if (!title || !category || !file) {
      return NextResponse.json(
        { error: "Title, category, and file are required" },
        { status: 400 }
      );
    } // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must not exceed 10MB" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed" },
        { status: 400 }
      );
    }

    // Upload file to Vercel Blob
    const blob = await put(file.name, file, {
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
        ${title}, 
        ${description || ""}, 
        ${category},
        ${blob.url},
        ${file.name},
        ${file.type},
        ${file.size},
        ${"System"}, 
        ${now}, 
        ${now}
      )
      RETURNING *
    `;

    if (result && result.length > 0) {
      revalidatePath("/dashboard/dokumen");
      revalidatePath("/dashboard");
      return NextResponse.json({
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
      });
    }

    return NextResponse.json(
      { error: "Failed to save document to database" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}
