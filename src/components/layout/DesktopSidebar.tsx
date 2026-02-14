import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "../../i18n";

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

function RowLink({
  to,
  icon,
  label,
  collapsed,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  return (
    <NavLink
      to={to}
      title={label}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-3 py-3 rounded-2xl transition",
          isActive
            ? "bg-white/10"
            : "hover:bg-white/10",
        ].join(" ")
      }
    >
      <span className="h-10 w-10 rounded-2xl border border-[var(--border)] bg-white/0 grid place-items-center shadow-soft">
        <span className="text-[18px] leading-none">{icon}</span>
      </span>
      {!collapsed && <span className="text-sm font-extrabold">{label}</span>}
    </NavLink>
  );
}

function Group({
  icon,
  title,
  children,
  collapsed,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  collapsed: boolean;
  badge?: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  if (collapsed) {
    // In collapsed mode we don't show the nested tree (keeps sidebar slim and clean).
    return (
      <div className="px-2">
        <button
          type="button"
          title={title}
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-center rounded-2xl py-3 hover:bg-white/10 transition"
        >
          <span className="h-10 w-10 rounded-2xl border border-[var(--border)] grid place-items-center shadow-soft">
            <span className="text-[18px]">{icon}</span>
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="px-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/10 transition"
        aria-expanded={open}
      >
        <span className="h-10 w-10 rounded-2xl border border-[var(--border)] grid place-items-center shadow-soft">
          <span className="text-[18px]">{icon}</span>
        </span>
        <div className="flex-1 min-w-0 text-left">
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold truncate">{title}</span>
            {badge ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-500/90 text-white">
                {badge}
              </span>
            ) : null}
          </div>
        </div>
        <span className={`text-sm transition ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="ml-8 pl-4 border-l border-[var(--border)] py-2 grid gap-1">
          {children}
        </div>
      )}
    </div>
  );
}

export default function DesktopSidebar({
  collapsed,
  embedded,
  onToggleCollapse,
}: {
  collapsed: boolean;
  embedded?: boolean;
  onToggleCollapse?: () => void;
}) {
  const { t, i18n } = useTranslation();
  const current = (i18n.language as Lang) || "hy";
  const order: Lang[] = ["hy", "ru", "en"];
  const nextLang = () => {
    const idx = Math.max(0, order.indexOf(current));
    return order[(idx + 1) % order.length];
  };

  return (
    <aside
      className={
        "hidden md:block shrink-0 " +
        (collapsed ? "w-[84px]" : "w-[280px]")
      }
    >
      <div className={embedded ? "" : "sticky top-4"}>
        <div className={(embedded ? "" : "rounded-3xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl shadow-soft ") + "py-3 min-h-[calc(100vh-2rem)] flex flex-col"}>
          {/* Brand row */}
          <div className={"px-4 flex items-center gap-3 " + (collapsed ? "justify-center" : "justify-between") }>
            {!collapsed ? (
              <div className="flex items-center gap-2 min-w-0">
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  className="h-9 w-9 rounded-2xl border border-[var(--border)] hover:bg-white/10 transition grid place-items-center"
                  aria-label="Toggle sidebar"
                  title="Toggle sidebar"
                >
                  <span className="text-lg">☰</span>
                </button>
                <img src="/favicon.svg" className="h-9 w-9" alt="Jermuk" />
              </div>
            ) : (
              <img src="/favicon.svg" className="h-9 w-9" alt="Jermuk" />
            )}

            {/* Desktop: show all languages (no emoji fallback) */}
            {!collapsed ? (
              <div className="flex items-center gap-2">
                {([
                  { k: "hy" as const, title: "Հայերեն" },
                  { k: "en" as const, title: "English" },
                  { k: "ru" as const, title: "Русский" },
                ]).map(({ k, title }) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setLang(k)}
                    className={`h-9 w-9 rounded-full border border-[var(--border)] transition grid place-items-center ${
                      current === k ? "bg-white/10" : "hover:bg-white/10"
                    }`}
                    aria-label={title}
                    title={title}
                  >
                    <span className="flag">
                      <FlagSvg code={k} />
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setLang(nextLang())}
                className="h-9 w-9 rounded-full border border-[var(--border)] hover:bg-white/10 transition grid place-items-center"
                aria-label="Change language"
                title="Change language"
              >
                <span className="flag">
                  <FlagSvg code={current} />
                </span>
              </button>
            )}
          </div>

          {/* Main nav (scrollable if needed) */}
          <div className="mt-3 px-2 grid gap-1 overflow-y-auto">
            <RowLink collapsed={collapsed} to="/home" icon="🏠" label={t("home")} />
            <RowLink collapsed={collapsed} to="/search" icon="🔎" label={t("search")} />
            <RowLink collapsed={collapsed} to="/map" icon="🗺️" label={t("map")} />
            <RowLink collapsed={collapsed} to="/favorites" icon="⭐" label={t("favorites")} />
          </div>

          <div className="my-3 mx-4 h-px bg-[var(--border)] opacity-70" />

          {/* Accordion style groups like your reference menu */}
          <div className="grid gap-1">
            <Group
              collapsed={collapsed}
              icon="🏨"
              title="Հյուրանոցներ"
              children={
                <>
                  <NavLink to="/list/hotels" className="text-sm font-bold hover:underline" data-i18n="menu.stay.hotels">
                    Հյուրանոցներ / Սանատորիաներ
                  </NavLink>
                  <NavLink to="/list/rentals" className="text-sm font-bold hover:underline" data-i18n="menu.stay.rent_houses">
                    Վարձու տներ
                  </NavLink>
                  <NavLink to="/list/rentals" className="text-sm font-bold hover:underline" data-i18n="menu.stay.rent_places">
                    Վարձու վայրեր
                  </NavLink>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="🍽️"
              title="Սնունդ"
              children={
                <>
                  <NavLink to="/list/food" className="text-sm font-bold hover:underline" data-i18n="menu.food.restaurants">
                    Ռեստորաններ
                  </NavLink>
                  <NavLink to="/list/food" className="text-sm font-bold hover:underline" data-i18n="menu.food.bars">
                    Բարեր
                  </NavLink>
                  <NavLink to="/list/food" className="text-sm font-bold hover:underline" data-i18n="menu.food.cafes">
                    Լոֆթ / Սրճարան
                  </NavLink>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="🎉"
              title="Ժամանց"
              children={
                <>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.fun.places">
                    Ժամանցի վայրեր
                  </NavLink>
                  <NavLink to="/list/trails" className="text-sm font-bold hover:underline" data-i18n="menu.fun.activities">
                    Ակտիվություններ
                  </NavLink>
                  <NavLink to="/more" className="text-sm font-bold hover:underline" data-i18n="menu.fun.online">
                    Առցանց
                  </NavLink>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="🧳"
              title="Շրջագայություններ"
              children={
                <>
                  <NavLink to="/list/trails" className="text-sm font-bold hover:underline" data-i18n="menu.tours.all">
                    Շրջագայություններ
                  </NavLink>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="🧭"
              title="Տեսարժան վայրեր"
              children={
                <>
                  <NavLink to="/list/sights" className="text-sm font-bold hover:underline" data-i18n="menu.sights.jermuk">
                    Ջերմուկի
                  </NavLink>
                  <NavLink to="/list/sights" className="text-sm font-bold hover:underline" data-i18n="menu.sights.vayots_dzor">
                    Վայոց ձոր
                  </NavLink>
                  <NavLink to="/list/sights" className="text-sm font-bold hover:underline" data-i18n="menu.sights.syunik">
                    Սյունիք
                  </NavLink>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="🚕"
              title="Տրանսպորտ"
              children={
                <>
                  <NavLink to="/list/transport" className="text-sm font-bold hover:underline" data-i18n="menu.transport.taxi">
                    Տաքսի
                  </NavLink>
                  <NavLink to="/list/transport" className="text-sm font-bold hover:underline" data-i18n="menu.transport.intercity">
                    Միջքաղաքային
                  </NavLink>
                  <NavLink to="/list/transport" className="text-sm font-bold hover:underline" data-i18n="menu.transport.yerevan">
                    Դեպի Երևան
                  </NavLink>
                  <NavLink to="/list/transport" className="text-sm font-bold hover:underline" data-i18n="menu.transport.4x4">
                    4x4 մեքենաներ
                  </NavLink>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="🧰"
              title="Ծառայություններ"
              children={
                <>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.shops">
                    Խանութներ
                  </NavLink>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.barber">
                    Վարսավիրանոցներ
                  </NavLink>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.beauty">
                    Հարդարում / Սրահներ
                  </NavLink>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.clothes">
                    Շորի խանութներ
                  </NavLink>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.construction">
                    Շինանյութ
                  </NavLink>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.filming">
                    Նկարահանում
                  </NavLink>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.cartoon">
                    Մուլտ հերոսներ
                  </NavLink>
                  <NavLink to="/list/services" className="text-sm font-bold hover:underline" data-i18n="menu.services.printing">
                    Տպագրություն
                  </NavLink>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="📣"
              title="Հետևեք սոցիալական ցանցերին"
              children={
                <>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" data-i18n="social.facebook">
                    Ֆեյսբուք
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" data-i18n="social.instagram">
                    Ինստագրամ
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" data-i18n="social.youtube">
                    YouTube
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" data-i18n="social.twitter">
                    Թվիթթեր
                  </a>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" data-i18n="social.whatsapp">
                    WhatsApp
                  </a>
                  <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline" data-i18n="social.telegram">
                    Telegram
                  </a>
                </>
              }
            />

            <Group
              collapsed={collapsed}
              icon="⋯"
              title="Ավելին"
              children={
                <>
                  <NavLink to="/disclaimer" className="text-sm font-bold hover:underline" data-i18n="menu.more.info">
                    Տեղեկություն
                  </NavLink>
                  <NavLink to="/contact" className="text-sm font-bold hover:underline" data-i18n="menu.more.contact">
                    Կապ
                  </NavLink>
                  <NavLink to="/about" className="text-sm font-bold hover:underline" data-i18n="menu.more.about">
                    Մասին
                  </NavLink>
                </>
              }
            />
          </div>
</div>

          {/* Footer links pinned to bottom */}
          {!collapsed ? (
            <div className="mt-auto pt-4 px-4 text-xs text-[var(--muted)] flex flex-wrap gap-x-3 gap-y-2">
              <NavLink to="/sitemap" className="hover:underline">Sitemap</NavLink>
              <NavLink to="/privacy" className="hover:underline">Privacy</NavLink>
              <NavLink to="/about" className="hover:underline">About</NavLink>
            </div>
          ) : null}
        </div>

        <style>{`
          .flag{
            width: 22px;
            height: 16px;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,.18);
            display: inline-flex;
          }
          .flag-svg{ width:100%; height:100%; display:block; }
        `}</style>
      </div>
    </aside>
  );
}
