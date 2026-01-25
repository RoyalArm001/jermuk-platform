import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "../../i18n";

type Lang = "hy" | "ru" | "en";

function FlagSvg({ code }: { code: Lang }) {
  // Inline SVG so it renders одинаково on all devices (no emoji fonts).
  if (code === "hy") {
    // Armenia
    return (
      <svg viewBox="0 0 3 2" className="flag-svg" aria-hidden="true">
        <rect width="3" height="2" fill="#D90012" />
        <rect width="3" height="1.333" y="0.666" fill="#0033A0" />
        <rect width="3" height="0.666" y="1.333" fill="#F2A800" />
      </svg>
    );
  }
  if (code === "ru") {
    // Russia
    return (
      <svg viewBox="0 0 3 2" className="flag-svg" aria-hidden="true">
        <rect width="3" height="2" fill="#ffffff" />
        <rect width="3" height="1.333" y="0.666" fill="#0039A6" />
        <rect width="3" height="0.666" y="1.333" fill="#D52B1E" />
      </svg>
    );
  }
  // EN – UK (simplified)
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

export default function Header() {
  const { t, i18n } = useTranslation();
  const current = (i18n.language as Lang) || "hy";

  // click -> next flag (HY -> RU -> EN -> HY)
  const order: Lang[] = ["hy", "ru", "en"];
  const nextLang = () => {
    const idx = Math.max(0, order.indexOf(current));
    return order[(idx + 1) % order.length];
  };

  const label =
    current === "hy" ? "Հայերեն" : current === "ru" ? "Русский" : "English";

  return (
    <header className="sticky top-0 z-30 safe-top">
      <div className="mx-auto max-w-md px-4 pt-3 md:max-w-6xl md:px-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl shadow-soft px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/favicon.svg" className="h-8 w-8" alt="Jermuk" />
            <div className="min-w-0">
              <div className="text-sm font-extrabold leading-4 truncate">
                {t("app_name")}
              </div>
              <div className="text-xs text-[var(--muted)]">
                PWA • Cloudflare Pages
              </div>
            </div>
          </div>

          {/* Desktop navigation (shows on md+) */}
          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            {[
              ["/home", t("home")],
              ["/search", t("search")],
              ["/map", t("map")],
              ["/favorites", t("favorites")],
              ["/more", t("more")],
            ].map(([to, label]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-2xl text-xs font-extrabold border transition
                  ${isActive ? "bg-[var(--accent)] text-white border-transparent" : "bg-transparent text-[var(--fg)] border-[var(--border)] hover:bg-white/10"}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Single language button: click cycles to next flag */}
          <button
            type="button"
            onClick={() => setLang(nextLang())}
            title={label}
            aria-label={`Language: ${label}. Tap to switch.`}
            className="h-9 w-9 rounded-full border border-[var(--border)] bg-transparent hover:bg-white/10 transition flex items-center justify-center"
          >
            <span className="flag">
              <FlagSvg code={current} />
            </span>
          </button>
        </div>
      </div>

      {/* Local styles for the tiny flag */}
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
    </header>
  );
}
