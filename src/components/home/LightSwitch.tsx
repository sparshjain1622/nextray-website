"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Lightbulb, LightbulbOff } from "lucide-react";

export default function LightSwitch() {
  const { lightsOn, toggleLights } = useTheme();

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] md:inline">
        {lightsOn ? "Lights On" : "Lights Off"}
      </span>

      <button
        type="button"
        onClick={toggleLights}
        aria-label={lightsOn ? "Turn lights off" : "Turn lights on"}
        aria-pressed={lightsOn}
        className="group relative flex items-center gap-2"
      >
        {/* Switch track */}
        <div
          className={`relative h-8 w-16 rounded-full border-2 transition-all duration-500 ${
            lightsOn
              ? "border-nextray-green bg-nextray-green/20"
              : "border-[var(--border-color)] bg-[var(--switch-track)]"
          }`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full shadow-md ${
              lightsOn
                ? "left-[calc(100%-1.625rem)] bg-nextray-green text-black"
                : "left-0.5 bg-[var(--switch-knob)] text-nextray-green"
            }`}
          >
            {lightsOn ? (
              <Lightbulb size={14} fill="currentColor" />
            ) : (
              <LightbulbOff size={14} />
            )}
          </motion.div>
        </div>
      </button>
    </div>
  );
}
