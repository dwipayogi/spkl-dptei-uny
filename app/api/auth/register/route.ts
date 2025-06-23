import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import sql from "@/db/db";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password harus diisi" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password minimal 8 karakter" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM "User" WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User dengan email ini sudah ada" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Current timestamp for updatedAt
    const now = new Date();

    // Create new user with updatedAt field
    const newUser = await sql`
      INSERT INTO "User" (name, email, password, "updatedAt") 
      VALUES (${name}, ${email}, ${hashedPassword}, ${now}) 
      RETURNING *
    `;

    return NextResponse.json({
      message: "Registrasi berhasil",
      user: newUser[0],
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mendaftar" },
      { status: 500 }
    );
  }
}
