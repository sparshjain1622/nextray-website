import { useAdminTheme } from "@/context/AdminThemeContext";
import { adminInputBase, adminSelectBase } from "./admin-theme";

export function useAdminFormStyles() {
  const { t } = useAdminTheme();
  return {
    inputClass: `${adminInputBase} ${t.input}`,
    selectClass: `${adminSelectBase} ${t.selectBtn}`,
    labelClass: `mb-1.5 block text-xs font-bold uppercase tracking-wider ${t.label}`,
  };
}
