const KEY = "jermuk_favorites";

export function getFavs(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
export function isFav(id: string): boolean { return getFavs().includes(id); }

export function toggleFav(id: string) {
  const set = new Set(getFavs());
  if (set.has(id)) set.delete(id);
  else set.add(id);
  localStorage.setItem(KEY, JSON.stringify([...set]));
}
