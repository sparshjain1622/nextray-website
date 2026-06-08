import { Router } from "express";
import { productSchema, resolveSlug } from "@nextray/shared";
import { prisma } from "../../lib/prisma";

export const adminProductsRouter = Router();

async function syncTags(productId: string, tagSlugs?: string[]) {
  await prisma.productTag.deleteMany({ where: { productId } });
  if (!tagSlugs?.length) return;

  for (const slug of tagSlugs) {
    const tag = await prisma.tag.upsert({
      where: { slug },
      create: { name: slug.replace(/-/g, " "), slug },
      update: {},
    });
    await prisma.productTag.create({ data: { productId, tagId: tag.id } });
  }
}

adminProductsRouter.get("/", async (_req, res) => {
  const products = await prisma.product.findMany({
    include: { category: true, tags: { include: { tag: true } } },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });
  res.json({ success: true, data: products });
});

adminProductsRouter.get("/:id", async (req, res) => {
  const product = await prisma.product.findUnique({
    where: { id: req.params.id },
    include: { category: true, tags: { include: { tag: true } } },
  });
  if (!product) return res.status(404).json({ success: false, message: "Not found" });
  res.json({ success: true, data: product });
});

adminProductsRouter.post("/", async (req, res) => {
  const parsed = productSchema.safeParse({
    ...req.body,
    slug: resolveSlug(req.body.slug, req.body.title),
  });
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { tagSlugs, ...data } = parsed.data;
  const product = await prisma.product.create({
    data: {
      ...data,
      specs: data.specs ?? null,
      applications: data.applications ?? null,
      features: data.features ?? null,
      keyHighlights: data.keyHighlights ?? null,
      modelNumbers: data.modelNumbers ?? null,
    },
  });

  await syncTags(product.id, tagSlugs);
  res.status(201).json({ success: true, data: product });
});

adminProductsRouter.put("/:id", async (req, res) => {
  const parsed = productSchema.safeParse({
    ...req.body,
    slug: resolveSlug(req.body.slug, req.body.title),
  });
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const { tagSlugs, ...data } = parsed.data;
  const product = await prisma.product.update({
    where: { id: req.params.id },
    data: {
      ...data,
      specs: data.specs ?? null,
      applications: data.applications ?? null,
      features: data.features ?? null,
      keyHighlights: data.keyHighlights ?? null,
      modelNumbers: data.modelNumbers ?? null,
    },
  });

  await syncTags(product.id, tagSlugs);
  res.json({ success: true, data: product });
});

adminProductsRouter.delete("/:id", async (req, res) => {
  await prisma.product.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: "Product deleted" });
});
