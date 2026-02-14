/**
 * Firebase RTDB "real views" counter (public read, constrained write: only +1).
 * Uses REST + ETag CAS to reduce race conditions.
 *
 * Expected RTDB Rules (per key):
 *   write allowed only when new == old+1 (or 1 if missing)
 */
export type RealViewsConfig = {
  databaseUrl: string; // e.g. https://jermukguide-f64ef-default-rtdb.firebaseio.com/
  root: string;        // e.g. BlogID_201588890086708935
};

const DEFAULT_DB_URL = "https://jermukguide-f64ef-default-rtdb.firebaseio.com/";
const DEFAULT_ROOT = "BlogID_201588890086708935";

// You can override via Vite env variables
function cfg(): RealViewsConfig {
  const databaseUrl = (import.meta as any).env?.VITE_REALVIEWS_DB_URL || DEFAULT_DB_URL;
  const root = (import.meta as any).env?.VITE_REALVIEWS_ROOT || DEFAULT_ROOT;
  return { databaseUrl: String(databaseUrl).replace(/\/$/, ""), root: String(root) };
}

function buildUrl(key: string) {
  const { databaseUrl, root } = cfg();
  const safeKey = encodeURIComponent(key);
  return `${databaseUrl}/${encodeURIComponent(root)}/${safeKey}.json`;
}

async function getWithEtag(key: string): Promise<{ value: number | null; etag: string | null }> {
  const res = await fetch(buildUrl(key), {
    method: "GET",
    headers: {
      "X-Firebase-ETag": "true",
      "Accept": "application/json",
    },
  });
  if (!res.ok) throw new Error(`RTDB GET failed: ${res.status}`);
  const etag = res.headers.get("ETag");
  const body = await res.json();
  const value = typeof body === "number" ? body : null;
  return { value, etag };
}

async function putWithIfMatch(key: string, next: number, etag: string | null): Promise<boolean> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (etag) headers["if-match"] = etag;
  const res = await fetch(buildUrl(key), {
    method: "PUT",
    headers,
    body: JSON.stringify(next),
  });
  if (res.status === 412) return false; // precondition failed -> retry
  if (!res.ok) throw new Error(`RTDB PUT failed: ${res.status}`);
  return true;
}

/**
 * Increment a numeric counter stored at {root}/{key}.
 * Returns the new value if successful, or null if network/permission blocked.
 */
export async function incrementRemoteCounter(key: string, maxRetries = 4): Promise<number | null> {
  if (!key) return null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const { value, etag } = await getWithEtag(key);
      const next = (value ?? 0) + 1;
      const ok = await putWithIfMatch(key, next, etag);
      if (ok) return next;
      // else retry
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Read a remote counter value.
 */
export async function getRemoteCounter(key: string): Promise<number | null> {
  if (!key) return null;
  try {
    const res = await fetch(buildUrl(key), { method: "GET", headers: { "Accept": "application/json" } });
    if (!res.ok) return null;
    const body = await res.json();
    return typeof body === "number" ? body : null;
  } catch {
    return null;
  }
}

/**
 * Increment both the page key and the global total key.
 * Returns { page, total } (numbers when available).
 */
export async function incrementPageAndTotal(pageKey: string, totalKey = "PostID_WebsiteStats") {
  const [page, total] = await Promise.all([
    incrementRemoteCounter(pageKey),
    incrementRemoteCounter(totalKey),
  ]);
  return { page, total };
}
