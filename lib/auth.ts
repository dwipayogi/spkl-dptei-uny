import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
  return jwt.sign({ id: user.id, email: user.email }, secret, {
    expiresIn: "1d", // Token valid for 1 day
  });
}

export function verifyToken(token: string): {
  valid: boolean;
  expired: boolean;
  payload: { id: number; email: string } | null;
} {
  const secret = process.env.JWT_SECRET || "default_secret_key";
  try {
    const decoded = jwt.verify(token, secret) as { id: number; email: string };
    return {
      valid: true,
      expired: false,
      payload: decoded,
    };
  } catch (error: unknown) {
    return {
      valid: false,
      expired: error instanceof Error && error.name === "TokenExpiredError",
      payload: null,
    };
  }
}
