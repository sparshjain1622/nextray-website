import type { HomepageContent } from "@nextray/shared";
import { prisma } from "./prisma";

type Row = Awaited<ReturnType<typeof fetchRows>>[number];

async function fetchRows() {
  return prisma.homepageImage.findMany({
    where: { published: true },
    orderBy: [{ section: "asc" }, { sortOrder: "asc" }],
  });
}

export function formatHomepageContent(rows: Row[]): HomepageContent {
  const heroProducts = rows
    .filter((r) => r.section === "hero-product")
    .map((r) => ({
      key: r.key,
      title: r.title ?? r.key,
      description: r.description ?? undefined,
      imageUnlit: r.imageUnlit ?? "",
      imageLit: r.imageLit ?? "",
      href: r.href ?? undefined,
    }));

  const areas = rows
    .filter((r) => r.section === "area")
    .map((r) => ({
      key: r.key,
      title: r.title ?? r.key,
      description: r.description ?? undefined,
      imageUnlit: r.imageUnlit ?? "",
      imageLit: r.imageLit ?? "",
      href: r.href ?? undefined,
    }));

  const clients = rows
    .filter((r) => r.section === "client")
    .map((r) => r.image ?? r.imageUnlit ?? "")
    .filter(Boolean);

  const certifications = rows
    .filter((r) => r.section === "certification")
    .map((r) => ({
      key: r.key,
      title: r.title ?? r.key,
      description: r.description ?? undefined,
      image: r.image ?? r.imageUnlit ?? "",
    }));

  return { heroProducts, areas, clients, certifications };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  const rows = await fetchRows();
  return formatHomepageContent(rows);
}
