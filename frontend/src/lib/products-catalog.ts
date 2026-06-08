import type {
  ProductDetail,
  SpecTable,
  KeyHighlight,
  MatrixTableData,
} from "./products-types";

const LED_TABLE: SpecTable = {
  title: "LED Parameters",
  columns: "single",
  rows: [
    { label: "LED Efficacy", value: "125 lm/watt" },
    { label: "CCT", value: "3000K / 4000K / 5700K / 6500K" },
    { label: "CRI", value: "≥ 80" },
    { label: "LED Type", value: "Mid Power" },
    { label: "LED Make", value: "Everlight / Bridgelux / Samsung" },
  ],
};

const RESIDENTIAL_APPS = [
  "Residentials",
  "Shops",
  "Showrooms",
  "Offices",
  "Corridors",
  "Utility Areas",
  "Hospitals",
] as const;

const CLEAN_ROOM_APPS = ["Pharmaceutical", "Hospitals"] as const;

const STANDARD_FEATURES = [
  "Higher Lumens Output",
  "Low Power Consumption",
  "High CRI",
  "Slim and Elegant",
  "BIS approved Control Gear",
] as const;

function electricalTable(power: string, lumens: string): SpecTable {
  return {
    title: "Electrical Parameters",
    columns: "single",
    rows: [
      { label: "Power", value: power },
      { label: "Input Voltage", value: "90–270VAC" },
      { label: "Power Factor", value: "≥ 0.95" },
      { label: "THD", value: "≤ 10%" },
      { label: "Lumens Output", value: lumens },
      { label: "Surge", value: "2.5 KV" },
      { label: "Protection", value: "No load, Short Circuit" },
    ],
  };
}

function polycarbonateMaterial(): SpecTable {
  return {
    title: "Material Properties",
    columns: "single",
    rows: [
      { label: "Body Material", value: "Polycarbonate" },
      { label: "Body Colour", value: "White" },
      { label: "Diffuser Transparency", value: "≥ 80%" },
      { label: "Screw Material", value: "SS" },
      { label: "Spring Material", value: "Nickel Plated Spring Steel" },
    ],
  };
}

function crcaMaterial(): SpecTable {
  return {
    title: "Material Properties",
    columns: "single",
    rows: [
      { label: "Body Material", value: "CRCA powder-coated housing" },
      { label: "Body Colour", value: "White" },
      { label: "Diffuser Transparency", value: "≥ 80%" },
      { label: "Screw Material", value: "SS" },
    ],
  };
}

function downlightHighlights(lumens: string): KeyHighlight[] {
  return [
    {
      icon: "brightness",
      title: "High Brightness",
      description: `${lumens} output`,
    },
    {
      icon: "bis",
      title: "BIS Approved",
      description: "Certified control gear for safety",
    },
    {
      icon: "voltage",
      title: "Wide Voltage Range",
      description: "90–270 VAC for stable performance",
    },
    {
      icon: "power",
      title: "Energy Efficient",
      description: "125 lm/watt LED efficacy",
    },
  ];
}

function indoorBreadcrumb(label: string) {
  return [
    { label: "Indoor Lighting", href: "/products/indoor" },
    { label: "Down Light", href: "/products/indoor" },
    { label },
  ];
}

function outdoorBreadcrumb(
  group: string,
  groupHref: string,
  label: string
) {
  return [
    { label: "Outdoor Lighting", href: "/products/outdoor" },
    { label: group, href: groupHref },
    { label },
  ];
}

/* ─── Indoor Downlights ─── */

export const sixWattDownLight: ProductDetail = {
  slug: "6-watt-down-light",
  title: "6 Watt Down Light",
  brand: "Whites",
  category: "Indoor Lights",
  categoryHref: "/products/indoor",
  subGroup: "down-light",
  pageType: "spec",
  breadcrumb: "6 Watt",
  breadcrumbs: indoorBreadcrumb("6 Watt"),
  metaDescription:
    "6 Watt Down Light — NT-DL-6R / NT-DL-6S. BIS approved, ≥550 lm, polycarbonate body.",
  imageUnlit: "/images/products/6_watt_down_light.jpg",
  imageLit: "/images/products/lit/6_watt.jpg",
  modelNumbers: { round: "NT-DL-6R", square: "NT-DL-6S" },
  keyHighlights: downlightHighlights("≥ 550 lm"),
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "dual",
      rows: [
        { label: "Shape", round: "Round", square: "Square" },
        { label: "Outer Diameter", round: "90MM", square: "90×90MM" },
        { label: "Cutout Diameter", round: "75MM", square: "75×75MM" },
      ],
    },
    polycarbonateMaterial(),
    electricalTable("6 Watt", "≥ 550 lm"),
    LED_TABLE,
  ],
  applications: [...RESIDENTIAL_APPS],
  features: [...STANDARD_FEATURES],
};

