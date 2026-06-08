import { Router } from "express";
import { categorySchema, resolveSlug } from "@nextray/shared";
import { prisma } from "../../lib/prisma";

export const adminCategoriesRouter = Router();

adminCategoriesRouter.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  res.json({ success: true, data: categories });
});

adminCategoriesRouter.post("/", async (req, res) => {
  const parsed = categorySchema.safeParse({
    ...req.body,
    slug: resolveSlug(req.body.slug, req.body.name),
  });
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Validation failed" });
  }
  const category = await prisma.category.create({ data: parsed.data });
  res.status(201).json({ success: true, data: category });
});

adminCategoriesRouter.put("/:id", async (req, res) => {
  const parsed = categorySchema.safeParse({
    ...req.body,
    slug: resolveSlug(req.body.slug, req.body.name),
  });
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: "Validation failed" });
  }
  const category = await prisma.category.update({
    where: { id: req.params.id },
    data: parsed.data,
  });
  res.json({ success: true, data: category });
});

adminCategoriesRouter.delete("/:id", async (req, res) => {
  await prisma.category.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: "Category deleted" });
});
