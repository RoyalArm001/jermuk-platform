import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "../../i18n";
import Accordion from "../ui/Accordion";
import NavPill from "../ui/NavPill";

type Lang = "hy" | "ru" | "en";

function FlagSvg({ code }: { code: Lang }) {
  if (code === "hy") {
    return (
      <svg viewBox="0 0 3 2" className="flag-svg" aria-hidden="true">
        <rect width="3" height="2" fill="#D90012" />
        <rect width="3" height="1.333" y="0.666" fill="#0033A0" />
        <rect width="3" height="0.666" y="1.333" fill="#F2A800" />
      </svg>
    );
  }
  if (code === "ru") {
    return (
      <svg viewBox="0 0 3 2" className="flag-svg" aria-hidden="true">
        <rect width="3" height="2" fill="#ffffff" />
        <rect width="3" height="1.333" y="0.666" fill="#0039A6" />
        <rect width="3" height="0.666" y="1.333" fill="#D52B1E" />
      </svg>
    );
  }
  // UK (for EN)
  return (
    <svg viewBox="0 0 60 30" className="flag-svg" aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export default function DesktopMenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const nav = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = ((i18n.language || "hy").slice(0, 2) as Lang) || "hy";

  // Esc closes
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const go = (to: string) => {
    nav(to);
    onClose();
  };
  const ext = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute left-4 right-4 top-4 bottom-4 md:left-6 md:right-auto md:top-6 md:bottom-6 md:w-[420px] md:max-w-[calc(100vw-3rem)]">
        <div className="h-full rounded-[28px] border border-white/35 bg-white/60 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,.18)] p-4 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img src="/favicon.svg" className="h-9 w-9" alt="Jermuk" />
              <div className="min-w-0">
                <div className="font-black leading-tight truncate" data-i18n="app_name">
                  {t("app_name")}
                </div>
                <div className="text-xs opacity-70" data-i18n="menu">
                  Մենյու
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="h-10 w-10 rounded-full border border-white/40 bg-white/70 grid place-items-center shadow-[0_12px_30px_rgba(0,0,0,.12)] hover:bg-white/80 active:scale-[.99]"
              aria-label="Close"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* Language row */}
          <div className="mt-3 flex items-center gap-2">
            {([
              { k: "hy" as const, title: "Հայերեն" },
              { k: "en" as const, title: "English" },
              { k: "ru" as const, title: "Русский" },
            ]).map(({ k, title }) => (
              <button
                key={k}
                type="button"
                onClick={() => setLang(k)}
                className={
                  "h-10 w-10 rounded-full border border-white/40 bg-white/70 shadow-[0_12px_30px_rgba(0,0,0,.12)] grid place-items-center transition " +
                  (lang === k ? "ring-2 ring-emerald-500/40" : "hover:bg-white/80")
                }
                aria-label={title}
                title={title}
              >
                <span className="flag">
                  <FlagSvg code={k} />
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-2 overflow-y-auto pr-1">
            <NavPill icon="🏠" label={t("home")} dataKey="home" onClick={() => go("/home")} />
            <NavPill icon="🔎" label={t("search")} dataKey="search" onClick={() => go("/search")} />
            <NavPill icon="🗺️" label={t("map")} dataKey="map" onClick={() => go("/map")} />
            <NavPill icon="⭐" label={t("favorites")} dataKey="favorites" onClick={() => go("/favorites")} />

            <div className="my-3 h-px bg-black/10" />

            <Accordion
              title="Հյուրանոցներ"
              titleKey="menu.stay"
              icon="🏨"
              items={[
                { label: "Հյուրանոցներ / Սանատորիաներ", dataKey: "menu.stay.hotels", onClick: () => go("/list/hotels") },
                { label: "Վարձու տներ", dataKey: "menu.stay.rent_houses", onClick: () => go("/list/rentals") },
                { label: "Վարձու վայրեր", dataKey: "menu.stay.rent_places", onClick: () => go("/list/rentals") },
              ]}
            />

            <Accordion
              title="Սնունդ"
              titleKey="menu.food"
              icon="🍽️"
              items={[
                { label: "Ռեստորաններ", dataKey: "menu.food.restaurants", onClick: () => go("/list/food") },
                { label: "Բարեր", dataKey: "menu.food.bars", onClick: () => go("/list/food") },
                { label: "Լոֆթ / Սրճարան", dataKey: "menu.food.cafes", onClick: () => go("/list/food") },
              ]}
            />

            <Accordion
              title="Ժամանց"
              titleKey="menu.fun"
              icon="🎉"
              items={[
                { label: "Ժամանցի վայրեր", dataKey: "menu.fun.places", onClick: () => go("/list/services") },
                { label: "Ակտիվություններ", dataKey: "menu.fun.activities", onClick: () => go("/list/trails") },
                { label: "Առցանց", dataKey: "menu.fun.online", onClick: () => go("/more") },
              ]}
            />

            <Accordion
              title="Շրջագայություններ"
              titleKey="menu.tours"
              icon="🧳"
              items={[{ label: "Շրջագայություններ", dataKey: "menu.tours.all", onClick: () => go("/list/trails") }]}
            />

            <Accordion
              title="Տեսարժան վայրեր"
              titleKey="menu.sights"
              icon="🧭"
              items={[
                { label: "Ջերմուկի", dataKey: "menu.sights.jermuk", onClick: () => go("/list/sights") },
                { label: "Վայոց ձոր", dataKey: "menu.sights.vayots_dzor", onClick: () => go("/list/sights") },
                { label: "Սյունիք", dataKey: "menu.sights.syunik", onClick: () => go("/list/sights") },
              ]}
            />

            <Accordion
              title="Տրանսպորտ"
              titleKey="menu.transport"
              icon="🚕"
              items={[
                { label: "Տաքսի", dataKey: "menu.transport.taxi", onClick: () => go("/list/transport") },
                { label: "Միջքաղաքային", dataKey: "menu.transport.intercity", onClick: () => go("/list/transport") },
                { label: "Դեպի Երևան", dataKey: "menu.transport.yerevan", onClick: () => go("/list/transport") },
                { label: "4x4 մեքենաներ", dataKey: "menu.transport.4x4", onClick: () => go("/list/transport") },
              ]}
            />

            <Accordion
              title="Ծառայություններ"
              titleKey="menu.services"
              icon="🧰"
              items={[
                { label: "Խանութներ", dataKey: "menu.services.shops", onClick: () => go("/list/services") },
                { label: "Վարսավիրանոցներ", dataKey: "menu.services.barber", onClick: () => go("/list/services") },
                { label: "Հարդարում / Սրահներ", dataKey: "menu.services.beauty", onClick: () => go("/list/services") },
                { label: "Շորի խանութներ", dataKey: "menu.services.clothes", onClick: () => go("/list/services") },
                { label: "Շինանյութ", dataKey: "menu.services.construction", onClick: () => go("/list/services") },
                { label: "Նկարահանում", dataKey: "menu.services.filming", onClick: () => go("/list/services") },
                { label: "Մուլտ հերոսներ", dataKey: "menu.services.cartoon", onClick: () => go("/list/services") },
                { label: "Տպագրություն", dataKey: "menu.services.printing", onClick: () => go("/list/services") },
              ]}
            />

            <Accordion
              title="Հետևեք սոցիալական ցանցերին"
              titleKey="menu.social"
              icon="📣"
              items={[
                { label: "Ֆեյսբուք", dataKey: "social.facebook", onClick: () => ext("https://facebook.com") },
                { label: "Ինստագրամ", dataKey: "social.instagram", onClick: () => ext("https://instagram.com") },
                { label: "YouTube", dataKey: "social.youtube", onClick: () => ext("https://youtube.com") },
                { label: "Թվիթթեր", dataKey: "social.twitter", onClick: () => ext("https://twitter.com") },
                { label: "WhatsApp", dataKey: "social.whatsapp", onClick: () => ext("https://wa.me/") },
                { label: "Telegram", dataKey: "social.telegram", onClick: () => ext("https://t.me/") },
              ]}
            />

            <Accordion
              title="Ավելին"
              titleKey="menu.more"
              icon="⋯"
              items={[
                { label: "Տեղեկություն", dataKey: "menu.more.info", onClick: () => go("/disclaimer") },
                { label: "Կապ", dataKey: "menu.more.contact", onClick: () => go("/contact") },
                { label: "Մասին", dataKey: "menu.more.about", onClick: () => go("/about") },
              ]}
            />
          </div>

          <div className="mt-4 pt-3 border-t border-black/10 text-[11px] opacity-75 flex items-center gap-3 flex-wrap">
            <button className="hover:underline" onClick={() => go("/sitemap")} data-i18n="footer.sitemap">
              Կայքի քարտեզ
            </button>
            <button className="hover:underline" onClick={() => go("/privacy")} data-i18n="footer.privacy">
              Գաղտնիություն
            </button>
            <button className="hover:underline" onClick={() => go("/about")} data-i18n="footer.about">
              Մասին
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .flag{ width: 22px; height: 16px; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.18); display:inline-flex; }
        .flag-svg{ width:100%; height:100%; display:block; }
      `}</style>
    </div>
  );
}
