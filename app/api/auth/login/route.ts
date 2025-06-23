import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken, UserJwtPayload } from "@/lib/auth";
import sql from "@/db/db";

interface LoginRequest {
  email: string;
  password: string;
}

const comparePasswords = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export async function POST(request: Request) {
  try {
    // Parse JSON request
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    } // Find user by email
    const users = await sql`
      SELECT id, email, name, password
      FROM "User"
      WHERE email = ${email}
      LIMIT 1
    `;

    const user = users[0];

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const payload: UserJwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = generateToken(payload);

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: token,
      },
      { status: 200 }
    );

    // Set token in HTTP-only cookie
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1, // 1 day
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
