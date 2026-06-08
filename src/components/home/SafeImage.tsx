"use client";

import Image from "next/image";
import { useState } from "react";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className = "",
  sizes,
  priority,
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-card text-nextray-green ${className} ${fill ? "absolute inset-0" : ""}`}
        style={!fill ? { width, height } : undefined}
      >
        <span className="font-heading text-xs uppercase tracking-widest">
          Nextray
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
