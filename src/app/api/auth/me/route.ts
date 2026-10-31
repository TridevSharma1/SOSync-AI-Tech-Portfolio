import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const isAdmin = await isAuthenticatedAdmin(req);
  return NextResponse.json({ isAdmin });
}
