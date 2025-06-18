import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Upload file to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: file.name,
      fileType: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Error uploading assessment file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
