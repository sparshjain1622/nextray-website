import { Router } from "express";
import { analyticsSchema } from "@nextray/shared";
import { prisma } from "../lib/prisma";

export const analyticsRouter = Router();

async function recordPageview(req: import("express").Request, res: import("express").Response) {
  const parsed = analyticsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Invalid data" });
  }

  await prisma.analyticsEvent.create({
    data: {
      path: parsed.data.path,
      referrer: parsed.data.referrer ?? null,
      userAgent: req.headers["user-agent"] ?? null,
    },
  });

  return res.json({ success: true });
}

analyticsRouter.post("/", recordPageview);
analyticsRouter.post("/pageview", recordPageview);
