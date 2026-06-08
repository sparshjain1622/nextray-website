"use client";

import { FormEvent, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { submitForm, type FormEndpoint } from "@/lib/api";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: readonly { value: string; label: string }[];
  rows?: number;
  colSpan?: 1 | 2;
}

interface SiteFormProps {
  fields: FormField[];
  endpoint: FormEndpoint;
  submitLabel?: string;
  onSubmitMessage?: string;
  note?: string;
}

const fieldIcons: Record<string, typeof User> = {
  role: User,
  name: User,
  company: Building2,
  email: Mail,
  phone: Phone,
  city: MapPin,
  state: MapPin,
  subject: MessageSquare,
  message: MessageSquare,
};

export default function SiteForm({
  fields,
  endpoint,
  submitLabel = "Submit",
  onSubmitMessage = "Thank you! We will get back to you shortly.",
  note,
}: SiteFormProps) {
  const { lightsOn } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState(onSubmitMessage);
  const [focused, setFocused] = useState<string | null>(null);

  const inputBase = `w-full rounded-xl border px-4 py-3 pl-11 text-sm outline-none transition-all duration-200 ${
    lightsOn
      ? "border-[#e0e0e0] bg-[#fafbfc] text-[#1a1a1a] placeholder:text-[#9ca3af]"
      : "border-white/12 bg-white/5 text-white placeholder:text-white/35"
  }`;

  const inputFocus = "border-nextray-green ring-2 ring-nextray-green/20";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = String(value);
    });

    try {
      const result = await submitForm(endpoint, data);
      setSuccessMessage(result.message || onSubmitMessage);
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`flex flex-col items-center rounded-2xl border px-8 py-12 text-center ${
          lightsOn
            ? "border-nextray-green/25 bg-gradient-to-b from-nextray-green/5 to-white"
            : "border-nextray-green/20 bg-nextray-green/10"
        }`}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-nextray-green/15">
          <CheckCircle2 size={32} className="text-nextray-green" />
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-nextray-green">
          Form Submitted
        </p>
        <h3
          className={`mb-2 font-heading text-xl font-bold ${
            lightsOn ? "text-[#1a1a1a]" : "text-white"
          }`}
        >
          Thank You!
        </h3>
        <p
          className={`max-w-sm text-sm leading-relaxed ${
            lightsOn ? "text-[#6b6b6b]" : "text-white/65"
          }`}
        >
          {successMessage}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        name="_honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const Icon = fieldIcons[field.name] ?? User;
          const isFocused = focused === field.name;
          const fieldClass = `${inputBase} ${isFocused ? inputFocus : ""}`;
          const spanClass =
            field.colSpan === 2 || field.type === "textarea"
              ? "sm:col-span-2"
              : "";

          return (
            <div key={field.name} className={spanClass}>
              <label
                htmlFor={field.name}
                className={`mb-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${
                  lightsOn ? "text-[#4a4a4a]" : "text-white/75"
                }`}
              >
                {field.label}
                {field.required && (
                  <span className="text-nextray-green">*</span>
                )}
              </label>

              <div className="relative">
                <Icon
                  size={16}
                  className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 ${
                    isFocused ? "text-nextray-green" : "text-nextray-green/60"
                  } ${field.type === "textarea" ? "top-4 translate-y-0" : ""}`}
                />

                {field.type === "textarea" ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    required={field.required}
                    rows={field.rows ?? 4}
                    placeholder={field.placeholder}
                    className={`${fieldClass} resize-none pl-11 pt-3`}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                  />
                ) : field.type === "select" ? (
                  <div className="relative">
                    <select
                      id={field.name}
                      name={field.name}
                      required={field.required}
                      defaultValue=""
                      className={`${fieldClass} appearance-none pr-10`}
                      onFocus={() => setFocused(field.name)}
                      onBlur={() => setFocused(null)}
                    >
                      <option value="" disabled>
                        Select {field.label.toLowerCase()}
                      </option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-nextray-green/60"
                    />
                  </div>
                ) : (
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    className={fieldClass}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="rounded-lg border border-red-300/50 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      {note && (
        <p
          className={`text-xs leading-relaxed ${
            lightsOn ? "text-[#9ca3af]" : "text-white/40"
          }`}
        >
          {note}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-nextray-green px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-nextray-green-bright hover:shadow-lg hover:shadow-nextray-green/20 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        <Send size={16} />
        {submitting ? "Sending..." : submitLabel}
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </form>
  );
}
