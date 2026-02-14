type ViewsMap = Record<string, number>;

const KEY = "jt_views_v1";
const SESSION_KEY = "jt_views_session_v1";

function readMap(): ViewsMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as ViewsMap;
  } catch {
    return {};
  }
}

function writeMap(map: ViewsMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

function readSession(): Record<string, number> {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, number>;
  } catch {
    return {};
  }
}

function writeSession(map: Record<string, number>) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

/**
 * Local-only view counter.
 * - Counts once per session per item (10min cooldown) to avoid rapid refresh inflation.
 * - Key should be unique (recommended: `${type}:${id}`).
 */
export function incrementView(key: string, cooldownMs = 10 * 60 * 1000): number {
  if (!key) return 0;
  const now = Date.now();

  const ses = readSession();
  const last = ses[key] || 0;
  if (now - last < cooldownMs) {
    return getViews(key);
  }

  ses[key] = now;
  writeSession(ses);

  const map = readMap();
  map[key] = (map[key] || 0) + 1;
  writeMap(map);
  return map[key];
}

export function getViews(key: string): number {
  const map = readMap();
  return map[key] || 0;
}

export function formatViews(n: number): string {
  if (!Number.isFinite(n)) return "0";
  if (n < 1000) return String(n);
  if (n < 1_000_000) return `${(n / 1000).toFixed(n < 10_000 ? 1 : 0)}K`;
  if (n < 1_000_000_000) return `${(n / 1_000_000).toFixed(n < 10_000_000 ? 1 : 0)}M`;
  return `${(n / 1_000_000_000).toFixed(1)}B`;
}
