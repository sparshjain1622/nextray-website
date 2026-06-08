export interface AdminThemeClasses {
  pageBg: string;
  pageText: string;
  card: string;
  cardBorder: string;
  sidebar: string;
  sidebarBorder: string;
  heading: string;
  muted: string;
  mutedSoft: string;
  navInactive: string;
  navActive: string;
  input: string;
  label: string;
  selectBtn: string;
  selectMenu: string;
  selectOption: string;
  selectOptionActive: string;
  rowHover: string;
  tableHeader: string;
  panel: string;
  ghostBtn: string;
  unreadCard: string;
  readCard: string;
  filterInactive: string;
  filterActive: string;
  loginPage: string;
  loginCard: string;
}

export function getAdminTheme(light: boolean): AdminThemeClasses {
  if (light) {
    return {
      pageBg: "bg-[#f4f6f1]",
      pageText: "text-[#1a1a1a]",
      card: "bg-white",
      cardBorder: "border-[#e8eaed]",
      sidebar: "bg-white",
      sidebarBorder: "border-[#e8eaed]",
      heading: "text-[#1a1a1a]",
      muted: "text-[#6b6b6b]",
      mutedSoft: "text-[#9ca3af]",
      navInactive:
        "text-[#6b6b6b] hover:bg-nextray-green/8 hover:text-nextray-green",
      navActive: "bg-nextray-green/12 text-nextray-green",
      input:
        "border-[#e0e0e0] bg-white text-[#1a1a1a] placeholder:text-[#9ca3af]",
      label: "text-[#6b6b6b]",
      selectBtn:
        "border-[#e0e0e0] bg-white text-[#1a1a1a]",
      selectMenu: "border-[#e8eaed] bg-white shadow-lg",
      selectOption: "text-[#1a1a1a] hover:bg-nextray-green/10",
      selectOptionActive: "bg-nextray-green/10 font-semibold text-nextray-green",
      rowHover: "hover:bg-[#f8faf5]",
      tableHeader: "text-[#9ca3af]",
      panel: "border-nextray-green/20 bg-white",
      ghostBtn: "border-[#e8eaed] text-[#6b6b6b] hover:bg-[#f8faf5]",
      unreadCard: "border-nextray-green/35 bg-nextray-green/5",
      readCard: "border-[#e8eaed] bg-white",
      filterInactive: "bg-[#f0f2ed] text-[#6b6b6b] hover:text-nextray-green",
      filterActive: "bg-nextray-green text-black",
      loginPage: "bg-[#f4f6f1]",
      loginCard: "border-[#e8eaed] bg-white shadow-xl",
    };
  }

  return {
    pageBg: "bg-[#111310]",
    pageText: "text-[#e8e8e8]",
    card: "bg-[#0d0f0a]",
    cardBorder: "border-white/10",
    sidebar: "bg-[#0d0f0a]",
    sidebarBorder: "border-white/10",
    heading: "text-white",
    muted: "text-[#b8b8b8]",
    mutedSoft: "text-[#9a9a9a]",
    navInactive:
      "text-[#d0d0d0] hover:bg-white/5 hover:text-white",
    navActive: "bg-nextray-green/15 text-nextray-green",
    input:
      "border-white/10 bg-[#1a1f14] text-white placeholder:text-white/30",
    label: "text-white/50",
    selectBtn: "border-white/10 bg-[#1a1f14] text-white",
    selectMenu: "border-white/10 bg-[#1a1f14] shadow-xl",
    selectOption: "text-white/80 hover:bg-nextray-green/15",
    selectOptionActive: "bg-nextray-green/10 font-semibold text-nextray-green",
    rowHover: "hover:bg-white/[0.02]",
    tableHeader: "text-white/40",
    panel: "border-nextray-green/20 bg-[#0d0f0a]",
    ghostBtn: "border-white/10 text-white/60 hover:bg-white/5",
    unreadCard: "border-nextray-green/30 bg-nextray-green/5",
    readCard: "border-white/10 bg-[#0d0f0a]",
    filterInactive: "bg-white/5 text-white/50 hover:text-white",
    filterActive: "bg-nextray-green text-black",
    loginPage: "bg-[#111310]",
    loginCard: "border-white/10 bg-[#0d0f0a] shadow-2xl",
  };
}

export const adminInputBase =
  "w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:border-nextray-green focus:ring-1 focus:ring-nextray-green/30";

export const adminSelectBase =
  "w-full rounded-lg border px-3 py-2.5 pr-10 text-sm outline-none transition-colors focus:border-nextray-green focus:ring-1 focus:ring-nextray-green/30";
