import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Allow public access to the home page
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Handle auth pages (login/register)
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
    // If user has a valid token, redirect to dashboard
    if (token) {
      try {
        const verifiedToken = await verifyToken(token);
        if (verifiedToken) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        // Invalid token, continue to login/register page
        console.error("Auth page redirect error:", error);
      }
    }
    // No token or invalid token, allow access to login/register
    return NextResponse.next();
  }

  // Handle protected routes
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const verifiedToken = await verifyToken(token);
    if (!verifiedToken) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
