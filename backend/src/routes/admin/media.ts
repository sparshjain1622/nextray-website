import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { prisma } from "../../lib/prisma";
import { validateMediaUpload } from "../../lib/upload-security";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase().replace(/[^a-z0-9.]/g, "");
    const base = path
      .basename(file.originalname, path.extname(file.originalname))
      .replace(/[^a-zA-Z0-9.-]/g, "_")
      .slice(0, 80);
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const error = validateMediaUpload(file.originalname, file.mimetype);
    if (error) {
      cb(new Error(error));
      return;
    }
    cb(null, true);
  },
});

export const adminMediaRouter = Router();

adminMediaRouter.get("/", async (_req, res) => {
  const files = await prisma.mediaFile.findMany({ orderBy: { createdAt: "desc" } });
  res.json({ success: true, data: files });
});

adminMediaRouter.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err instanceof Error ? err.message : "Upload rejected",
      });
    }
    next();
  });
}, async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const file = await prisma.mediaFile.create({
    data: {
      title: (req.body.title as string)?.slice(0, 200) || req.file.originalname,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      category: (req.body.category as string)?.slice(0, 50) || "general",
      public: req.body.public !== "false",
    },
  });

  res.status(201).json({ success: true, data: file });
});

adminMediaRouter.delete("/:id", async (req, res) => {
  const file = await prisma.mediaFile.findUnique({ where: { id: req.params.id } });
  if (file) {
    const filePath = path.join(UPLOAD_DIR, file.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    await prisma.mediaFile.delete({ where: { id: req.params.id } });
  }
  res.json({ success: true, message: "File deleted" });
});
