import jwt from "jsonwebtoken";
import { type NextRequest, type NextResponse } from "next/server";

// Make sure to set a strong JWT secret in your environment variables
const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

const JWT_EXPIRATION = "7d"; // Token expiration time

export interface UserJwtPayload {
  id: number;
  email: string;
  name: string;
}

export function generateToken(payload: UserJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

export function verifyToken(token: string): UserJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as UserJwtPayload;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}