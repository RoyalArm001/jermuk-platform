import { setBool, setString } from "./storage";

const RAW_KEYS = [
  "i18nextLng",
  "fav_ids_v1",
  "data_override_v1"
];

// App keys that use the "jermuk_" namespace (lib/storage.ts)
const NS_KEYS = [
  "lang",
  "fav_ids_v1",
  "data_override_v1"
];

export function resetAppCache() {
  try {
    // remove non-namespaced keys (legacy)
    RAW_KEYS.forEach((k) => localStorage.removeItem(k));

    // remove namespaced keys
    NS_KEYS.forEach((k) => localStorage.removeItem("jermuk_" + k));

    // ensure i18n is reset
    setString("lang", "");
    setBool("intro_seen", false); // harmless if older builds still read it
  } catch {}
}
