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
  { label: "24 Watt (1X1 Down Light)", href: "/products/indoor/24-watt-down-light" },
  { label: "40 Watt (2X2 Downlight)", href: "/products/indoor/40-watt-down-light" },
  {
    label: "40 Watt (2X2 Clean Room)",
    href: "/products/indoor/40-watt-clean-room-down-light",
  },
  {
    label: "60 Watt (2X2 Clean Room)",
    href: "/products/indoor/60-watt-clean-room-down-light",
  },
] as const;

export interface SpecRow {
  label: string;
  round?: string;
  square?: string;
  value?: string;
}

export interface SpecTable {
  title: string;
  rows: SpecRow[];
  columns?: "single" | "dual";
}

export interface ProductDetail {
  slug: string;
  title: string;
  brand: string;
  category: string;
  breadcrumb: string;
  metaDescription: string;
  imageUnlit: string;
  imageLit: string;
  modelNumbers: { round: string; square: string };
  tables: SpecTable[];
  applications: string[];
  features: string[];
}

export const sixWattDownLight: ProductDetail = {
  slug: "6-watt-down-light",
  title: "6 Watt Down Light",
  brand: "Whites",
  category: "Indoor Lights",
  breadcrumb: "6 Watt Down Light",
  metaDescription:
    "6 Watt Down Light by Nextray Technologies — NT-DL-6R / NT-DL-6S. BIS approved, ≥550 lm, polycarbonate body.",
  imageUnlit: "/images/products/6_watt_down_light.jpg",
  imageLit: "/images/products/lit/6_watt.jpg",
  modelNumbers: { round: "NT-DL-6R", square: "NT-DL-6S" },
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "dual",
      rows: [
        { label: "Shape", round: "Round", square: "Square" },
        { label: "Outer Diameter", round: "90MM", square: "90X90MM" },
        { label: "Cutout Diameter", round: "75MM", square: "75X75MM" },
      ],
    },
    {
      title: "Material Properties",
      columns: "single",
      rows: [
        { label: "Body Material", value: "Polycarbonate" },
        { label: "Body Colour", value: "White" },
        { label: "Diffuser Transparency", value: "≥ 80%" },
        { label: "Screw Material", value: "SS" },
        { label: "Spring Material", value: "Nickel Plated Spring Steel" },
      ],
    },
    {
      title: "Electrical Parameters",
      columns: "single",
      rows: [
        { label: "Power", value: "6Watt" },
        { label: "Input Voltage", value: "90-270VAC" },
        { label: "Power Factor", value: "≥0.95" },
        { label: "THD", value: "≤10%" },
        { label: "Lumens Output", value: "≥ 550 lm" },
        { label: "Surge", value: "2.5 KV" },
        { label: "Protection", value: "No load, Short Circuit" },
      ],
    },
    {
      title: "LED Parameters",
      columns: "single",
      rows: [
        { label: "LED Efficacy", value: "125 lm/watt" },
        { label: "CCT", value: "3000K/4000K/5700K/6500K" },
        { label: "CRI", value: "≥ 80" },
        { label: "LED Type", value: "Mid Power" },
        { label: "LED Make", value: "Everlight/Bridgelux/Samsung" },
      ],
    },
  ],
  applications: [
    "Residentials",
    "Shops",
    "Showrooms",
    "Offices",
    "Corridors",
    "Utility Areas",
    "Hospitals",
  ],
  features: [
    "Higher Lumens Output",
    "Low Power Consumption",
    "High CRI",
    "Slim and Elegant",
    "BIS approved Control Gear",
  ],
};

export const productDetails: Record<string, ProductDetail> = {
  "6-watt-down-light": sixWattDownLight,
};
