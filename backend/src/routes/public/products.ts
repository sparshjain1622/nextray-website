import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const publicProductsRouter = Router();

function formatProduct(p: Awaited<ReturnType<typeof getProduct>>) {
  if (!p) return null;
  return {
    ...p,
    specs: p.specs ? JSON.parse(p.specs) : null,
    applications: p.applications ? JSON.parse(p.applications) : null,
    features: p.features ? JSON.parse(p.features) : null,
    keyHighlights: p.keyHighlights ? JSON.parse(p.keyHighlights) : null,
    modelNumbers: p.modelNumbers ? JSON.parse(p.modelNumbers) : null,
    tags: p.tags.map((t) => t.tag),
    category: p.category,
  };
}

async function getProduct(slug: string) {
  return prisma.product.findFirst({
    where: { slug, published: true },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
  });
}

publicProductsRouter.get("/", async (req, res) => {
  const categorySlug = req.query.category as string | undefined;

  const products = await prisma.product.findMany({
    where: {
      published: true,
      ...(categorySlug
        ? { category: { slug: categorySlug } }
        : {}),
    },
    include: {
      category: true,
      tags: { include: { tag: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  res.json({
    success: true,
    data: products.map((p) => formatProduct(p as never)),
  });
});

publicProductsRouter.get("/:slug", async (req, res) => {
  const product = await getProduct(req.params.slug);
  if (!product) {
    return res.status(404).json({ success: false, message: "Product not found" });
  }
  res.json({ success: true, data: formatProduct(product) });
});
