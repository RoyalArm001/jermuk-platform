/**
 * Build hotels.json from individual hotel files in src/data/hotels/*.json
 * Usage:
 *   node scripts/build-hotels.mjs
 *
 * It will:
 *  - read all *.json in src/data/hotels (except hotels.json itself)
 *  - keep only items with status !== "draft" unless INCLUDE_DRAFT=1
 *  - sort by "tags" containing "top" first, then by title.hy
 *  - write src/data/hotels.json as an array
 */
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const hotelsDir = path.join(root, "src", "data", "hotels");
const outFile = path.join(root, "src", "data", "hotels.json");

const includeDraft = process.env.INCLUDE_DRAFT === "1";

function safeReadJSON(fp) {
  const raw = fs.readFileSync(fp, "utf-8");
  return JSON.parse(raw);
}

function getTitleHy(item) {
  return item?.title?.hy || item?.title?.en || item?.title?.ru || item?.id || "";
}

const files = fs.readdirSync(hotelsDir)
  .filter(f => f.endsWith(".json"))
  .filter(f => f !== "hotels.json")
  .filter(f => !f.startsWith("_"));

const items = [];
for (const f of files) {
  const fp = path.join(hotelsDir, f);
  try {
    const obj = safeReadJSON(fp);
    if (!includeDraft && obj?.status === "draft") continue;
    items.push(obj);
  } catch (e) {
    console.error("Failed parsing:", fp, e?.message);
    process.exitCode = 1;
  }
}

// sort: top first
items.sort((a, b) => {
  const atop = Array.isArray(a.tags) && a.tags.includes("top") ? 1 : 0;
  const btop = Array.isArray(b.tags) && b.tags.includes("top") ? 1 : 0;
  if (atop !== btop) return btop - atop;
  return getTitleHy(a).localeCompare(getTitleHy(b), "hy");
});

fs.writeFileSync(outFile, JSON.stringify(items, null, 2), "utf-8");
console.log(`✅ Built ${outFile} with ${items.length} items (includeDraft=${includeDraft})`);
