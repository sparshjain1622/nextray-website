import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { homepageImageSchema } from "@nextray/shared";
import { prisma } from "../../lib/prisma";
import { formatHomepageContent } from "../../lib/homepage";
import { validateImageUpload } from "../../lib/upload-security";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "homepage");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const error = validateImageUpload(file.originalname, file.mimetype);
    if (error) {
      cb(new Error(error));
      return;
    }
    cb(null, true);
  },
});

export const adminHomepageRouter = Router();

adminHomepageRouter.get("/", async (_req, res) => {
  const rows = await prisma.homepageImage.findMany({
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
  });
  res.json({
    success: true,
    data: rows,
    grouped: formatHomepageContent(rows),
  });
});

adminHomepageRouter.put("/:id", async (req, res) => {
  const parsed = homepageImageSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Validation failed" });
  }

  const item = await prisma.homepageImage.update({
    where: { id: req.params.id },
    data: parsed.data,
  });

  res.json({ success: true, data: item });
});

adminHomepageRouter.post("/upload", (req, res, next) => {
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

  const publicPath = `/uploads/homepage/${req.file.filename}`;
  res.status(201).json({
    success: true,
    data: { path: publicPath, filename: req.file.filename },
  });
});
