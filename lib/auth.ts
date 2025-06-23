import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(user: {
  id: number;
  email: string;
  role?: string;
}): string {
  const secret = process.env.JWT_SECRET || "default_secret_key";
  return jsonwebtoken.sign(
    { id: user.id, email: user.email, role: user.role || "user" },
    secret,
    { expiresIn: "1d" } // Token expires in 1 day
  );
}

export function verifyToken(
  token: string
): { id: number; email: string; role?: string } | null {
  const secret = process.env.JWT_SECRET || "default_secret_key";
  try {
    return jsonwebtoken.verify(token, secret) as {
      id: number;
      email: string;
      role?: string;
    };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}

export function setTokenCookie(res: NextResponse, token: string): void {
  const cookieOptions = {
    httpOnly: true, // prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === "production", // use secure cookies in production
    sameSite: "strict" as const, // protect against CSRF
    maxAge: 86400, // 1 day in seconds
    path: "/",
  };

  res.headers.set(
    "Set-Cookie",
    cookie.serialize("authToken", token, cookieOptions)
  );
}

export function getTokenFromCookies(req: NextRequest): string | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const parsedCookies = cookie.parse(cookieHeader);
  return parsedCookies.authToken || null;
}

export function removeTokenCookie(res: NextResponse): void {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 0, // expire immediately
    path: "/",
  };

  res.headers.set(
    "Set-Cookie",
    cookie.serialize("authToken", "", cookieOptions)
  );
}

export function isAuthenticated(req: NextRequest): {
  authenticated: boolean;
  user?: any;
} {
  const token = getTokenFromCookies(req);

  if (!token) {
    return { authenticated: false };
  }

  const user = verifyToken(token);

  if (!user) {
    return { authenticated: false };
  }

  return { authenticated: true, user };
}
