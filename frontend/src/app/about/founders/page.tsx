import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";
import { aboutPageMetadata } from "@/lib/about-seo";

const data = aboutPages.founders;

export const metadata = aboutPageMetadata(data, "/about/founders");

export default function AboutSubPage() {
  return <AboutPageShell data={data} />;
}
