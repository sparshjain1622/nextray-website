import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/seo-metadata";

export const metadata = buildPageMetadata({
  title: "Outdoor LED Street & Flood Lights | Nextray Technologies",
  description:
    "Outdoor LED street lights, P-series luminaires and flood lights by Nextray Technologies — engineered for Indian conditions.",
  path: "/products/outdoor",
  image: "/images/products/25_watt_street_light.jpg",
  keywords: ["LED street light", "outdoor LED India", "flood light manufacturer"],
});

export default function OutdoorProductsPage() {
  redirect("/products/outdoor/25-watt-street-light");
}
