import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { allProducts } from "../../frontend/src/lib/products-catalog";
import {
  brandProducts,
  areasWeServe,
  clients,
  certifications,
} from "../../frontend/src/lib/home-data";

const prisma = new PrismaClient();

const categories = [
  {
    name: "Indoor Lights",
    slug: "indoor",
    description: "LED downlights and indoor lighting solutions",
    seoTitle: "Indoor LED Lighting | Nextray Technologies",
    seoDescription: "Premium indoor LED downlights — 6W to 60W, BIS approved.",
    sortOrder: 1,
  },
  {
    name: "Outdoor Lights",
    slug: "outdoor",
    description: "Street lights, flood lights and outdoor LED solutions",
    seoTitle: "Outdoor LED Lighting | Nextray Technologies",
    seoDescription: "Street lights, P-series and flood lights for outdoor applications.",
    sortOrder: 2,
  },
  {
    name: "Powertronics",
    slug: "powertronics",
    description: "LED drivers and power supply solutions",
    seoTitle: "Powertronics LED Drivers | Nextray Technologies",
    seoDescription: "Isolated and non-isolated LED drivers.",
    sortOrder: 3,
  },
  {
    name: "Industrial Lights",
    slug: "industrial",
    description: "Industrial and specialty lighting",
    seoTitle: "Industrial LED Lighting | Nextray Technologies",
    seoDescription: "Industrial LED lighting solutions.",
    sortOrder: 4,
  },
];

