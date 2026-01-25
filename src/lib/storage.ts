const NS = "jermuk_";

export function getString(key: string, fallback = ""): string {
  try { return localStorage.getItem(NS + key) ?? fallback; } catch { return fallback; }
}
export function setString(key: string, value: string) {
  try { localStorage.setItem(NS + key, value); } catch {}
}
export function getBool(key: string, fallback = false): boolean {
  const v = getString(key, "");
  if (!v) return fallback;
  return v === "1" || v === "true";
}
export function setBool(key: string, value: boolean) { setString(key, value ? "1" : "0"); }
export function getJson<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(NS + key);
    if (!v) return fallback;
    return JSON.parse(v) as T;
  } catch { return fallback; }
}
export function setJson(key: string, value: unknown) {
  try { localStorage.setItem(NS + key, JSON.stringify(value)); } catch {}
}
