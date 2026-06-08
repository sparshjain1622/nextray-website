import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";
import { aboutPageMetadata } from "@/lib/about-seo";

const data = aboutPages.infrastructure;

export const metadata = aboutPageMetadata(data, "/about/infrastructure");

export default function AboutSubPage() {
  return <AboutPageShell data={data} />;
}