function categorySlugFromProduct(categoryHref: string): string {
  if (categoryHref.includes("indoor")) return "indoor";
  if (categoryHref.includes("outdoor")) return "outdoor";
  if (categoryHref.includes("powertronics")) return "powertronics";
  return "industrial";
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@nextray-tech.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  await prisma.admin.upsert({
    where: { email: adminEmail },
    create: {
      email: adminEmail,
      passwordHash: await bcrypt.hash(adminPassword, 10),
      name: "Nextray Admin",
    },
    update: {},
  });

  const categoryMap = new Map<string, string>();
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      create: cat,
      update: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }

  let order = 0;
  for (const p of allProducts) {
    const catSlug = categorySlugFromProduct(p.categoryHref);
    const categoryId = categoryMap.get(catSlug);
    if (!categoryId) continue;

    const tagSlugs: string[] = [];
    if (p.subGroup) tagSlugs.push(p.subGroup);
    if (p.brand) tagSlugs.push(p.brand.toLowerCase().replace(/\s+/g, "-"));

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      create: {
        title: p.title,
        slug: p.slug,
        brand: p.brand,
        categoryId,
        description: p.breadcrumb,
        metaDescription: p.metaDescription,
        seoTitle: `${p.title} | Nextray Technologies`,
        imageUnlit: p.imageUnlit,
        imageLit: p.imageLit,
        modelNumber: p.modelNumber ?? null,
        modelNumbers: p.modelNumbers ? JSON.stringify(p.modelNumbers) : null,
        specs: JSON.stringify(p.tables),
        applications: JSON.stringify(p.applications),
        features: JSON.stringify(p.features),
        keyHighlights: p.keyHighlights ? JSON.stringify(p.keyHighlights) : null,
        pageType: p.pageType,
        published: true,
        featured: order < 3,
        sortOrder: order++,
      },
      update: {
        title: p.title,
        brand: p.brand,
        categoryId,
        metaDescription: p.metaDescription,
        imageUnlit: p.imageUnlit,
        imageLit: p.imageLit,
        specs: JSON.stringify(p.tables),
        applications: JSON.stringify(p.applications),
        features: JSON.stringify(p.features),
        keyHighlights: p.keyHighlights ? JSON.stringify(p.keyHighlights) : null,
      },
    });

    for (const slug of tagSlugs) {
      const tag = await prisma.tag.upsert({
        where: { slug },
        create: { name: slug.replace(/-/g, " "), slug },
        update: {},
      });
      await prisma.productTag.upsert({
        where: { productId_tagId: { productId: product.id, tagId: tag.id } },
        create: { productId: product.id, tagId: tag.id },
        update: {},
      });
    }
  }

  const heroKeys = [
    "25-watt-street",
    "50-watt-street",
    "p-series",
    "100-watt-high-bay",
    "150-watt-high-bay",
  ];
  for (let i = 0; i < brandProducts.length; i++) {
    const p = brandProducts[i];
    await prisma.homepageImage.upsert({
      where: {
        section_key: { section: "hero-product", key: heroKeys[i] },
      },
      create: {
        section: "hero-product",
        key: heroKeys[i],
        title: p.title,
        description: p.description,
        imageUnlit: p.imageUnlit,
        imageLit: p.imageLit,
        href: p.href ?? null,
        sortOrder: i,
      },
      update: {
        title: p.title,
        description: p.description,
        imageUnlit: p.imageUnlit,
        imageLit: p.imageLit,
        href: p.href ?? null,
        sortOrder: i,
      },
    });
  }

  const areaKeys = ["commercial", "outdoor", "industrial", "oem"];
  for (let i = 0; i < areasWeServe.length; i++) {
    const a = areasWeServe[i];
    await prisma.homepageImage.upsert({
      where: { section_key: { section: "area", key: areaKeys[i] } },
      create: {
        section: "area",
        key: areaKeys[i],
        title: a.title,
        description: a.description,
        imageUnlit: a.imageUnlit,
        imageLit: a.imageLit,
        href: a.href,
        sortOrder: i,
      },
      update: {
        title: a.title,
        description: a.description,
        imageUnlit: a.imageUnlit,
        imageLit: a.imageLit,
        href: a.href,
        sortOrder: i,
      },
    });
  }

  for (let i = 0; i < clients.length; i++) {
    const key = `client-${i + 1}`;
    await prisma.homepageImage.upsert({
      where: { section_key: { section: "client", key } },
      create: {
        section: "client",
        key,
        title: `Client ${i + 1}`,
        image: clients[i],
        sortOrder: i,
      },
      update: { image: clients[i], sortOrder: i },
    });
  }

  const certKeys = ["make-in-india", "design-excellence", "is-mark"];
  for (let i = 0; i < certifications.length; i++) {
    const c = certifications[i];
    await prisma.homepageImage.upsert({
      where: { section_key: { section: "certification", key: certKeys[i] } },
      create: {
        section: "certification",
        key: certKeys[i],
        title: c.title,
        description: c.description,
        image: c.image,
        sortOrder: i,
      },
      update: {
        title: c.title,
        description: c.description,
        image: c.image,
        sortOrder: i,
      },
    });
  }

  const blogPosts = [
    {
      slug: "benefits-of-led-lighting",
      title: "Top Benefits of LED Lighting for Commercial Spaces",
      excerpt:
        "Discover why businesses across India are switching to LED — energy savings, longer life and better light quality.",
      content: `LED lighting has transformed how commercial spaces are illuminated. From offices and retail showrooms to hospitals and warehouses, modern LED luminaires deliver superior efficiency and reliability compared to conventional lighting.

**Energy Efficiency**
LED technology converts a far greater percentage of electrical energy into visible light, reducing power consumption by up to 70% compared to legacy systems.

**Longer Lifespan**
Quality LED products from vertically integrated manufacturers like Nextray offer extended operational life, lowering maintenance and replacement costs.

**Better Light Quality**
With high CRI options and precise colour temperatures, LED lighting improves visual comfort and product presentation in commercial environments.

**Sustainability**
Lower energy use and reduced waste from fewer replacements make LED the preferred choice for environmentally conscious projects.

Contact Nextray Technologies for expert guidance on selecting the right LED solutions for your commercial project.`,
      featuredImage: "/images/gallery/1.jpg",
      seoTitle: "Benefits of LED Lighting for Commercial Spaces | Nextray Blog",
      metaDescription:
        "Learn the key benefits of LED lighting for offices, retail and commercial buildings — energy savings, lifespan and light quality.",
      seoKeywords: "LED lighting, commercial LED, energy efficient lighting, Nextray",
      tagSlugs: ["led-lighting", "commercial"],
      featured: true,
    },
    {
      slug: "choosing-street-lights",
      title: "How to Choose the Right LED Street Light",
      excerpt:
        "A practical guide to wattage, optics, thermal design and certifications for outdoor street lighting projects.",
      content: `Selecting the right LED street light is critical for safety, efficiency and long-term performance on roads, lanes and public spaces.

**Wattage & Coverage**
Match wattage to mounting height and road width. Residential lanes may need 15–25W fixtures, while wider roads benefit from higher-output modular systems.

**Thermal Management**
Extrusion-based housings with effective heat dissipation protect LED modules and drivers, ensuring consistent output over years of outdoor operation.

**Optics & Distribution**
Proper beam angles minimise glare and light spill while maximising uniformity on the road surface.

**Certifications**
Look for BIS-approved control gear and luminaires tested for Indian grid conditions and environmental stress.

Nextray offers a complete range of street lights from 25W to P-Series modular solutions — engineered and manufactured in-house.`,
      featuredImage: "/images/products/25_watt_street_light.jpg",
      seoTitle: "How to Choose LED Street Lights | Nextray Technologies Blog",
      metaDescription:
        "Guide to choosing LED street lights — wattage, optics, thermal design and certifications for outdoor projects.",
      seoKeywords: "LED street light, outdoor lighting, street light guide",
      tagSlugs: ["street-light", "outdoor"],
      featured: false,
    },
    {
      slug: "make-in-india-led-manufacturing",
      title: "Make in India: The Future of LED Manufacturing",
      excerpt:
        "How vertically integrated Indian LED manufacturing is driving quality, cost efficiency and innovation.",
      content: `India's LED industry has matured rapidly, with domestic manufacturers investing in end-to-end capabilities from component fabrication to final assembly.

**Vertical Integration**
In-house die casting, PCB manufacturing, SMT assembly and driver production enable tighter quality control and faster turnaround.

**R&D Investment**
Dedicated engineering teams develop products tailored to Indian voltage conditions, climate and application needs.

**OEM & Export Growth**
Indian manufacturers now partner with global brands for white-label production, strengthening the Make in India initiative.

Nextray Technologies has been at the forefront since 2004 — delivering precision-engineered LED solutions from Vadodara to markets nationwide.`,
      featuredImage: "/images/strength/make_in_india.jpg",
      seoTitle: "Make in India LED Manufacturing | Nextray Blog",
      metaDescription:
        "Explore how vertically integrated Indian LED manufacturing delivers quality and innovation — Nextray Technologies.",
      seoKeywords: "Make in India, LED manufacturing, Nextray Technologies",
      tagSlugs: ["manufacturing", "make-in-india"],
      featured: true,
    },
  ];

  for (const post of blogPosts) {
    const { tagSlugs, ...data } = post;
    const created = await prisma.blogPost.upsert({
      where: { slug: post.slug },
      create: {
        ...data,
        published: true,
        publishedAt: new Date(),
        author: "Nextray Technologies",
      },
      update: {
        ...data,
        published: true,
        publishedAt: new Date(),
      },
    });

    for (const slug of tagSlugs) {
      const tag = await prisma.blogTag.upsert({
        where: { slug },
        create: { name: slug.replace(/-/g, " "), slug },
        update: {},
      });
      await prisma.blogPostTag.upsert({
        where: { postId_tagId: { postId: created.id, tagId: tag.id } },
        create: { postId: created.id, tagId: tag.id },
        update: {},
      });
    }
  }

  const homepageCount = await prisma.homepageImage.count();
  const blogCount = await prisma.blogPost.count();
  console.log(
    `Seeded admin (${adminEmail}), ${categories.length} categories, ${allProducts.length} products, ${homepageCount} homepage images, ${blogCount} blog posts`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
