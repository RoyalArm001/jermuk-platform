import mock from "../data/mock.json";
import hotelsPack from "../data/hotels.json";
import placesPack from "../data/places.json";
import servicesPack from "../data/services.json";

const HOTEL_ITEMS = Array.isArray(hotelsPack?.items) ? hotelsPack.items : [];
const PLACE_ITEMS = Array.isArray(placesPack?.items) ? placesPack.items : [];
const SERVICE_ITEMS = Array.isArray(servicesPack?.items) ? servicesPack.items : [];
const MOCK_ITEMS = Array.isArray(mock?.items) ? mock.items : [];

// Types order for UI
export const TYPES = [
  "hotels",
  "houses",
  "places",
  "food",
  "tours",
  "services"
];

export const ITEMS = [
  ...HOTEL_ITEMS,
  ...PLACE_ITEMS,
  ...SERVICE_ITEMS,
  ...MOCK_ITEMS,
];

export function getAll() {
  return ITEMS;
}

export function getById(id) {
  return ITEMS.find((x) => x.id === id) || null;
}

export function getByType(type) {
  return ITEMS.filter((x) => x.type === type);
}

export function getFeatured() {
  // Prefer places first, then hotels
  const places = ITEMS.filter((x) => x.type === "places").slice(0, 3);
  const hotels = ITEMS.filter((x) => x.type === "hotels").slice(0, 1);
  const mix = [...places, ...hotels];
  return mix.length ? mix : ITEMS.slice(0, 4);
}

export function typeTitle(type) {
  const map = {
    hotels: "Հյուրանոցներ",
    houses: "Վարձու տներ",
    places: "Տեսարժան վայրեր",
    food: "Սնունդ",
    tours: "Տուրեր",
    services: "Ծառայություններ",
    cars: "Մեքենաներ",
  };
  return map[type] || "Ցանկ";
}
