import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  // Check if user has auth token in cookies
  const token = request.cookies.get("token")?.value;

  // If no token found, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify the token
  const { valid, expired, payload } = verifyToken(token);

  // Handle invalid or expired tokens
  if (!valid || expired) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    // Clear the invalid/expired token
    response.cookies.delete("token");
    return response;
  }

  // Add user info to request headers if needed
  if (payload) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", String(payload.id));
    requestHeaders.set("x-user-email", payload.email);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
