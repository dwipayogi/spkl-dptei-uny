import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken, UserJwtPayload } from "@/lib/auth";
import sql from "@/db/db";

interface registerRequest {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    // Parse JSON request
    const body: registerRequest = await request.json();
    const { name, email, password } = body;

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id, email
      FROM "User"
      WHERE email = ${email}
      LIMIT 1
    `;

    const user = existingUsers[0];

    // Check if user exists - FIX: Corrected the logic
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await sql`
      INSERT INTO "User" (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING id, email, name
    `;

    // Generate JWT token
    const payload: UserJwtPayload = {
      id: newUser[0].id,
      email: newUser[0].email,
      name: newUser[0].name,
    };

    const token = generateToken(payload);

    // Create response with cookie
    const response = NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: newUser[0].id,
          email: newUser[0].email,
          name: newUser[0].name,
        },
        token: token,
      },
      { status: 201 }
    );

    // Set token in HTTP-only cookie
    // response.cookies.set({
    //   name: "token",
    //   value: token,
    //   httpOnly: true,
    //   path: "/",
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 24 * 1, // 1 day
    // });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
