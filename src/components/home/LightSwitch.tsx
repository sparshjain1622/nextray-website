"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Lightbulb, LightbulbOff } from "lucide-react";

export default function LightSwitch() {
  const { lightsOn, toggleLights } = useTheme();
  // Dark theme = room lights on; light theme = room lights off
  const roomLightsOn = !lightsOn;

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] md:inline">
        {roomLightsOn ? "Lights On" : "Lights Off"}
      </span>

      <button
        type="button"
        onClick={toggleLights}
        aria-label={roomLightsOn ? "Turn lights off" : "Turn lights on"}
        aria-pressed={roomLightsOn}
        className="group relative flex items-center gap-2"
      >
        {/* Switch track */}
        <div
          className={`relative h-8 w-16 rounded-full border-2 transition-all duration-500 ${
            roomLightsOn
              ? "border-nextray-green bg-nextray-green/20"
              : "border-[var(--border-color)] bg-[var(--switch-track)]"
          }`}
        >
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full shadow-md ${
              roomLightsOn
                ? "left-[calc(100%-1.625rem)] bg-nextray-green text-black"
                : "left-0.5 bg-[var(--switch-knob)] text-nextray-green"
            }`}
          >
            {roomLightsOn ? (
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
