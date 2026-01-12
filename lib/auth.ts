import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;
const DEFAULT_SALT_ROUNDS = Number(process.env.SALT_ROUNDS ?? 10);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

export interface AuthTokenPayload {
  userId: string;
  name?: string;
  email?: string;
}

export async function hashPassword(plainPassword: string) {
  return bcrypt.hash(plainPassword, DEFAULT_SALT_ROUNDS);
}

export async function comparePassword(plainPassword: string, hashedPassword: string) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function signAuthToken(payload: AuthTokenPayload, expiresIn = "1h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyAuthToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}

export function getUserFromRequest(request: NextRequest) {
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }

  const token = header.split(" ")[1];
  return verifyAuthToken(token);
}
