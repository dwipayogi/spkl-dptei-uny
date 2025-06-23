import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(request: NextRequest) {
  // Path yang memerlukan autentikasi
  const protectedPaths = ["/dashboard"];
  const path = request.nextUrl.pathname;

  // Periksa apakah path saat ini memerlukan autentikasi
  const isPathProtected = protectedPaths.some((prefix) =>
    path.startsWith(prefix)
  );
  if (!isPathProtected) {
    return NextResponse.next();
  }

  // Ambil token dari request
  const token = request.cookies.get("token")?.value || "";

  const isAuthenticated = token && verifyToken(token);

  // Jika tidak terotentikasi dan mengakses rute yang dilindungi, alihkan ke halaman login
  if (!isAuthenticated && isPathProtected) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Cocokkan semua permintaan kecuali untuk aset statis, API, dan webhook
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
