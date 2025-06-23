import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { cookies } from 'next/headers'

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

export function generateToken(user: { id: number; email: string }): string {
  const secret = process.env.JWT_SECRET || "default_secret_key";
  return jsonwebtoken.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1d", // Token valid for 1 day
  });
}

export function verifyToken(token: string): { id: number; email: string } | null {
  const secret = process.env.JWT_SECRET || "default_secret_key";
  try {
    return jsonwebtoken.verify(token, secret) as { id: number; email: string };
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}