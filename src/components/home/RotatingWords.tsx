"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface RotatingWordsProps {
  words: string[];
  className?: string;
  interval?: number;
}

export default function RotatingWords({
  words,
  className = "",
  interval = 2800,
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), "");

  return (
    <span
      className={`relative inline-flex overflow-hidden align-bottom ${className}`}
      style={{ minWidth: `${longest.length * 0.55}em` }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap bg-gradient-to-r from-nextray-green to-nextray-green-bright bg-clip-text text-transparent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
