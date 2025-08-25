import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import sql from "@/db/db";

export async function GET() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      username: string;
      email: string;
    };
    const result = await sql`
      SELECT id, username, email FROM users WHERE id = ${decoded.id}
    `;
    if (result.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const user = result[0];
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
