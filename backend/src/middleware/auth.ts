import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../lib/env";

const JWT_OPTIONS: jwt.VerifyOptions = { algorithms: ["HS256"] };

export interface AuthRequest extends Request {
  adminId?: string;
}

export function signToken(adminId: string): string {
  return jwt.sign({ sub: adminId }, getJwtSecret(), {
    expiresIn: "8h",
    algorithm: "HS256",
  });
}

export function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice(7);
}

export function verifyToken(token: string): { sub: string } | null {
  try {
    return jwt.verify(token, getJwtSecret(), JWT_OPTIONS) as { sub: string };
  } catch {
    return null;
  }
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = extractBearerToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const payload = verifyToken(token);
  if (!payload?.sub) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }

  req.adminId = payload.sub;
  next();
}