export const twelveWattDownLight: ProductDetail = {
  ...sixWattDownLight,
  slug: "12-watt-down-light",
  title: "12 Watt Down Light",
  breadcrumb: "12 Watt",
  breadcrumbs: indoorBreadcrumb("12 Watt"),
  metaDescription: "12 Watt Down Light — NT-DL-12R / NT-DL-12S. ≥1100 lm.",
  imageUnlit: "/images/products/12_watt_down_light.jpg",
  imageLit: "/images/products/lit/12_watt.jpg",
  modelNumbers: { round: "NT-DL-12R", square: "NT-DL-12S" },
  keyHighlights: downlightHighlights("≥ 1100 lm"),
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "dual",
      rows: [
        { label: "Shape", round: "Round", square: "Square" },
        { label: "Outer Diameter", round: "120MM", square: "120×120MM" },
        { label: "Cutout Diameter", round: "105MM", square: "105×105MM" },
      ],
    },
    polycarbonateMaterial(),
    electricalTable("12 Watt", "≥ 1100 lm"),
    LED_TABLE,
  ],
};

export const eighteenWattDownLight: ProductDetail = {
  ...sixWattDownLight,
  slug: "18-watt-down-light",
  title: "18 Watt Down Light",
  breadcrumb: "18 Watt",
  breadcrumbs: indoorBreadcrumb("18 Watt"),
  metaDescription: "18 Watt Down Light — NT-DL-18R / NT-DL-18S. ≥1650 lm.",
  imageUnlit: "/images/products/18_watt_down_light.jpg",
  imageLit: "/images/products/lit/18_watt.jpg",
  modelNumbers: { round: "NT-DL-18R", square: "NT-DL-18S" },
  keyHighlights: downlightHighlights("≥ 1650 lm"),
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "dual",
      rows: [
        { label: "Shape", round: "Round", square: "Square" },
        { label: "Outer Diameter", round: "160MM", square: "160×160MM" },
        { label: "Cutout Diameter", round: "145MM", square: "145×145MM" },
      ],
    },
    polycarbonateMaterial(),
    electricalTable("18 Watt", "≥ 1650 lm"),
    LED_TABLE,
  ],
};

export const twentyFourWattDownLight: ProductDetail = {
  ...sixWattDownLight,
  slug: "24-watt-down-light",
  title: "24 Watt Down Light (1×1)",
  breadcrumb: "24 Watt",
  breadcrumbs: indoorBreadcrumb("24 Watt"),
  metaDescription: "24 Watt 1×1 Down Light — NT-1X12DL-24S. ≥2400 lm.",
  imageUnlit: "/images/products/40_watt_down_light.jpg",
  imageLit: "/images/products/lit/12_watt.jpg",
  modelNumbers: undefined,
  modelSquare: "NT-1X12DL-24S",
  keyHighlights: downlightHighlights("≥ 2400 lm"),
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "single",
      rows: [
        { label: "Shape", value: "Square" },
        { label: "Outer Diameter", value: "295×295MM" },
        { label: "Cutout Diameter", value: "270×270MM" },
      ],
    },
    crcaMaterial(),
    electricalTable("24 Watt", "≥ 2400 lm"),
    LED_TABLE,
  ],
  applications: [...CLEAN_ROOM_APPS],
};

export const fortyWattDownLight: ProductDetail = {
  ...sixWattDownLight,
  slug: "40-watt-down-light",
  title: "40 Watt Down Light (2×2)",
  breadcrumb: "40 Watt",
  breadcrumbs: indoorBreadcrumb("40 Watt"),
  metaDescription: "40 Watt 2×2 Downlight — NT-2X2DL-40S. ≥4000 lm.",
  imageUnlit: "/images/products/40_watt_down_light.jpg",
  imageLit: "/images/products/lit/12_watt.jpg",
  modelNumbers: undefined,
  modelSquare: "NT-2X2DL-40S",
  keyHighlights: downlightHighlights("≥ 4000 lm"),
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "single",
      rows: [
        { label: "Shape", value: "Square" },
        { label: "Outer Diameter", value: "610×610MM" },
        { label: "Cutout Diameter", value: "570×570MM" },
      ],
    },
    crcaMaterial(),
    electricalTable("40 Watt", "≥ 4000 lm"),
    LED_TABLE,
  ],
  applications: [...CLEAN_ROOM_APPS],
};

