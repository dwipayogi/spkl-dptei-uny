import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import sql from "@/db/db";

export async function GET(request: Request) {
  try {
    const tokenCookie = request.headers.get("Cookie") || "";
    const tokenMatch = tokenCookie.match(/token=([^;]+)/);
    if (!tokenMatch) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const token = tokenMatch[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const users = await sql`
      SELECT id, email, name
      FROM "User"
      WHERE id = ${payload.id}
      LIMIT 1
    `;
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
