// Online translate client (HY -> RU/EN)
// Translates only nodes explicitly marked with:
//   - data-tr="1"   OR
//   - data-i18n="..."
// Original Armenian text is preserved in data-hy for instant restore.

type Lang = "hy" | "ru" | "en";

function getTargets(): HTMLElement[] {
  const list = Array.from(
    document.querySelectorAll<HTMLElement>("[data-tr='1'],[data-i18n]")
  );
  // Remove duplicates while preserving order
  return Array.from(new Set(list));
}

export async function translatePage(lang: Lang) {
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
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: original, from: "hy", to: lang }),
      });
      const data = await res.json();
      if (data?.translated) el.textContent = data.translated;
    } catch (e) {
      console.warn("Translate failed", e);
    }
  }
}
