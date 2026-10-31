import { NextRequest, NextResponse } from "next/server";
import { signToken, validateAdminCredentials } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    const isValid = validateAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid admin credentials" }, { status: 401 });
    }

    const token = signToken({
      email: username.trim().toLowerCase(),
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      token,
      message: "Logged in successfully",
    });

    // Set HTTP-only secure cookie
    response.cookies.set("sosync_admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
