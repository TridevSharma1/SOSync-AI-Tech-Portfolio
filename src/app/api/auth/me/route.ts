import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const isAdmin = await isAuthenticatedAdmin(req);
  return NextResponse.json({ isAdmin });
}