export const fortyWattCleanRoom: ProductDetail = {
  ...fortyWattDownLight,
  slug: "40-watt-clean-room-down-light",
  title: "40 Watt Down Light (2×2 Clean Room)",
  breadcrumb: "40 Watt Clean Room",
  breadcrumbs: indoorBreadcrumb("40 Watt Clean Room"),
  metaDescription: "40 Watt 2×2 Clean Room Downlight — NT-2X2DL-40S.",
  imageUnlit: "/images/products/40_watt_down_light_clean_room.jpg",
  imageLit: "/images/products/lit/12_watt.jpg",
};

export const sixtyWattCleanRoom: ProductDetail = {
  ...fortyWattDownLight,
  slug: "60-watt-clean-room-down-light",
  title: "60 Watt Down Light (2×2 Clean Room)",
  breadcrumb: "60 Watt Clean Room",
  breadcrumbs: indoorBreadcrumb("60 Watt Clean Room"),
  metaDescription: "60 Watt 2×2 Clean Room Downlight — NT-2X2DL-60S. ≥6000 lm.",
  imageUnlit: "/images/products/40_watt_down_light_clean_room.jpg",
  imageLit: "/images/products/lit/12_watt.jpg",
  modelSquare: "NT-2X2DL-60S",
  keyHighlights: downlightHighlights("≥ 6000 lm"),
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "single",
      rows: [
        { label: "Shape", value: "Square" },
        { label: "Outer Diameter", value: "610×610MM" },
        { label: "Cutout Diameter", value: "570×570MM" },
      ],
    },
    crcaMaterial(),
    electricalTable("60 Watt", "≥ 6000 lm"),
    LED_TABLE,
  ],
};

/* ─── Outdoor Street Light ─── */

const streetHighlights: KeyHighlight[] = [
  {
    icon: "brightness",
    title: "High Brightness",
    description: "≥ 2650 lumens output",
  },
  {
    icon: "surge",
    title: "Surge Protection",
    description: "Up to 2.5 KV for safety",
  },
  {
    icon: "weather",
    title: "Durable & Weatherproof",
    description: "Designed for outdoor conditions",
  },
  {
    icon: "voltage",
    title: "Wide Voltage Range",
    description: "90–270 VAC for stable performance",
  },
];

export const twentyFiveWattStreetLight: ProductDetail = {
  slug: "25-watt-street-light",
  title: "25 Watt Street Light",
  brand: "Whites",
  category: "Outdoor Lights",
  categoryHref: "/products/outdoor",
  subGroup: "street-light",
  pageType: "spec",
  breadcrumb: "25 Watt Street Light",
  breadcrumbs: outdoorBreadcrumb(
    "Street Light",
    "/products/outdoor/25-watt-street-light",
    "25 Watt Street Light"
  ),
  metaDescription:
    "25 Watt Street Light — NT-SL-25E. ≥2650 lm, aluminium extruded housing.",
  imageUnlit: "/images/products/25_watt_street_light.jpg",
  imageLit: "/images/products/lit/25_watt_street_light.png",
  modelNumber: "NT-SL-25E",
  keyHighlights: streetHighlights,
  tables: [
    {
      title: "Mechanical Parameters",
      columns: "single",
      rows: [
        { label: "Shape", value: "Rectangle" },
        { label: "Size", value: "120MM × 260MM × 40MM" },
      ],
    },
    {
      title: "Material Properties",
      columns: "single",
      rows: [
        {
          label: "Body Material",
          value: "Aluminium extruded housing with PP powder coating",
        },
        { label: "Body Colour", value: "White" },
        { label: "Diffuser Transparency", value: "≥ 98%" },
        { label: "Screw Material", value: "SS" },
      ],
    },
    electricalTable("25 Watt", "≥ 2650 lm"),
    LED_TABLE,
  ],
  applications: [
    "Residential Society",
    "Village Road",
    "Highway Roads",
    "Farm House",
    "Gardens",
    "Commercial Complex",
  ],
  features: [...STANDARD_FEATURES],
};

