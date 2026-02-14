const DICTS = {
  hy: {
    "nav.home": "Գլխավոր",
    "nav.hotels": "Հյուրանոցներ",
    "nav.sights": "Տեսարժան վայրեր",
    "nav.services": "Ծառայություններ",
    "nav.about": "Մեր մասին",
    "home.title": "Բարի գալուստ Ջերմուկ",
    "home.lead": "Մի վայր՝ հյուրանոցների, ռեստորանների, տեսարժան վայրերի և ծառայությունների համար։",
    "home.cta": "Դիտել հյուրանոցները",
    "hotels.title": "Հյուրանոցներ",
    "hotels.lead": "Ընտրիր հարմար տարբերակը՝ գնի, գնահատականի և հարմարությունների հիման վրա։",
    "common.search": "Որոնել…",
    "common.from": "Սկսած",
    "common.call": "Զանգահարել",
    "common.details": "Մանրամասներ",
    "common.close": "Փակել",
    "lang.title": "Ընտրիր լեզուն",
    "about.title": "Jermuk Travel",
    "about.lead": "Տեղական, արագ և պարզ հարթակ՝ Ջերմուկ այցելողներին օգնելու համար։"
  },
  en: {
    "nav.home": "Home",
    "nav.hotels": "Hotels",
    "nav.sights": "Sights",
    "nav.services": "Services",
    "nav.about": "About",
    "home.title": "Welcome to Jermuk",
    "home.lead": "One place for hotels, restaurants, sights and local services.",
    "home.cta": "Browse hotels",
    "hotels.title": "Hotels",
    "hotels.lead": "Find the right option by price, rating and amenities.",
    "common.search": "Search…",
    "common.from": "From",
    "common.call": "Call",
    "common.details": "Details",
    "common.close": "Close",
    "lang.title": "Choose language",
    "about.title": "Jermuk Travel",
    "about.lead": "Local, fast and simple platform for Jermuk visitors."
  },
  ru: {
    "nav.home": "Главная",
    "nav.hotels": "Отели",
    "nav.sights": "Места",
    "nav.services": "Сервисы",
    "nav.about": "О нас",
    "home.title": "Добро пожаловать в Джермук",
    "home.lead": "Всё в одном: отели, рестораны, места и местные сервисы.",
    "home.cta": "Смотреть отели",
    "hotels.title": "Отели",
    "hotels.lead": "Подбери вариант по цене, рейтингу и удобствам.",
    "common.search": "Поиск…",
    "common.from": "От",
    "common.call": "Позвонить",
    "common.details": "Подробнее",
    "common.close": "Закрыть",
    "lang.title": "Выберите язык",
    "about.title": "Jermuk Travel",
    "about.lead": "Локальная, быстрая и простая платформа для гостей Джермука."
  }
};

export function getLang(){
  const ls = (localStorage.getItem('jt_lang') || '').trim();
  if (ls && DICTS[ls]) return ls;
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('hy')) return 'hy';
  if (nav.startsWith('ru')) return 'ru';
  return 'en';
}

export function setLang(lang){
  if (!DICTS[lang]) lang = 'en';
  localStorage.setItem('jt_lang', lang);
  applyI18n(lang);
}

export function t(key, lang){
  const l = DICTS[lang] ? lang : getLang();
  return DICTS[l][key] || DICTS.en[key] || key;
}

export function applyI18n(lang){
  const l = DICTS[lang] ? lang : getLang();
  document.documentElement.lang = l;
  const nodes = document.querySelectorAll('[data-i18n]');
  nodes.forEach(n => {
    const key = n.getAttribute('data-i18n');
    n.textContent = t(key, l);
  });
  const langBadge = document.getElementById('langBadge');
  if (langBadge) langBadge.textContent = l.toUpperCase();
}
