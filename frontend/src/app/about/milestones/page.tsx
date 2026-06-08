import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";
import { aboutPageMetadata } from "@/lib/about-seo";

const data = aboutPages.milestones;

export const metadata = aboutPageMetadata(data, "/about/milestones");

export default function AboutSubPage() {
  return <AboutPageShell data={data} />;
}
