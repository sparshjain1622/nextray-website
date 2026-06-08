import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HomepageProvider } from "@/context/HomepageContext";
import Header from "@/components/home/Header";
import HeroSlider from "@/components/home/HeroSlider";
import AreasWeServe from "@/components/home/AreasWeServe";
import { buildPageMetadata } from "@/lib/seo-metadata";

const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const AboutNextray = dynamic(() => import("@/components/home/AboutNextray"));
const CompanyStats = dynamic(() => import("@/components/home/CompanyStats"));
const BrandsWeDeal = dynamic(() => import("@/components/home/BrandsWeDeal"));
const FeaturedProjects = dynamic(() => import("@/components/home/FeaturedProjects"));
const CertificationsCTA = dynamic(() => import("@/components/home/CertificationsCTA"));
const Clients = dynamic(() => import("@/components/home/Clients"));
const Footer = dynamic(() => import("@/components/home/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/home/WhatsAppButton"));

export const metadata: Metadata = buildPageMetadata({
  title: "Nextray Technologies - LED Lighting Solutions | Since 2004",
  description:
    "Nextray Technologies Pvt. Ltd. — leading Indian manufacturer of LED lighting solutions with 20+ years of expertise. Vertically integrated manufacturing for indoor, outdoor, industrial, commercial and specialty applications.",
  path: "/",
  image: "/images/nextray-logo.png",
  keywords: [
    "LED lighting manufacturer India",
    "LED downlight manufacturer",
    "LED street light",
    "Nextray Technologies",
    "Vadodara LED company",
    "Make in India LED",
  ],
});

export default function Home() {
  return (
    <HomepageProvider>
      <Header />
      <main>
        <HeroSlider />
        <AreasWeServe />
        <WhyChooseUs />
        <AboutNextray />
        <CompanyStats />
        <BrandsWeDeal />
        <FeaturedProjects />
        <CertificationsCTA />
        <Clients />
      </main>
      <Footer />
      <WhatsAppButton />
    </HomepageProvider>
  );
}
