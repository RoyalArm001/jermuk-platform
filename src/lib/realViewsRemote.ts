// Firebase RTDB remote view counters (REST, no SDK)
// Safe for public read and "+1 only" write rules.

const DB_URL: string =
  (import.meta as any).env?.VITE_REALVIEWS_DB_URL ||
  "https://jermukguide-f64ef-default-rtdb.firebaseio.com";

const ROOT_KEY: string =
  (import.meta as any).env?.VITE_REALVIEWS_ROOT ||
  "BlogID_201588890086708935";

export const TOTAL_KEY: string =
  (import.meta as any).env?.VITE_REALVIEWS_TOTAL_KEY ||
  "PostID_WebsiteStats";

function normBase(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function keyUrl(key: string) {
  const base = normBase(DB_URL);
  return `${base}/${encodeURIComponent(ROOT_KEY)}/${encodeURIComponent(key)}.json`;
}

async function readRaw(key: string): Promise<{ value: number; etag: string | null }> {
  const res = await fetch(keyUrl(key), {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  if (!res.ok) return { value: 0, etag: null };
  const etag = res.headers.get("ETag");
  const json = await res.json();
  const value = typeof json === "number" && Number.isFinite(json) ? json : 0;
  return { value, etag };
}

async function putIfMatch(key: string, nextValue: number, etag: string | null) {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  if (etag) headers["If-Match"] = etag;

  return await fetch(keyUrl(key), {
    method: "PUT",
    headers,
    body: JSON.stringify(nextValue),
  });
}

// Session guard: prevents duplicate increments caused by React StrictMode (DEV) or fast remounts.
function ssKey(key: string) {
  return `rv7:${ROOT_KEY}:${key}`;
}

export function canCountThisSession(key: string, minutes = 10): boolean {
  try {
    const raw = sessionStorage.getItem(ssKey(key));
    if (!raw) return true;
    const age = Date.now() - Number(raw);
    return !(age < minutes * 60 * 1000);
  } catch {
    return true;
  }
}

function markCounted(key: string) {
  try {
    sessionStorage.setItem(ssKey(key), String(Date.now()));
  } catch {}
}

export async function getRemoteCounter(key: string): Promise<number> {
  // If DB_URL is empty, feature is disabled.
  if (!DB_URL) return 0;
  const { value } = await readRaw(key);
  return value;
}

export async function incrementRemoteCounter(key: string, retries = 5): Promise<number> {
  if (!DB_URL) return 0;

  // Throttle in-session increments
  if (!canCountThisSession(key)) {
    return await getRemoteCounter(key);
  }

  for (let i = 0; i < retries; i++) {
    const { value, etag } = await readRaw(key);
    const next = (value || 0) + 1;

    const res = await putIfMatch(key, next, etag);
    if (res.ok) {
      markCounted(key);
      return next;
    }

    // 412 = ETag mismatch (concurrent update). Retry.
    if (res.status === 412) continue;

    // Other failures: stop retrying and return last known value.
    return value || 0;
  }

  // Last attempt: return fresh value.
  return await getRemoteCounter(key);
}

export async function incrementPageAndTotal(pageKey: string): Promise<{ page: number; total: number }> {
  const page = await incrementRemoteCounter(pageKey);
  const total = await incrementRemoteCounter(TOTAL_KEY);
  return { page, total };
}
