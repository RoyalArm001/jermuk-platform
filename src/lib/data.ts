import hotels from "../data/hotels.json";
import rentals from "../data/rentals.json";
import sights from "../data/sights.json";
import food from "../data/food.json";
import services from "../data/services.json";
import transport from "../data/transport.json";
import trails from "../data/trails.json";
import { getJson } from "./storage";

export type Lang = "hy" | "ru" | "en";
export type Place = typeof hotels[number];

const KEY = "data_override_v1";

function baseData() {
  return {
    hotels: hotels as any,
    rentals: rentals as any,
    sights: sights as any,
    food: food as any,
    services: services as any,
    transport: transport as any,
    trails: trails as any
  } as Record<string, Place[]>;
}

export const DATA: Record<string, Place[]> = (() => {
  const base = baseData();
  const override = getJson<Record<string, Place[]>>(KEY, {} as any);
  // Only merge known keys
  const merged: any = { ...base };
  for (const k of Object.keys(base)) {
    if (Array.isArray((override as any)[k]) && (override as any)[k].length) merged[k] = (override as any)[k];
  }
  return merged;
})();

export function findPlaceById(id: string): { type: string; place: Place } | null {
  for (const [type, list] of Object.entries(DATA)) {
    const found = (list as any[]).find((x) => x.id === id);
    if (found) return { type, place: found as any };
  }
  return null;
}
