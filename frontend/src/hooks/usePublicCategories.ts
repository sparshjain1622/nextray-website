"use client";

import { useEffect, useMemo, useState } from "react";
import {
  categoryPath,
  fetchPublicCategories,
  type PublicCategory,
} from "@/lib/categories-api";
import { productCategories } from "@/lib/products-data";

export interface CategoryNavItem {
  label: string;
  href: string;
  slug: string;
}

const STATIC_TABS: CategoryNavItem[] = productCategories.map((c) => ({
  label: c.label,
  href: c.href,
  slug: c.href.replace("/products/", ""),
}));

export function usePublicCategories() {
  const [categories, setCategories] = useState<PublicCategory[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchPublicCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoaded(true));
  }, []);

  const navItems = useMemo<CategoryNavItem[]>(() => {
    if (!categories.length) return STATIC_TABS;
    return categories.map((c) => ({
      label: c.name,
      href: categoryPath(c.slug),
      slug: c.slug,
    }));
  }, [categories]);

  return { categories, navItems, loaded, usingApi: categories.length > 0 };
}
