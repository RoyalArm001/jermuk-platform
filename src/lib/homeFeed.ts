import hotels from "../data/hotels.json";
import food from "../data/food.json";
import rentals from "../data/rentals.json";
import sights from "../data/sights.json";
import services from "../data/services.json";
import transport from "../data/transport.json";
import trails from "../data/trails.json";

export type HomeItemType =
  | "hotels"
  | "rentals"
  | "food"
  | "sights"
  | "services"
  | "transport"
  | "trails";

export type HomeItem = {
  id: string;
  type: HomeItemType;
  title: string;
  desc?: string;
  address?: string;
  rating?: number;
  tags?: string[];
  gallery?: string[];
  cover?: string;
};

// Some datasets store text as objects like { hy, ru, en }.
// Home components must receive plain strings to avoid React errors:
// "Objects are not valid as a React child ...".
function toText(v: any): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (typeof v === "object") {
    // Prefer Armenian as our canonical source-of-truth
    if (typeof v.hy === "string" && v.hy.trim()) return v.hy;
    if (typeof v.ru === "string" && v.ru.trim()) return v.ru;
    if (typeof v.en === "string" && v.en.trim()) return v.en;
    // fallback: first string-ish value
    for (const k of Object.keys(v)) {
      const val = v[k];
      if (typeof val === "string" && val.trim()) return val;
    }
  }
  return "";
}

function toTags(v: any): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((t) => toText(t))
    .map((s) => s.trim())
    .filter(Boolean);
}

function normalize(arr: any[], type: HomeItemType): HomeItem[] {
  return (arr || []).map((x) => {
    const gallery = Array.isArray(x.gallery) ? x.gallery : [];
    return {
      id: String(x.id),
      type: (x.type as HomeItemType) || type,
      title: toText(x.title) || toText(x.name) || "—",
      desc: toText(x.desc) || toText(x.description) || "",
      address: toText(x.address) || "",
      rating: typeof x.rating === "number" ? x.rating : undefined,
      tags: toTags(x.tags),
      gallery,
      cover: gallery[0] || x.cover || "",
    };
  });
}

/** Unified feed for Home page (simple deterministic order for now). */
export function buildHomeFeed(): HomeItem[] {
  return [
    ...normalize(hotels as any[], "hotels"),
    ...normalize(rentals as any[], "rentals"),
    ...normalize(food as any[], "food"),
    ...normalize(sights as any[], "sights"),
    ...normalize(services as any[], "services"),
    ...normalize(transport as any[], "transport"),
    ...normalize(trails as any[], "trails"),
  ];
}

export function typeLabelHY(t: HomeItemType): string {
  switch (t) {
    case "hotels":
      return "Հյուրանոց";
    case "rentals":
      return "Վարձով";
    case "food":
      return "Սնունդ";
    case "sights":
      return "Տեսարժան";
    case "services":
      return "Ծառայություն";
    case "transport":
      return "Տրանսպորտ";
    case "trails":
      return "Արշավ";
    default:
      return "Տեղ";
  }
}
