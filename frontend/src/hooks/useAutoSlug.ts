import { useEffect, useState } from "react";
import { slugify } from "@nextray/shared";

export function useAutoSlug(
  source: string,
  initialSlug = "",
  /** When false (editing existing), slug stays manual until user re-enables sync. */
  startSynced = true
) {
  const [slug, setSlugState] = useState(initialSlug);
  const [autoSync, setAutoSync] = useState(startSynced);

  useEffect(() => {
    if (autoSync) {
      setSlugState(slugify(source));
    }
  }, [source, autoSync]);

  const setSlug = (value: string) => {
    setSlugState(value);
    setAutoSync(false);
  };

  const enableAutoSync = () => {
    setAutoSync(true);
    setSlugState(slugify(source));
  };

  return { slug, setSlug, autoSync, enableAutoSync };
}
