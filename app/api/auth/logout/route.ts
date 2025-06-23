import { NextRequest, NextResponse } from "next/server";
import { removeTokenCookie } from "@/lib/auth";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const response = NextResponse.json({
      message: "Logout berhasil",
    });

    // Remove authentication cookie
    removeTokenCookie(response);

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat logout" },
      { status: 500 }
    );
  }
}
