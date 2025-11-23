import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const HARDCODED_EMAIL = process.env.LOGIN_EMAIL
const HARDCODED_PASSWORD = process.env.LOGIN_PASSWORD

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (email === HARDCODED_EMAIL && password === HARDCODED_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}