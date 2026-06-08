import type { HomepageContent } from "@nextray/shared";
import {
  brandProducts,
  areasWeServe,
  clients,
  certifications,
  type BrandProduct,
} from "./home-data";

const heroKeys = [
  "25-watt-street",
  "50-watt-street",
  "p-series",
  "100-watt-high-bay",
  "150-watt-high-bay",
];

const areaKeys = ["commercial", "outdoor", "industrial", "oem"];

export function mergeHomepageContent(api: HomepageContent | null) {
  if (!api) {
    return {
      brandProducts: [...brandProducts],
      areasWeServe: [...areasWeServe],
      clients: [...clients],
      certifications: [...certifications],
    };
  }

  const mergedBrandProducts: BrandProduct[] = brandProducts.map((item, i) => {
    const fromApi = api.heroProducts.find((h) => h.key === heroKeys[i]);
    if (!fromApi) return item;
    return {
      ...item,
      title: fromApi.title || item.title,
      description: fromApi.description || item.description,
      imageUnlit: fromApi.imageUnlit || item.imageUnlit,
      imageLit: fromApi.imageLit || item.imageLit,
      href: fromApi.href || item.href,
    };
  });

  const mergedAreas = areasWeServe.map((item, i) => {
    const fromApi = api.areas.find((a) => a.key === areaKeys[i]);
    if (!fromApi) return item;
    return {
      ...item,
      title: fromApi.title || item.title,
      description: fromApi.description || item.description,
      imageUnlit: fromApi.imageUnlit || item.imageUnlit,
      imageLit: fromApi.imageLit || item.imageLit,
      href: fromApi.href || item.href,
    };
  });

  const mergedClients =
    api.clients.length > 0 ? api.clients : [...clients];

  const certKeys = ["make-in-india", "design-excellence", "is-mark"];
  const mergedCerts = certifications.map((item, i) => {
    const fromApi = api.certifications.find((c) => c.key === certKeys[i]);
    if (!fromApi) return item;
    return {
      ...item,
      title: fromApi.title || item.title,
      description: fromApi.description || item.description,
      image: fromApi.image || item.image,
    };
  });

  return {
    brandProducts: mergedBrandProducts,
    areasWeServe: mergedAreas,
    clients: mergedClients,
    certifications: mergedCerts,
  };
}
