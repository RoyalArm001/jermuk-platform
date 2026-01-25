import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import hy from "./hy.json";
import ru from "./ru.json";
import en from "./en.json";
import { getString, setString } from "../lib/storage";

const saved = getString("lang", "");
const fallback = (navigator.language || "").toLowerCase().startsWith("ru") ? "ru" : "hy";
const lng = saved || fallback;

i18n.use(initReactI18next).init({
  resources: { hy: { translation: hy }, ru: { translation: ru }, en: { translation: en } },
  lng,
  fallbackLng: "hy",
  interpolation: { escapeValue: false }
});

export function setLang(next: "hy" | "ru" | "en") {
  i18n.changeLanguage(next);
  setString("lang", next);
}

export default i18n;
