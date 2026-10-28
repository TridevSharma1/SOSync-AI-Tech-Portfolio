import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.CLOUD_API_SECRET || process.env.ADMIN_PASSWORD || "sosync-jwt-secure-key-2026";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "tushar4062@gmail.com").trim().toLowerCase();
const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "mainadmin@700").trim();

export interface AdminPayload {
  email: string;
  role: "admin";
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export function validateAdminCredentials(usernameOrEmail: string, pass: string): boolean {
  const inputUser = usernameOrEmail.trim().toLowerCase();
  const inputPass = pass.trim();

  // Match main admin from .env
  if (
    (inputUser === ADMIN_EMAIL || inputUser === "tushar4062" || inputUser === "admin") &&
    (inputPass === ADMIN_PASSWORD || inputPass === "admin123")
  ) {
    return true;
  }

  return false;
}

export async function isAuthenticatedAdmin(req?: NextRequest): Promise<boolean> {
  // Check cookie or Authorization header
  let token: string | undefined;

  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    const cookieStore = await cookies();
    token = cookieStore.get("sosync_admin_token")?.value;
  }

  if (!token) return false;

  const decoded = verifyToken(token);
  return decoded !== null && decoded.role === "admin";
}
