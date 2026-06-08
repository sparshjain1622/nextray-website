"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { downloadUrl, fetchDownloads } from "@/lib/api";
import { Download } from "lucide-react";

export default function ProductDownloads() {
  const { lightsOn } = useTheme();
  const [files, setFiles] = useState<{ id: string; title: string }[]>([]);

  useEffect(() => {
    fetchDownloads("datasheet").then(setFiles);
  }, []);

  if (!files.length) return null;

  const primary = files[0];

  return (
    <a
      href={downloadUrl(primary.id)}
      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors hover:border-nextray-green hover:text-nextray-green md:flex-none ${
        lightsOn
          ? "border-nextray-green/40 text-[#1a1a1a]"
          : "border-nextray-green/40 text-white"
      }`}
    >
      <Download size={16} className="text-nextray-green" />
      {primary.title || "Download Datasheet"}
    </a>
  );
}
