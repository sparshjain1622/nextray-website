import type { Metadata } from "next";
import type { AboutPageData } from "./about-data";
import { buildPageMetadata } from "./seo-metadata";

export function aboutPageMetadata(
  data: AboutPageData,
  path: string
): Metadata {
  const title =
    path === "/about"
      ? `${data.breadcrumb} | LED Manufacturer India`
      : `${data.breadcrumb} | About Us | Nextray Technologies`;

  return buildPageMetadata({
    title,
    description: data.metaDescription,
    path,
    keywords: [
      data.breadcrumb,
      "Nextray Technologies",
      "LED manufacturer",
      "about Nextray",
    ],
  });
}
