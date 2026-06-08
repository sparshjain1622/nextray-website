import { Router } from "express";
import { isValidSlug, slugify } from "@nextray/shared";

export const adminUtilsRouter = Router();

/** Live slug preview — same logic used when saving categories, products, and blog posts. */
adminUtilsRouter.get("/slug-preview", (req, res) => {
  const text = String(req.query.text ?? "");
  const slug = slugify(text);
  res.json({
    success: true,
    data: {
      slug,
      valid: isValidSlug(slug),
    },
  });
});
