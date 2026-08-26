import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const AUTH_SECRET = process.env.AUTH_SECRET;
export const AUTH_COOKIE_NAME = "hre_admin_token";

export interface AdminTokenPayload {
  id: string;
  email: string;
}

export function signToken(payload: AdminTokenPayload): string {
  if (!AUTH_SECRET) {
    throw new Error("AUTH_SECRET is not set in environment variables");
  }
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminTokenPayload | null {
  if (!AUTH_SECRET) return null;
  try {
    return jwt.verify(token, AUTH_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
