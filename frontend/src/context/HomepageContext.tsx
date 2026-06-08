"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchHomepageContent } from "@/lib/homepage-api";
import { mergeHomepageContent } from "@/lib/merge-home-data";
import {
  type BrandProduct,
} from "@/lib/home-data";

export interface HomepageAreaItem {
  title: string;
  description: string;
  icon: string;
  imageUnlit: string;
  imageLit: string;
  href: string;
}

export interface HomepageCertItem {
  title: string;
  description: string;
  image: string;
}

interface HomepageContextValue {
  brandProducts: BrandProduct[];
  areasWeServe: HomepageAreaItem[];
  clients: string[];
  certifications: HomepageCertItem[];
  loaded: boolean;
}

const defaults = mergeHomepageContent(null);

const HomepageContext = createContext<HomepageContextValue>({
  ...defaults,
  loaded: false,
});

export function HomepageProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<HomepageContextValue>({
    ...defaults,
    loaded: false,
  });

  useEffect(() => {
    fetchHomepageContent().then((api) => {
      const merged = mergeHomepageContent(api);
      setData({ ...merged, loaded: true });
    });
  }, []);

  return (
    <HomepageContext.Provider value={data}>{children}</HomepageContext.Provider>
  );
}

export function useHomepage() {
  return useContext(HomepageContext);
}
