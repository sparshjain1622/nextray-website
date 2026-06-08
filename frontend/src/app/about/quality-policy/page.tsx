import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";
import { aboutPageMetadata } from "@/lib/about-seo";

const data = aboutPages['quality-policy'];

export const metadata = aboutPageMetadata(data, "/about/quality-policy");

export default function AboutSubPage() {
  return <AboutPageShell data={data} />;
}
