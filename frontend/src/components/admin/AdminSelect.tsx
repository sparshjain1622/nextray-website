"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useAdminTheme } from "@/context/AdminThemeContext";
import { adminSelectBase } from "./admin-theme";

export interface AdminSelectOption {
  value: string;
  label: string;
}

interface AdminSelectProps {
  name: string;
  options: AdminSelectOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export default function AdminSelect({
  name,
  options,
  defaultValue,
  onChange,
}: AdminSelectProps) {
  const { t } = useAdminTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    defaultValue ?? options[0]?.value ?? ""
  );
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const pick = (v: string) => {
    setValue(v);
    onChange?.(v);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${adminSelectBase} ${t.selectBtn} flex w-full items-center justify-between text-left`}
      >
        <span>{selected?.label ?? "Select..."}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-nextray-green/70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          className={`absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-lg border py-1 ${t.selectMenu}`}
        >
          {options.map((opt) => (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => pick(opt.value)}
                className={`w-full px-3 py-2.5 text-left text-sm transition-colors ${
                  value === opt.value
                    ? t.selectOptionActive
                    : t.selectOption
                }`}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
