export const aboutSubnav = [
  { label: "Nextray Technologies", href: "/about" },
  { label: "Why Choose Us", href: "/about/why-choose-us" },
  { label: "Founders", href: "/about/founders" },
  { label: "Vision & Mission", href: "/about/vision-mission" },
  { label: "Development Milestones", href: "/about/milestones" },
  { label: "Infrastructure", href: "/about/infrastructure" },
  { label: "Certifications", href: "/about/certifications" },
  { label: "Quality Policy", href: "/about/quality-policy" },
] as const;

export type AboutPageSlug =
  | "nextray"
  | "why-choose-us"
  | "founders"
  | "vision-mission"
  | "milestones"
  | "infrastructure"
  | "certifications"
  | "quality-policy";

export interface AboutSection {
  title?: string;
  paragraphs?: string[];
  items?: string[];
}

export interface FounderProfile {
  name: string;
  bio: string;
}

export interface CertificationItem {
  title: string;
  image?: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
}

export interface InfrastructureUnit {
  title: string;
  capabilities: string[];
  description: string;
}

export interface AboutPageData {
  slug: AboutPageSlug;
  title: string;
  metaDescription: string;
  breadcrumb: string;
  intro?: string[];
  sections?: AboutSection[];
  founders?: FounderProfile[];
  certifications?: CertificationItem[];
  objectives?: string[];
  milestones?: MilestoneItem[];
  infrastructure?: InfrastructureUnit[];
  quote?: string;
}

