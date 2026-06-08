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

export interface ProductHighlight {
  label: string;
  value: string;
}

export interface ProductBreadcrumb {
  label: string;
  href?: string;
}

export interface KeyHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface MatrixTableData {
  headers: string[];
  rows: string[][];
}

export interface ProductDetail {
  slug: string;
  title: string;
  brand: string;
  category: string;
  categoryHref: string;
  subGroup?: "down-light" | "street-light" | "flood-light" | "powertronics";
  pageType: "spec" | "matrix";
  breadcrumb: string;
  breadcrumbs: ProductBreadcrumb[];
  metaDescription: string;
  imageUnlit: string;
  imageLit: string;
  modelNumber?: string;
  modelNumbers?: { round: string; square: string };
  modelSquare?: string;
  highlights?: ProductHighlight[];
  keyHighlights?: KeyHighlight[];
  tables: SpecTable[];
  matrix?: MatrixTableData;
  applications: string[];
  features: string[];
}
