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

export const heroContent = {
  subheading:
    "Nextray Technologies Pvt. Ltd. is a leading Indian manufacturer of high-quality LED lighting solutions, backed by over 20 years of proven industry expertise across residential, commercial, industrial, customized and specialised applications.",
};

export const heroFeatures = [
  {
    icon: "layers",
    label: "Vertically Integrated Manufacturing",
  },
  {
    icon: "award",
    label: "20+ Years of Expertise",
  },
  {
    icon: "flask",
    label: "Strong R&D",
  },
  {
    icon: "shield",
    label: "Quality & Reliability",
  },
  {
    icon: "rupee",
    label: "Cost Effective Solutions",
  },
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
  "Complete design and manufacturing of LED lighting products — indoor, outdoor, industrial, commercial and specialty solutions.";

export const areasWeServe = [
  {
    title: "Commercial & Residential",
    description:
      "Office, retail, hospital and architectural lighting — plus down lights, COB and decorative luminaires for modern spaces.",
    icon: "armchair",
    imageUnlit: "/images/areas/indoor_lighting.jpg",
    imageLit: "/images/gallery/1.jpg",
    href: "/products/indoor",
  },
  {
    title: "Outdoor Lighting",
    description:
      "Solar and AC streetlights, floodlights, high masts and landscape lighting — engineered for durability and weather resistance.",
    icon: "lamp",
    imageUnlit: "/images/areas/outdoor_lighting.jpg",
    imageLit: "/images/gallery/2.jpg",
    href: "/products/outdoor",
  },
  {
    title: "Industrial Lighting",
    description:
      "High bay, low bay, flameproof and cleanroom luminaires — high-performance solutions for factories, warehouses and heavy-duty environments.",
    icon: "factory",
    imageUnlit: "/images/areas/industrial_lighting.jpg",
    imageLit: "/images/gallery/6.jpg",
    href: "/products/industrial",
  },
  {
    title: "OEM & Custom Solutions",
    description:
      "Full-spectrum OEM manufacturing, bespoke product development and smart lighting — DALI, Zigbee, Bluetooth and RMS cloud-based systems.",
    icon: "package",
    imageUnlit: "/images/areas/oem_supply.jpg",
    imageLit: "/images/gallery/5.jpg",
    href: "/about",
  },
] as const;

export const areasWeServeCta = {
  prefix: "Need custom engineering or OEM manufacturing?",
  highlight: "Let's build it together.",
};

export const aboutContent = {
  title: "About Nextray",
  tagline: "Innovative today, Sustainable tomorrow.",
  taglineShort:
    "Illuminating Excellence — a leading Indian LED manufacturer since 2004.",
  description:
    "Nextray Technologies Pvt. Ltd. is at the forefront of India's lighting industry — combining advanced technology, in-house manufacturing excellence, and a relentless focus on innovation. With vertically integrated facilities spanning die casting, metal fabrication, PCB manufacturing, SMT assembly and driver production, we deliver precision-engineered LED solutions from concept to mass production. Our mission is rooted in a simple belief — our customers come first. Every product is manufactured to meet and exceed the evolving needs of professional customers across diverse industries and global markets.",
  href: "/about",
};

export const aboutHighlights = [
  { value: "20+", label: "Years Experience" },
  { value: "3", label: "Manufacturing Units" },
  { value: "SSL", label: "Solid State Lighting" },
] as const;

export const aboutFeatures = [
  {
    icon: "zap",
    title: "LED Lighting Manufacturing",
    description:
      "Complete design and manufacturing for indoor, outdoor, industrial, commercial and specialty applications.",
  },
  {
    icon: "package",
    title: "OEM Services",
    description:
      "Full-spectrum white-label manufacturing partnering with leading global brands at scale.",
  },
  {
    icon: "cog",
    title: "Custom Engineering",
    description:
      "Bespoke development from concept and design to prototyping and mass production.",
  },
  {
    icon: "layers",
    title: "LED Components",
    description:
      "In-house die cast housings, MCPCB, LED drivers and fabricated sheet metal enclosures.",
  },
] as const;

/** Brands We Deal — paired catalog (light) + night-lit (dark) images */
export const brandProducts: BrandProduct[] = [
  {
    title: "25 Watt Street Light",
    description:
      "Extrusion-based street lighting with superior thermal management — ideal for residential streets, lanes and pathways.",
    imageUnlit: "/images/products/25_watt_street_light.jpg",
    imageLit: "/images/products/lit/25_watt_street_light.png",
  },
  {
    title: "50 Watt Street Light",
    description:
      "Precision-engineered AC streetlight for wider roads and commercial areas — built for structural durability and optical performance.",
    imageUnlit: "/images/products/50_watt_street_light.jpg",
    imageLit: "/images/products/lit/50_watt_street_light.png",
  },
  {
    title: "P series 15 Watt to 150 Watt",
    description:
      "Versatile modular street lighting range from 15W to 150W — customizable for diverse outdoor and public-space applications.",
    imageUnlit: "/images/products/p_series_x1.jpg",
    imageLit: "/images/products/lit/p_series_x1.png",
  },
  {
    title: "100 Watt High Bay Light",
    description:
      "Mid-power LED high bay luminaire for warehouses and large industrial facilities — energy-efficient with in-house driver technology.",
    imageUnlit: "/images/products/100_watt_high_bay_light.jpg",
    imageLit: "/images/products/lit/100_watt_high_bay_light.png",
  },
  {
    title: "150 Watt High Bay Light",
    description:
      "Heavy-duty high bay solution for manufacturing plants and high-ceiling industrial spaces — reliable, flicker-free performance.",
    imageUnlit: "/images/products/150_watt_high_bay_light.jpg",
    imageLit: "/images/products/lit/150_watt_high_bay_light.png",
  },
];

export const clientsSubtitle =
  "Trusted by leading organizations across industries — a preferred lighting partner across India and global markets.";

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
  "Vertically integrated manufacturing, decades of expertise and a customer-first approach — setting new benchmarks in quality, performance and value.";

export const whyChooseUs = [
  {
    title: "Vertically Integrated",
    description:
      "Five in-house capabilities — die casting, metal fabrication, PCB manufacturing, SMT assembly and driver production — ensuring end-to-end quality and cost efficiency.",
    icon: "layers",
  },
  {
    title: "20+ Years of Expertise",
    description:
      "Decades of deep domain knowledge in LED manufacturing and OEM delivery across diverse industries and markets.",
    icon: "award",
  },
  {
    title: "Strong R&D",
    description:
      "Our dedicated R&D center brings together experienced engineers, lighting designers and technology specialists for next-generation solutions.",
    icon: "flask",
  },
  {
    title: "Quality & Reliability",
    description:
      "Stringent multi-stage quality controls ensuring every luminaire meets consistent, dependable standards before leaving the floor.",
    icon: "shield",
  },
  {
    title: "Faster Turnaround",
    description:
      "In-house operations across three manufacturing units ensure quick delivery and reduced lead times for every order.",
    icon: "clock",
  },
  {
    title: "Cost Effective Solutions",
    description:
      "Competitive pricing delivered through lean, efficient and vertically integrated manufacturing — without compromising quality.",
    icon: "rupee",
  },
] as const;

export const whyChooseUsCta = {
  bold: "Vertically Integrated. Customer First. Quality Assured.",
};

export const companyStatsSubtitle =
  "Over two decades of innovation — vertically integrated manufacturing powering precision-engineered LED solutions.";

export const companyStats = [
  {
    value: "20",
    label: "Years of Expertise",
    suffix: "+",
    icon: "calendar",
  },
  {
    value: "3",
    label: "Manufacturing Units",
    suffix: "",
    icon: "factory",
  },
  {
    value: "5",
    label: "In-House Capabilities",
    suffix: "",
    icon: "layers",
  },
  {
    value: "2004",
    label: "Year Founded",
    suffix: "",
    icon: "award",
  },
] as const;

export const featuredProjectsSubtitle =
  "Precision-engineered LED luminaires — from street lights and flood lights to high bays, trusted by industries nationwide.";

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
    description: "Proudly designed and manufactured in India with world-class infrastructure.",
    image: "/images/strength/make_in_india.jpg",
  },
  {
    title: "Design Excellence",
    description: "Revolutionary extrusion and die-cast engineering — built for performance and the future.",
    image: "/images/strength/design_whites.jpg",
  },
  {
    title: "IS Mark Certified",
    description: "Certified quality with stringent multi-stage controls — trusted performance you can rely on.",
    image: "/images/strength/is_mark.jpg",
  },
] as const;

export const ctaContent = {
  title: "Ready to Illuminate Your Project?",
  description:
    "Partner with a vertically integrated LED manufacturer for expert consultation, custom OEM solutions and competitive pricing across indoor, outdoor, industrial and specialty lighting.",
};

export const ctaFeatures = [
  { icon: "headset", label: "Expert Support" },
  { icon: "shield", label: "OEM Partnership" },
  { icon: "rupee", label: "Best Value" },
] as const;

export const footerDescription =
  "Nextray Technologies Pvt. Ltd. — a globally recognized leader in solid state lighting. Vertically integrated manufacturing of precision-engineered LED solutions since 2004.";

export const footerFeatures = [
  {
    icon: "shield",
    title: "Quality & Reliability",
    subtitle: "Multi-stage QC",
  },
  {
    icon: "layers",
    title: "Vertically Integrated",
    subtitle: "End-to-end manufacturing",
  },
  {
    icon: "flask",
    title: "Strong R&D",
    subtitle: "Continuous innovation",
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
    value: "sales@nextray-tech.com",
    href: "mailto:sales@nextray-tech.com",
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