export const aboutPages: Record<AboutPageSlug, AboutPageData> = {
  nextray: {
    slug: "nextray",
    title: "Nextray Technologies",
    metaDescription:
      "Nextray Technologies Pvt. Ltd. — leading Indian manufacturer of LED lighting solutions with over 20 years of proven industry expertise.",
    breadcrumb: "Nextray Technologies",
    intro: [
      "Nextray Technologies Pvt. Ltd. is a leading Indian manufacturer of high-quality LED lighting solutions, proudly backed by over 20 years of proven industry expertise. Since our inception, we have been at the forefront of India's lighting industry — combining advanced technology, in-house manufacturing excellence, and a relentless focus on innovation to deliver superior lighting solutions across residential, commercial, industrial, customized and specialised applications.",
      "With a vertically integrated manufacturing facility, a dedicated R&D division, and a highly skilled team of professionals, we are committed to setting new benchmarks in quality, performance and customer value — making us a preferred lighting solution partner across India and global markets.",
    ],
  },
  "why-choose-us": {
    slug: "why-choose-us",
    title: "Why We Deliver Better",
    metaDescription:
      "Why Nextray Technologies delivers better — vertically integrated manufacturing, 20+ years expertise, strong R&D, and cost-effective LED solutions.",
    breadcrumb: "Why Choose Us",
    intro: [
      "Innovation, quality and end-to-end manufacturing excellence — here's what sets Nextray Technologies apart as your LED lighting partner.",
    ],
    sections: [
      {
        title: "Vertically Integrated",
        paragraphs: [
          "Our vertically integrated facilities house five core in-house manufacturing capabilities — Die Casting, Metal Fabrication, PCB manufacturing, SMT assembly, and Driver production. This end-to-end manufacturing control eliminates external dependencies, accelerates production cycles, ensures consistent quality at every stage, and delivers superior cost efficiency for every product we manufacture.",
        ],
      },
      {
        title: "20+ Years of Expertise",
        paragraphs: [
          "Decades of deep domain knowledge in LED manufacturing and OEM delivery across diverse industries.",
        ],
      },
      {
        title: "Strong R&D",
        paragraphs: [
          "Innovation is not just a goal — it is a discipline. Our dedicated R&D center brings together experienced engineers, lighting designers, and technology specialists who work relentlessly to develop next-generation lighting solutions.",
        ],
      },
      {
        title: "Quality & Reliability",
        paragraphs: [
          "Stringent multi-stage quality controls ensuring every product meets consistent, dependable standards.",
        ],
      },
      {
        title: "Faster Turnaround",
        paragraphs: [
          "In-house operations ensure quick delivery and reduced lead time.",
        ],
      },
      {
        title: "Cost Effective Solutions",
        paragraphs: [
          "Competitive pricing delivered through lean, efficient and vertically integrated manufacturing.",
        ],
      },
    ],
  },
  founders: {
    slug: "founders",
    title: "Founders",
    metaDescription:
      "Meet the founders of Nextray Technologies — Hardik Patel and Chinkesh Patel.",
    breadcrumb: "Founders",
    founders: [
      {
        name: "Hardik Patel",
        bio: "Completed his M.Sc. In Instrumentation Technology from S.P. University, V.V. Nagar, and B.Sc. In Instrumentation Technology from M.S. University, Vadodara. His way of doing things differently puts him in the role of designing technically brilliant and elegant products. He has been involved in Manufacturing and Designing of LED Lights since 2008.",
      },
      {
        name: "Chinkesh Patel",
        bio: "Finished his Post graduation of M.Sc. In Display Technology from University of Dundee, Scotland, B.E. in Electronics and Communication from SVIT, Vasad. Immense knowledge of LED lighting technology, vast experience and global exposure allows him to fit in the role of sales and marketing. And has been doing the same since 2004.",
      },
    ],
  },
  "vision-mission": {
    slug: "vision-mission",
    title: "Vision & Mission",
    metaDescription:
      "Nextray Technologies vision and mission — globally recognized leader in solid state lighting.",
    breadcrumb: "Vision & Mission",
    sections: [
      {
        title: "Our Vision",
        paragraphs: [
          "Nextray Technologies Private Limited strives to be a globally recognized leader in Solid State Lighting — delivering precision-engineered, high-performance lighting solutions to professional customers across diverse industries and markets.",
        ],
      },
      {
        title: "Our Mission",
        paragraphs: [
          "At Nextray Technologies, we transform revolutionary ideas into revolutionary quality LED products. Our mission is rooted in a simple yet powerful belief — our customers come first. We are steadfastly committed to delivering the highest standards of quality, ensuring that every product we manufacture meets and exceeds the evolving needs and demands of our customers.",
          "With a vertically integrated manufacturing facility, a dedicated R&D division, and a highly skilled team of professionals, we are committed in setting new benchmarks in quality, performance and customer value – making us a preferred lighting solution partner across India and global markets.",
        ],
      },
    ],
  },
  milestones: {
    slug: "milestones",
    title: "Development Milestones",
    metaDescription:
      "Nextray Technologies development milestones from 2006 to 2025 — innovation in solid state LED lighting.",
    breadcrumb: "Development Milestones",
    intro: [
      "Over two decades of continuous innovation — from automotive LED strips to fully vertically integrated solid state lighting manufacturing.",
    ],
    milestones: [
      {
        year: "2006",
        title: "The Foundation",
        description:
          "Incorporated as a specialized manufacturer of LED strip lighting for automotive under-car applications — driven by a bold vision to lead India's lighting industry.",
      },
      {
        year: "2007",
        title: "First Strategic Expansion",
        description:
          "Strategically expanded product portfolio into LED sign board solutions — catering to commercial retail, outdoor advertising, and corporate branding applications.",
      },
      {
        year: "2009",
        title: "Entry into Solid State Lighting (SSL)",
        description:
          "Commenced manufacturing of Solid-State Lighting products — launching precision-engineered 1W, 3W, and 6W LED bulbs, marking a transformational shift into the general lighting market.",
      },
      {
        year: "2011",
        title: "Industrial LED High Bay Lighting",
        description:
          "Entered the industrial lighting segment with the development of LED high bay luminaires using Mid-Power LED technology — delivering energy-efficient solutions for warehouses and large industrial facilities.",
      },
      {
        year: "2014",
        title: "Revolutionary Extrusion-Based Design",
        description:
          "Designed and developed a revolutionary extrusion process-based manufacturing approach for street lights and flood lights — delivering superior thermal management, structural durability, and enhanced optical performance.",
      },
      {
        year: "2017",
        title: "Pressure Die Casting (PDC) Facility",
        description:
          "Established a dedicated Pressure Die Casting facility with three machines — 650T, 420T, and 250T — enabling in-house production of precision die-cast aluminium components for LED luminaires.",
      },
      {
        year: "2018",
        title: "OEM Manufacturing Services",
        description:
          "Commenced providing comprehensive OEM manufacturing services to various leading lighting brands — leveraging in-house capabilities to deliver customized, brand-specific LED product solutions at scale.",
      },
      {
        year: "2023",
        title: "Third Manufacturing Unit – Sheet Metal Fabrication",
        description:
          "Inaugurated an additional fabrication unit at Vadodara for Sheet Metal Fabrication — expanding total operational capacity to three manufacturing units and significantly strengthening production capabilities to meet growing market demand.",
      },
      {
        year: "2025",
        title: "PCB Manufacturing Facility Established",
        description:
          "Commissioned a dedicated PCB (Printed Circuit Board) manufacturing facility — further strengthening vertical integration and achieving near-complete in-house control over the LED product manufacturing value chain.",
      },
    ],
  },
  infrastructure: {
    slug: "infrastructure",
    title: "Infrastructure",
    metaDescription:
      "Nextray Technologies manufacturing infrastructure — electronics assembly, metal fabrication, and pressure die casting units in Vadodara.",
    breadcrumb: "Infrastructure",
    intro: [
      "Three vertically integrated manufacturing units powering end-to-end LED luminaire production — from PCB and drivers to metal housings and finished assembly.",
    ],
    infrastructure: [
      {
        title: "Unit 1: Electronics and Lighting Assembly",
        capabilities: [
          "SMT Line",
          "PCB Manufacturing",
          "Driver Manufacturing",
          "Lighting Assembly",
        ],
        description:
          "Our Electronics & Assembly Unit is a fully integrated facility where in-house PCB manufacturing feeds directly into our advanced SMT line for precision component placement and soldering. Our dedicated driver manufacturing unit produces high-efficiency LED drivers, ensuring reliable and flicker-free performance. All components then come together on our lighting assembly line, where every finished luminaire undergoes thorough quality checks before leaving the floor.",
      },
      {
        title: "Unit 2: Metal Processing and Fabrication",
        capabilities: [
          "Metal Fabrication",
          "Surface Machining",
          "Metal Laser Cutting",
        ],
        description:
          "Our Metal Processing & Fabrication Unit is equipped with precision surface machining instruments, high-accuracy laser cutting machines, and a range of fabrication equipment dedicated to manufacturing metal lighting luminaires. The facility enables us to produce robust, well-finished metal housings and structural components entirely in-house, ensuring consistent quality and tight tolerances across every product.",
      },
      {
        title: "Unit 3: Pressure Die Casting",
        capabilities: ["220T Capacity", "420T Capacity", "650T Capacity"],
        description:
          "Our dedicated Pressure Die Casting Unit is equipped with three machines of 220T, 420T, and 650T capacities, capable of producing over 5,000 precise, high-quality cast components, ensuring consistent dimensional accuracy for our lighting products.",
      },
    ],
  },
  certifications: {
    slug: "certifications",
    title: "Certifications",
    metaDescription:
      "Nextray Technologies certifications — BIS, EUROCERT, and ERDA accredited quality.",
    breadcrumb: "Certifications",
    certifications: [
      {
        title: "BIS Certificate",
        image: "/images/strength/is_mark.jpg",
      },
      {
        title: "EUROCERT Certificate",
        image: "/images/strength/design_whites.jpg",
      },
      {
        title: "Electrical Research & Development Association",
        image: "/images/strength/make_in_india.jpg",
      },
    ],
  },
  "quality-policy": {
    slug: "quality-policy",
    title: "Quality Policy",
    metaDescription:
      "Nextray Technologies quality policy and objectives for solid state LED lighting.",
    breadcrumb: "Quality Policy",
    intro: [
      "Nextray Technologies, since its inception in 2008, is committed to delight customers by satisfactorily fulfilling their solid state LED lights requirements by continually improving effectiveness of its management system.",
      "Monitoring & improving our products & services upto the highest market level through systematic validation & controls on design, manufacturing, operating & quality processes for higher productivity & enhanced profitability.",
    ],
    objectives: [
      "Employee Initiated Involvement",
      "Team Efforts For Growth",
      "Nourishing & Healthy Work Environment",
      "Enhanced & Adequate Learning",
      "Cultivating Quality System",
      "Servant Leadership",
    ],
  },
};
