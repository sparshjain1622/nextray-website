import { Router } from "express";
import path from "path";
import fs from "fs";
import { prisma } from "../lib/prisma";
import { resolveUploadPath } from "../lib/upload-security";

export const downloadsRouter = Router();

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

downloadsRouter.get("/", async (req, res) => {
  const category = req.query.category as string | undefined;
  const files = await prisma.mediaFile.findMany({
    where: {
      public: true,
      ...(category ? { category } : {}),
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      originalName: true,
      mimeType: true,
      size: true,
      category: true,
      createdAt: true,
    },
  });
  res.json({ success: true, data: files });
});

downloadsRouter.get("/:id", async (req, res) => {
  const file = await prisma.mediaFile.findFirst({
    where: { id: req.params.id, public: true },
  });

  if (!file) {
    return res.status(404).json({ success: false, message: "File not found" });
  }

  const filePath = resolveUploadPath(UPLOAD_DIR, file.filename);
  if (!filePath || !fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: "File missing on server" });
  }

  res.download(filePath, file.originalName);
});
