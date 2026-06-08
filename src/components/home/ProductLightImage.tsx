"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import SafeImage from "./SafeImage";

interface ProductLightImageProps {
  imageUnlit: string;
  imageLit: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  /** Catalog-style paired shots (Brands We Deal section) */
  catalog?: boolean;
}

export default function ProductLightImage({
  imageUnlit,
  imageLit,
  alt,
  className = "",
  fill,
  width,
  height,
  sizes,
  priority,
  catalog = false,
}: ProductLightImageProps) {
  const { lightsOn } = useTheme();
  /** Switch OFF → dark theme → lit night product images */
  const showLit = !lightsOn;
  const activeSrc = showLit ? imageLit : imageUnlit;

  return (
    <div className={`relative overflow-hidden ${fill ? "h-full w-full" : ""}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSrc}
          initial={{ opacity: 0, scale: catalog && showLit ? 1.02 : 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className={`${fill ? "absolute inset-0" : ""} ${
            showLit
              ? catalog
                ? "product-lit-catalog"
                : "product-lit"
              : "product-unlit"
          }`}
        >
          <SafeImage
            src={activeSrc}
            alt={alt}
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
            className={className}
            sizes={sizes}
            priority={priority}
          />
          {showLit && !catalog && (
            <div className="product-lit-glow pointer-events-none absolute inset-0" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