const pSeriesMatrix: MatrixTableData = {
  headers: [
    "Power",
    "Model Number",
    "Lumens Output",
    "Pipe Diameter",
    "Beam Angle",
    "Input Voltage",
    "CCT",
    "CRI",
    "LED Type",
    "LED Make",
  ],
  rows: [
    ["15 Watt", "WT-SLP-15", ">1500", "42 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["24 Watt", "WT-SLP-24", ">2500", "42 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["30 Watt", "WT-SLP-30", ">3000", "42 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["36 Watt", "WT-SLP-36", ">3600", "42 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["48 Watt", "WT-SLP-48", ">4800", "42 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["60 Watt", "WT-SLP-60", ">6000", "42 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["60 Watt", "WT-SLXL-60", ">6000", "54 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["90 Watt", "WT-SLXL-90", ">9000", "54 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["120 Watt", "WT-SLXL-120", ">12000", "54 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
    ["150 Watt", "WT-SLXL-150", ">15000", "54 mm", "120°", "90–270 VAC", "3000K / 4000K / 6500K", "≥80", "Mid Power", "Osram / Everlight / Bridgelux"],
  ],
};

export const pSeriesStreetLight: ProductDetail = {
  slug: "p-series-street-light",
  title: "P Series",
  brand: "Whites",
  category: "Outdoor Lights",
  categoryHref: "/products/outdoor",
  subGroup: "street-light",
  pageType: "matrix",
  breadcrumb: "P Series",
  breadcrumbs: outdoorBreadcrumb(
    "Street Light",
    "/products/outdoor/25-watt-street-light",
    "P Series"
  ),
  metaDescription:
    "P Series Street Lights — 15W to 150W modular range with superior lumens output.",
  imageUnlit: "/images/products/p_series_x1.jpg",
  imageLit: "/images/products/lit/p_series_x1.png",
  matrix: pSeriesMatrix,
  tables: [],
  applications: [],
  features: [],
};

/* ─── Outdoor Flood Light ─── */

const downChokeMatrix: MatrixTableData = {
  headers: [
    "Specification",
    "20 Watt",
    "30 Watt",
    "60 Watt",
    "100 Watt",
    "150 Watt",
    "200 Watt",
  ],
  rows: [
    ["Model Number", "WT-FLD-20", "WT-FLD-30", "WT-FLD-60", "WT-FLD-100", "WT-FLD-150", "WT-FLD-200"],
    ["Lumens Output", ">2000 lm", ">3000 lm", ">6000 lm", ">10000 lm", ">15000 lm", ">20000 lm"],
    ["Beam Angle", "120°", "120°", "120°", "120°", "120°", "120°"],
    ["Input Voltage", "90–270 VAC", "90–270 VAC", "90–270 VAC", "90–270 VAC", "90–270 VAC", "90–270 VAC"],
    ["CCT", "3000K / 4000K / 6500K", "3000K / 4000K / 6500K", "3000K / 4000K / 6500K", "3000K / 4000K / 6500K", "3000K / 4000K / 6500K", "3000K / 4000K / 6500K"],
    ["CRI", ">80", ">80", ">80", ">80", ">80", ">80"],
    ["LED Type", "Mid Power", "Mid Power", "Mid Power", "Mid Power", "Mid Power", "Mid Power"],
    ["LED Make", "Osram / Everlight / Bridgelux", "Osram / Everlight / Bridgelux", "Osram / Everlight / Bridgelux", "Osram / Everlight / Bridgelux", "Osram / Everlight / Bridgelux", "Osram / Everlight / Bridgelux"],
    ["Body Material", "Aluminium Die Cast", "Aluminium Die Cast", "Aluminium Die Cast", "Aluminium Die Cast", "Aluminium Die Cast", "Aluminium Die Cast"],
  ],
};

export const downChokeFloodLight: ProductDetail = {
  slug: "down-choke",
  title: "Down Choke",
  brand: "Whites",
  category: "Outdoor Lights",
  categoryHref: "/products/outdoor",
  subGroup: "flood-light",
  pageType: "matrix",
  breadcrumb: "Down Choke",
  breadcrumbs: outdoorBreadcrumb(
    "Flood Light",
    "/products/outdoor/down-choke",
    "Down Choke"
  ),
  metaDescription:
    "Down Choke Flood Lights — 20W to 200W aluminium die cast housings.",
  imageUnlit: "/images/products/25_watt_flood_light.jpg",
  imageLit: "/images/products/lit/flood_25.jpg",
  matrix: downChokeMatrix,
  tables: [],
  applications: [],
  features: [],
};

const backChokeMatrix: MatrixTableData = {
  headers: ["Specification", "50 Watt", "100 Watt"],
  rows: [
    ["Model Number", "WT-FLB-50", "WT-FLB-100"],
    ["Lumens Output", ">5000 lm", ">10000 lm"],
    ["Beam Angle", "120°", "120°"],
    ["Input Voltage", "90–270 VAC", "90–270 VAC"],
    ["CCT", "3000K / 4000K / 6500K", "3000K / 4000K / 6500K"],
    ["CRI", ">80", ">80"],
    ["LED Type", "Mid Power", "Mid Power"],
    ["LED Make", "Osram / Everlight / Bridgelux", "Osram / Everlight / Bridgelux"],
    ["Body Material", "Aluminium Die Cast", "Aluminium Die Cast"],
  ],
};

export const backChokeFloodLight: ProductDetail = {
  slug: "back-choke",
  title: "Back Choke",
  brand: "Whites",
  category: "Outdoor Lights",
  categoryHref: "/products/outdoor",
  subGroup: "flood-light",
  pageType: "matrix",
  breadcrumb: "Back Choke",
  breadcrumbs: outdoorBreadcrumb(
    "Flood Light",
    "/products/outdoor/down-choke",
    "Back Choke"
  ),
  metaDescription: "Back Choke Flood Lights — 50W and 100W aluminium die cast.",
  imageUnlit: "/images/products/50_watt_flood_light.jpg",
  imageLit: "/images/products/lit/flood_50.jpg",
  matrix: backChokeMatrix,
  tables: [],
  applications: [],
  features: [],
};

/* ─── Powertronics ─── */

function powertronicsBreadcrumb(label: string) {
  return [
    { label: "Powertronics", href: "/products/powertronics" },
    { label },
  ];
}

const driverTable = (type: string): SpecTable => ({
  title: "Technical Parameters",
  columns: "single",
  rows: [
    { label: "Input Voltage", value: "90–270VAC" },
    { label: "Power Factor", value: "≥ 0.95" },
    { label: "THD", value: "≤ 10%" },
    { label: "Surge", value: "2.5 KV" },
    { label: "Protection", value: "No load, Short Circuit" },
    { label: "Driver Efficiency", value: "≥ 85%" },
    { label: "Type", value: type },
  ],
});

export const powertronicsIsolated: ProductDetail = {
  slug: "isolated",
  title: "Isolated",
  brand: "Powertronics",
  category: "Powertronics",
  categoryHref: "/products/powertronics",
  subGroup: "powertronics",
  pageType: "spec",
  breadcrumb: "Isolated",
  breadcrumbs: powertronicsBreadcrumb("Isolated"),
  metaDescription:
    "Isolated LED drivers by Powertronics — ≥85% efficiency, BIS compliant.",
  imageUnlit: "/images/products/powertronics_1.jpg",
  imageLit: "/images/products/powertronics_2.jpg",
  keyHighlights: [
    { icon: "voltage", title: "Wide Input", description: "90–270 VAC universal input" },
    { icon: "power", title: "High Efficiency", description: "≥ 85% driver efficiency" },
    { icon: "surge", title: "Surge Protection", description: "2.5 KV built-in protection" },
    { icon: "bis", title: "Reliable", description: "No load & short circuit protection" },
  ],
  tables: [driverTable("Isolated")],
  applications: [
    "Indoor Lighting",
    "Outdoor Lighting",
    "Industrial Luminaires",
    "OEM Applications",
  ],
  features: [
    "Isolated topology for safety",
    "High power factor ≥ 0.95",
    "Low THD ≤ 10%",
    "In-house design & manufacturing",
  ],
};

export const powertronicsNonIsolated: ProductDetail = {
  ...powertronicsIsolated,
  slug: "non-isolated",
  title: "Non-Isolated",
  breadcrumb: "Non-Isolated",
  breadcrumbs: powertronicsBreadcrumb("Non-Isolated"),
  metaDescription: "Non-Isolated LED drivers by Powertronics — compact, efficient.",
  imageUnlit: "/images/products/powertronics_3.jpg",
  imageLit: "/images/products/powertronics_4.jpg",
  tables: [driverTable("Non-Isolated")],
  features: [
    "Compact non-isolated design",
    "High power factor ≥ 0.95",
    "Low THD ≤ 10%",
    "Cost-effective OEM solution",
  ],
};

export const allProducts: ProductDetail[] = [
  sixWattDownLight,
  twelveWattDownLight,
  eighteenWattDownLight,
  twentyFourWattDownLight,
  fortyWattDownLight,
  fortyWattCleanRoom,
  sixtyWattCleanRoom,
  twentyFiveWattStreetLight,
  pSeriesStreetLight,
  downChokeFloodLight,
  backChokeFloodLight,
  powertronicsIsolated,
  powertronicsNonIsolated,
];
