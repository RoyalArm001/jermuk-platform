type ThemeMode = "light" | "dark" | "system";

const KEY_MODE = "jt_theme_mode";
const KEY_ACCENT = "jt_theme_accent";

export function getThemeMode(): ThemeMode {
  const v = (localStorage.getItem(KEY_MODE) || "system") as ThemeMode;
  return v === "light" || v === "dark" || v === "system" ? v : "system";
}

export function setThemeMode(mode: ThemeMode) {
  localStorage.setItem(KEY_MODE, mode);
  applyTheme();
}

export function getAccent(): string | null {
  return localStorage.getItem(KEY_ACCENT);
}

export function setAccent(color: string) {
  localStorage.setItem(KEY_ACCENT, color);
  applyTheme();
}

export function applyTheme() {
  const mode = getThemeMode();
  const root = document.documentElement;

  if (mode === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", mode);

  const accent = getAccent();
  if (accent) root.style.setProperty("--accent", accent);
}

