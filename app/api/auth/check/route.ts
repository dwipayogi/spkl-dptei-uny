import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const token = getTokenFromCookies(request);

    if (!token) {
      return NextResponse.json(
        { error: "Tidak terautentikasi" },
        { status: 401 }
      );
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json({ error: "Token tidak valid" }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error) {
    console.error("Authentication check error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat memeriksa autentikasi" },
      { status: 500 }
    );
  }
}
