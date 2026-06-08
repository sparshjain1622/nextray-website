export interface ProductItem {
  title: string;
  imageUnlit: string;
  imageLit: string;
}

export interface BrandProduct extends ProductItem {
  description: string;
}

export const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    children: [
      { label: "Nextray Technologies", href: "/about" },
      { label: "Why Choose Us", href: "/about/why-choose-us" },
      { label: "Founders", href: "/about/founders" },
      { label: "Vision & Mission", href: "/about/vision-mission" },
      { label: "Certifications", href: "/about/certifications" },
      { label: "Quality Policy", href: "/about/quality-policy" },
    ],
  },
  {
    label: "Products Range",
    children: [
      { label: "Indoor Lights", href: "/products/indoor" },
      { label: "Outdoor Lights", href: "/products/outdoor" },
      { label: "Industrial Lights", href: "/products/industrial" },
      { label: "Powertronics", href: "/products/powertronics" },
    ],
  },
  { label: "Be Our Associates", href: "/associates" },
  {
    label: "Our Strength",
    children: [
      { label: "Infrastructure", href: "/strength/infrastructure" },
      { label: "Our Presence", href: "/strength/our-presence" },
    ],
  },
  {
    label: "Gallery",
    children: [
      { label: "Projects", href: "/gallery/projects" },
      { label: "Events", href: "/gallery/events" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export const heroFeatures = [
  { icon: "leaf", label: "Up to 70% Power Saving" },
  { icon: "wrench", label: "Maintenance Free" },
  { icon: "shield", label: "Reliable Performance" },
  { icon: "clock", label: "Long Life Up to 50,000 Hrs" },
  { icon: "award", label: "Best Quality Assured" },
] as const;

export function heroProductTabLabel(title: string): string {
  const labels: Record<string, string> = {
    "25 Watt Street Light": "25W Street",
    "50 Watt Street Light": "50W Street",
    "P series 15 Watt to 150 Watt": "P Series 15W to 150W",
    "100 Watt High Bay Light": "100W High Bay",
    "150 Watt High Bay Light": "150W High Bay",
  };
  return labels[title] ?? title;
}

export const areasWeServeSubtitle =
  "High performance lighting solutions tailored for every industrial and commercial environment.";

export const areasWeServe = [
  {
    title: "Indoor Lighting",
    description:
      "Efficient and reliable lighting solutions for offices, commercial spaces and institutions.",
    icon: "armchair",
    imageUnlit: "/images/areas/indoor_lighting.jpg",
    imageLit: "/images/gallery/1.jpg",
    href: "/products/indoor",
  },
  {
    title: "Outdoor Lighting",
    description:
      "Durable and weatherproof lighting for streets, pathways, gardens and public spaces.",
    icon: "lamp",
    imageUnlit: "/images/areas/outdoor_lighting.jpg",
    imageLit: "/images/gallery/2.jpg",
    href: "/products/outdoor",
  },
  {
    title: "Industrial Lighting",
    description:
      "High-performance luminaires designed for factories, warehouses and heavy-duty applications.",
    icon: "factory",
    imageUnlit: "/images/areas/industrial_lighting.jpg",
    imageLit: "/images/gallery/6.jpg",
    href: "/products/industrial",
  },
  {
    title: "OEM Supply",
    description:
      "End-to-end OEM lighting solutions tailored to your product requirements.",
    icon: "package",
    imageUnlit: "/images/areas/oem_supply.jpg",
    imageLit: "/images/gallery/5.jpg",
    href: "/about",
  },
] as const;

export const aboutContent = {
  title: "About Nextray",
  tagline: "Innovative today, Sustainable tomorrow.",
  description:
    "Nextray Technologies, A power house of innovation in solid state lighting, incepted in the year 2004. By continuous Research and Development we have innovated, designed and developed wide range of LED light products. We have powered products like Streetlight, Floodlight, High bay, High masts, Downlights which ranges from 6W to 300W.",
  href: "/about",
};

export const aboutHighlights = [
  { value: "2004", label: "Year Established" },
  { value: "6W–300W", label: "Product Range" },
  { value: "LED", label: "Solid State Lighting" },
] as const;

export const aboutFeatures = [
  {
    icon: "zap",
    title: "Innovative Solutions",
    description: "Cutting-edge LED technology for every application.",
  },
  {
    icon: "shield",
    title: "Trusted Quality",
    description: "BIS-approved products meeting the highest standards.",
  },
  {
    icon: "cog",
    title: "Advanced R&D",
    description: "In-house research driving continuous innovation.",
  },
  {
    icon: "leaf",
    title: "Sustainable Impact",
    description: "Eco-friendly lighting reducing carbon footprint.",
  },
] as const;

/** Brands We Deal — paired catalog (light) + night-lit (dark) images */
export const brandProducts: BrandProduct[] = [
  {
    title: "25 Watt Street Light",
    description:
      "Ideal for residential streets, lanes and pathways with superior energy savings.",
    imageUnlit: "/images/products/25_watt_street_light.jpg",
    imageLit: "/images/products/lit/25_watt_street_light.png",
  },
  {
    title: "50 Watt Street Light",
    description:
      "Perfect for wider roads and commercial areas requiring brighter illumination.",
    imageUnlit: "/images/products/50_watt_street_light.jpg",
    imageLit: "/images/products/lit/50_watt_street_light.png",
  },
  {
    title: "P series 15 Watt to 150 Watt",
    description:
      "Versatile modular street lighting range from 15W to 150W for diverse applications.",
    imageUnlit: "/images/products/p_series_x1.jpg",
    imageLit: "/images/products/lit/p_series_x1.png",
  },
  {
    title: "100 Watt High Bay Light",
    description:
      "Designed for warehouses, factories and industrial spaces with high ceilings.",
    imageUnlit: "/images/products/100_watt_high_bay_light.jpg",
    imageLit: "/images/products/lit/100_watt_high_bay_light.png",
  },
  {
    title: "150 Watt High Bay Light",
    description:
      "Heavy-duty high bay solution for large industrial and manufacturing facilities.",
    imageUnlit: "/images/products/150_watt_high_bay_light.jpg",
    imageLit: "/images/products/lit/150_watt_high_bay_light.png",
  },
];

export const clientsSubtitle =
  "Trusted by leading organizations across industries.";

export const clients = [
  "/images/clients/client1.jpg",
  "/images/clients/client2.jpg",
  "/images/clients/client3.jpg",
  "/images/clients/client4.jpg",
  "/images/clients/client5.jpg",
  "/images/clients/client6.jpg",
  "/images/clients/client7.jpg",
  "/images/clients/client8.jpg",
  "/images/clients/client9.jpg",
  "/images/clients/client11.jpg",
  "/images/clients/client12.jpg",
  "/images/clients/client13.jpg",
  "/images/clients/client14.jpg",
  "/images/clients/client15.jpg",
  "/images/clients/client16.jpg",
  "/images/clients/client17.jpg",
];

export const whyChooseUsSubtitle =
  "We combine advanced technology with rigorous quality standards to deliver lighting solutions you can rely on.";

export const whyChooseUs = [
  {
    title: "Up to 70% Power Saving",
    description:
      "Energy-efficient LED solutions that significantly reduce electricity consumption and operational costs.",
    icon: "zap",
  },
  {
    title: "Maintenance Free",
    description:
      "Durable, long-life products engineered for minimal upkeep and maximum performance.",
    icon: "wrench",
  },
  {
    title: "In-House R&D",
    description:
      "Dedicated, advanced and manufacturing to drive continuous innovation in solid state lighting.",
    icon: "flask",
  },
  {
    title: "BIS Approved Control Gear",
    description:
      "BIS approved control gear manufactured to fully meet national standards for safety and compliance.",
    icon: "shield",
  },
] as const;

export const companyStatsSubtitle =
  "Decades of innovation, powerful solutions and a commitment to energy efficiency.";

export const companyStats = [
  {
    value: "2004",
    label: "Year of Establishment",
    suffix: "",
    icon: "calendar",
  },
  { value: "6W", label: "Minimum Power", suffix: "", icon: "zap" },
  { value: "300W", label: "Maximum Power", suffix: "", icon: "chart" },
  { value: "70", label: "Power Saving", suffix: "%", icon: "leaf" },
] as const;

export const featuredProjectsSubtitle =
  "Explore our high-performance lighting solutions trusted by industries across the country.";

/** Featured Projects — same 5 paired products as Brands We Deal */
export const featuredProjects: ProductItem[] = brandProducts;

export function parseProductTitle(title: string): {
  wattage: string;
  category: string;
} {
  if (title.toLowerCase().startsWith("p series")) {
    return { wattage: "P SERIES", category: "15 Watt to 150 Watt" };
  }
  const match = title.match(/^(\d+)\s+Watt\s+(.+)$/i);
  if (match) {
    return { wattage: `${match[1]} WATT`, category: match[2] };
  }
  return { wattage: title.toUpperCase(), category: "LED Light" };
}

export const certifications = [
  {
    title: "Make in India",
    description: "Proudly manufactured in India.",
    image: "/images/strength/make_in_india.jpg",
  },
  {
    title: "Design Excellence",
    description: "Engineered for performance. Designed for the future.",
    image: "/images/strength/design_whites.jpg",
  },
  {
    title: "IS Mark Certified",
    description: "Certified quality. Trusted performance.",
    image: "/images/strength/is_mark.jpg",
  },
] as const;

export const ctaFeatures = [
  { icon: "headset", label: "Expert Support" },
  { icon: "shield", label: "Reliable Solutions" },
  { icon: "rupee", label: "Best Value" },
] as const;

export const footerDescription =
  "Nextray Technologies — a powerhouse of innovation in solid state LED lighting. Manufacturing energy-efficient solutions from 6W to 300W since 2004.";

export const footerFeatures = [
  {
    icon: "shield",
    title: "Reliable Quality",
    subtitle: "Trusted performance",
  },
  {
    icon: "zap",
    title: "Energy Efficient",
    subtitle: "Up to 70% saving",
  },
  {
    icon: "leaf",
    title: "Sustainable Solutions",
    subtitle: "Eco-friendly LED",
  },
] as const;

export const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products/outdoor" },
  { label: "Product Range", href: "/products/indoor" },
  { label: "Our Clients", href: "/#clients" },
  { label: "Projects", href: "/gallery/projects" },
  { label: "Certifications", href: "/about/certifications" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const footerContact = [
  {
    icon: "phone",
    value: "7096015151",
    href: "tel:7096015151",
    label: "Call Us",
  },
  {
    icon: "mail",
    value: "Sales@nextray-tech.com",
    href: "mailto:Sales@nextray-tech.com",
    label: "Email Us",
  },
  {
    icon: "map",
    value:
      "908/3 GIDC Makarpura, Opp. to Kiran Motors Service Center, Vadodara - 390010 Gujarat - India",
    label: "Visit Us",
  },
  {
    icon: "clock",
    value: "Mon - Sat: 9:00 AM - 6:00 PM",
    subValue: "Sunday: Closed",
    label: "Working Hours",
  },
] as const;

export const footerSocial = [
  { icon: "linkedin", href: "#", label: "LinkedIn" },
  { icon: "facebook", href: "#", label: "Facebook" },
  { icon: "instagram", href: "#", label: "Instagram" },
  { icon: "youtube", href: "#", label: "YouTube" },
] as const;

export const footerLegal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Use", href: "#" },
  { label: "Sitemap", href: "#" },
] as const;
