import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  hy: {
    translation: {
      app_name: "Jermuk Guide",
      home: "Home",
      search: "Search",
      map: "Map",
      favorites: "Favorites",
      more: "More",
      hotels: "Hotels",
      rentals: "Rentals",
      food: "Food & Bars",
      sights: "Sights",
      trails: "Trails",
      transport: "Transport",
      services: "Services",
      open: "Open",
      view_all: "View all",
      top_picks: "Top picks",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      call: "Call",
      whatsapp: "WhatsApp",
      route: "Route",
      coming_soon: "Coming soon",
      empty: "Nothing here yet",
      welcome_title: "Բարի գալուստ Ջերմուկ",
      welcome_continue: "Շարունակել",
      choose_lang: "Ընտրիր լեզուն",
      start: "Սկսել",
      reset_cache: "Զրոյացնել քեշը",
      reset_cache_desc: "Կջնջվի պահված լեզուն, ընտրյալները և կբացվի ողջույնը կրկին։",
      order: "Պատվիրել",
      order_help: "Լրացրու տվյալները և ուղարկիր հայտը հյուրանոցին (WhatsApp/Զանգ/Կայք)։",
      order_booking: "Booking / Website",
      order_name: "Քո անունը",
      order_from: "Մուտք (օր. 2026-02-01)",
      order_to: "Ելք (օր. 2026-02-03)",
      order_people: "Մարդկանց քանակ (օր. 2)",
      order_note: "Նշում (ընտրովի)",
      order_note_backend: "Այս փուլում backend չկա․ հայտը գնում է արտաքին կապով։"
    }
  },
  ru: {
    translation: {
      app_name: "Jermuk Guide",
      home: "Главная",
      search: "Поиск",
      map: "Карта",
      favorites: "Избранное",
      more: "Меню",
      hotels: "Отели",
      rentals: "Аренда",
      food: "Еда и бары",
      sights: "Места",
      trails: "Маршруты",
      transport: "Транспорт",
      services: "Сервисы",
      open: "Открыть",
      view_all: "Все",
      top_picks: "Рекомендации",
      about: "О городе",
      contact: "Контакты",
      faq: "FAQ",
      call: "Позвонить",
      whatsapp: "WhatsApp",
      route: "Маршрут",
      coming_soon: "Скоро",
      empty: "Пока пусто",
      welcome_title: "Добро пожаловать в Джермук",
      welcome_continue: "Продолжить",
      choose_lang: "Выберите язык",
      start: "Начать",
      reset_cache: "Сбросить кэш",
      reset_cache_desc: "Удалит сохранённый язык, избранное и снова покажет приветствие.",
      order: "Забронировать",
      order_help: "Заполните данные и отправьте запрос (WhatsApp/звонок/сайт).",
      order_booking: "Booking / Сайт",
      order_name: "Ваше имя",
      order_from: "Заезд (напр. 2026-02-01)",
      order_to: "Выезд (напр. 2026-02-03)",
      order_people: "Количество гостей (напр. 2)",
      order_note: "Комментарий (опц.)",
      order_note_backend: "На этом этапе нет backend: запрос отправляется внешним способом."
    }
  },
  en: {
    translation: {
      app_name: "Jermuk Guide",
      home: "Home",
      search: "Search",
      map: "Map",
      favorites: "Favorites",
      more: "More",
      hotels: "Hotels",
      rentals: "Rentals",
      food: "Food & Bars",
      sights: "Sights",
      trails: "Trails",
      transport: "Transport",
      services: "Services",
      open: "Open",
      view_all: "View all",
      top_picks: "Top picks",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      call: "Call",
      whatsapp: "WhatsApp",
      route: "Route",
      coming_soon: "Coming soon",
      empty: "Nothing here yet",
      welcome_title: "Welcome to Jermuk",
      welcome_continue: "Continue",
      choose_lang: "Choose language",
      start: "Start",
      reset_cache: "Reset cache",
      reset_cache_desc: "Clears saved language, favorites and shows the welcome again.",
      order: "Request / Book",
      order_help: "Fill details and send a request (WhatsApp/call/website).",
      order_booking: "Booking / Website",
      order_name: "Your name",
      order_from: "Check-in (e.g. 2026-02-01)",
      order_to: "Check-out (e.g. 2026-02-03)",
      order_people: "Guests (e.g. 2)",
      order_note: "Note (optional)",
      order_note_backend: "No backend yet: request is sent via external contact."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: (localStorage.getItem("i18nextLng") as any) || "hy",
  fallbackLng: "hy",
  interpolation: { escapeValue: false }
});

export function setLang(code: "hy" | "ru" | "en") {
  i18n.changeLanguage(code);
  try { localStorage.setItem("i18nextLng", code); } catch {}
}

export default i18n;
