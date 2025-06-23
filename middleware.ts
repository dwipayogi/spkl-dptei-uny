import { NextRequest, NextResponse } from "next/server";
import { getTokenFromCookies, verifyToken } from "./lib/auth";

export const config = {
  matcher: ["/dashboard/:path*"],
};

export function middleware(request: NextRequest) {
  const token = getTokenFromCookies(request);

  // Check if the user is logged in
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Verify the token
  const user = verifyToken(token);
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
