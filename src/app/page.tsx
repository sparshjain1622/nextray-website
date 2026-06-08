import dynamic from "next/dynamic";
import Header from "@/components/home/Header";
import HeroSlider from "@/components/home/HeroSlider";
import AreasWeServe from "@/components/home/AreasWeServe";

const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"));
const AboutNextray = dynamic(() => import("@/components/home/AboutNextray"));
const CompanyStats = dynamic(() => import("@/components/home/CompanyStats"));
const BrandsWeDeal = dynamic(() => import("@/components/home/BrandsWeDeal"));
const FeaturedProjects = dynamic(() => import("@/components/home/FeaturedProjects"));
const CertificationsCTA = dynamic(() => import("@/components/home/CertificationsCTA"));
const Clients = dynamic(() => import("@/components/home/Clients"));
const Footer = dynamic(() => import("@/components/home/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/home/WhatsAppButton"));

export default function Home() {
  return (
    <>
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
    </>
  );
}
