import { allProducts } from "./products-catalog";

export type {
  SpecRow,
  SpecTable,
  ProductHighlight,
  ProductBreadcrumb,
  KeyHighlight,
  MatrixTableData,
  ProductDetail,
} from "./products-types";

export const productCategories = [
  { label: "Indoor Lights", href: "/products/indoor" },
  { label: "Outdoor Lights", href: "/products/outdoor" },
  { label: "Industrial Lights", href: "/products/industrial" },
  { label: "Powertronics", href: "/products/powertronics" },
] as const;

export const indoorDownlights = [
  { label: "6 Watt", href: "/products/indoor/6-watt-down-light" },
  { label: "12 Watt", href: "/products/indoor/12-watt-down-light" },
  { label: "18 Watt", href: "/products/indoor/18-watt-down-light" },
  { label: "24 Watt (1×1)", href: "/products/indoor/24-watt-down-light" },
  { label: "40 Watt (2×2)", href: "/products/indoor/40-watt-down-light" },
  {
    label: "40 Watt (Clean Room)",
    href: "/products/indoor/40-watt-clean-room-down-light",
  },
  {
    label: "60 Watt (Clean Room)",
    href: "/products/indoor/60-watt-clean-room-down-light",
  },
] as const;

export const outdoorStreetLights = [
  {
    label: "25 Watt Street Light",
    href: "/products/outdoor/25-watt-street-light",
  },
  { label: "P Series", href: "/products/outdoor/p-series-street-light" },
] as const;

export const outdoorFloodLights = [
  { label: "Down Choke", href: "/products/outdoor/down-choke" },
  { label: "Back Choke", href: "/products/outdoor/back-choke" },
] as const;

export const powertronicsItems = [
  { label: "Isolated", href: "/products/powertronics/isolated" },
  { label: "Non-Isolated", href: "/products/powertronics/non-isolated" },
] as const;

export const productDetails: Record<string, import("./products-types").ProductDetail> =
  Object.fromEntries(allProducts.map((p) => [p.slug, p]));

export {
  sixWattDownLight,
  twelveWattDownLight,
  eighteenWattDownLight,
  twentyFiveWattStreetLight,
} from "./products-catalog";
