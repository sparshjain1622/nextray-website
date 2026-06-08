import type { Metadata } from "next";
import AboutPageShell from "@/components/about/AboutPageShell";
import { aboutPages } from "@/lib/about-data";

const data = aboutPages.milestones;

export const metadata: Metadata = {
  title: `${data.title} | Nextray Technologies`,
  description: data.metaDescription,
};

export default function MilestonesPage() {
  return <AboutPageShell data={data} />;
}
