import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Define public paths that don't require authentication
const publicPaths = [
  "/auth/login",
  "/auth/register",
  "/api/auth/login",
  "/api/auth/register",
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path is public
  const isPublicPath = publicPaths.some(
    (pp) => path === pp || path.startsWith(`${pp}/`)
  );

  // Allow public paths without authentication
  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    return response;
  }

  // Token is valid, proceed with the request
  return NextResponse.next();
}

// Define which routes this middleware applies to
export const config = {
  matcher: [
    // Apply to all routes except static files and api routes
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
