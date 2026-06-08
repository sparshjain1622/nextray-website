import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const publicCategoriesRouter = Router();

publicCategoriesRouter.get("/", async (_req, res) => {
  const categories = await prisma.category.findMany({
    where: { published: true },
    include: { _count: { select: { products: true } } },
    orderBy: { sortOrder: "asc" },
  });
  res.json({ success: true, data: categories });
});

publicCategoriesRouter.get("/:slug", async (req, res) => {
  const category = await prisma.category.findFirst({
    where: { slug: req.params.slug, published: true },
    include: { _count: { select: { products: true } } },
  });
  if (!category) {
    return res.status(404).json({ success: false, message: "Category not found" });
  }
  res.json({ success: true, data: category });
});
