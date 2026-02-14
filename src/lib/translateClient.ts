// Online translate client (HY -> RU/EN)
// Translates only nodes explicitly marked with:
//   - data-tr="1"   OR
//   - data-i18n="..."
// Original Armenian text is preserved in data-hy for instant restore.

type Lang = "hy" | "ru" | "en";

// Optional endpoint (dev/prod). If not set, translation feature becomes a no-op
// and will not spam the console with 404s.
const ENDPOINT: string = (import.meta as any).env?.VITE_TRANSLATE_ENDPOINT || "";

let translateDisabled = false;

function getTargets(): HTMLElement[] {
  const list = Array.from(
    document.querySelectorAll<HTMLElement>("[data-tr='1'],[data-i18n]")
  );
  // Remove duplicates while preserving order
  return Array.from(new Set(list));
}

export async function translatePage(lang: Lang) {
  if (translateDisabled) return;
  const nodes = getTargets();

  if (!lang || lang === "hy") {
    for (const el of nodes) {
      const original = el.dataset.hy;
      if (original) el.textContent = original;
    }
    return;
  }

  for (const el of nodes) {
    const original = (el.dataset.hy || el.textContent || "").trim();
    if (!original) continue;
    el.dataset.hy = original;

    try {
      if (!ENDPOINT) return; // not configured

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: original, from: "hy", to: lang }),
      });

      // If the endpoint doesn't exist in this environment, stop trying for this session.
      if (res.status === 404 || res.status === 405) {
        translateDisabled = true;
        return;
      }
      const data = await res.json();
      if (data?.translated) el.textContent = data.translated;
    } catch (e) {
      console.warn("Translate failed", e);
    }
  }
}
