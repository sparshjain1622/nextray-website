import { Router } from "express";
import bcrypt from "bcryptjs";
import { adminLoginSchema } from "@nextray/shared";
import { prisma } from "../../lib/prisma";
import { signToken, extractBearerToken, verifyToken } from "../../middleware/auth";
import { asyncHandler } from "../../middleware/async-handler";

export const authRouter = Router();

authRouter.post("/login", asyncHandler(async (req, res) => {
  const parsed = adminLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid credentials format" });
  }

  const admin = await prisma.admin.findUnique({
    where: { email: parsed.data.email },
  });

  if (!admin || !(await bcrypt.compare(parsed.data.password, admin.passwordHash))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const token = signToken(admin.id);
  res.json({
    success: true,
    token,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
}));

authRouter.get("/me", asyncHandler(async (req, res) => {
  const token = extractBearerToken(req);
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const payload = verifyToken(token);
  if (!payload?.sub) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const admin = await prisma.admin.findUnique({ where: { id: payload.sub } });
  if (!admin) return res.status(401).json({ success: false, message: "Unauthorized" });

  res.json({
    success: true,
    admin: { id: admin.id, email: admin.email, name: admin.name },
  });
}));
