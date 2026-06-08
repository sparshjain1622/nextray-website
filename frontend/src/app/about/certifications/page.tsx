import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";
import { aboutPageMetadata } from "@/lib/about-seo";

const data = aboutPages.certifications;

export const metadata = aboutPageMetadata(data, "/about/certifications");

export default function AboutSubPage() {
  return <AboutPageShell data={data} />;
}
