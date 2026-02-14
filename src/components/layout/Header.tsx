import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "../../i18n";
import { getThemeMode, setThemeMode, setAccent } from "../../lib/theme";

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

function IconBtn({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="h-10 w-10 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[rgba(0,0,0,0.04)] transition grid place-items-center shadow-soft"
    >
      {children}
    </button>
  );
}

const ACCENTS = [
  "#ef4444", // red
  "#14b8a6", // teal
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ec4899", // pink
  "#f97316", // orange
  "#64748b", // slate
  "#7c3aed", // violet
  "#1d4ed8", // indigo
];

export default function Header() {
  const nav = useNavigate();
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

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [colorOpen, setColorOpen] = React.useState(false);

  // close popovers on outside click
  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest("[data-theme-menu]")) setMenuOpen(false);
      if (!el.closest("[data-color-modal]")) setColorOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const setMode = (mode: "light" | "dark" | "system") => {
    setThemeMode(mode);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 safe-top md:hidden">
      <div className="mx-auto max-w-md px-4 pt-3">
        {/* Theme-aware surface */}
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] backdrop-blur-xl shadow-soft px-3 py-2 flex items-center gap-3">
          {/* Left: Menu + Title */}
          <IconBtn title="Menu" onClick={() => window.dispatchEvent(new CustomEvent("ui:openMenu"))}>
            ☰
          </IconBtn>

          <div className="min-w-0 flex items-center gap-2">
            <img
              src="/brand/jermuk-logo.svg"
              className="h-8 w-8"
              alt="Jermuk"
            />
            <div className="min-w-0">
              <div className="font-extrabold leading-4 truncate text-[clamp(13px,3.2vw,16px)]">
                {t("app_name")}
              </div>
              {/* subtitle hide on very small widths */}
              <div className="hidden sm:block text-xs text-[var(--muted)] truncate">
                PWA • Cloudflare Pages
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right: Favorites + Theme + Language */}
          <div className="flex items-center gap-2 relative">
            {/* Favorites (star must exist on mobile) */}
            <IconBtn title="Favorites" onClick={() => nav("/favorites")}>
              ⭐
            </IconBtn>

            {/* Theme menu (moon/sun svg) */}
            <div data-theme-menu className="relative">
              <IconBtn
                title="Theme"
                onClick={() => setMenuOpen((v) => !v)}
              >
                {/* simple moon svg */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </IconBtn>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl shadow-soft overflow-hidden">
                  <button
                    className="w-full px-4 py-3 text-left text-sm hover:bg-[rgba(0,0,0,0.04)]"
                    onClick={() => setMode("light")}
                  >
                    Light
                  </button>
                  <button
                    className="w-full px-4 py-3 text-left text-sm hover:bg-[rgba(0,0,0,0.04)]"
                    onClick={() => setMode("dark")}
                  >
                    Dark
                  </button>
                  <button
                    className="w-full px-4 py-3 text-left text-sm hover:bg-[rgba(0,0,0,0.04)]"
                    onClick={() => setMode("system")}
                  >
                    System Default
                  </button>
                  <div className="h-px bg-[var(--border)]" />
                  <button
                    className="w-full px-4 py-3 text-left text-sm hover:bg-[rgba(0,0,0,0.04)]"
                    onClick={() => {
                      setColorOpen(true);
                      setMenuOpen(false);
                    }}
                  >
                    Theme Color
                  </button>
                </div>
              )}
            </div>

            {/* Language */}
            <button
              type="button"
              onClick={() => setLang(nextLang())}
              title={label}
              aria-label={`Language: ${label}. Tap to switch.`}
              className="h-10 w-10 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[rgba(0,0,0,0.04)] transition grid place-items-center shadow-soft"
            >
              <span className="flag">
                <FlagSvg code={current} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Theme Color Modal */}
      {colorOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center px-6">
          <div className="absolute inset-0 bg-black/55" />
          <div
            data-color-modal
            className="relative w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl shadow-soft p-5"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold">Theme Color</div>
              <button
                className="h-9 w-9 rounded-full border border-white/10 hover:bg-white/5 grid place-items-center"
                onClick={() => setColorOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-6 gap-3">
              {ACCENTS.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setAccent(c);
                    setColorOpen(false);
                  }}
                  className="h-9 w-9 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.25)]"
                  style={{ backgroundColor: c }}
                  aria-label={`Accent ${c}`}
                />
              ))}
            </div>

            <div className="mt-4 text-xs text-white/60">
              Tip: Color affects buttons and active items.
            </div>
          </div>
        </div>
      )}

      {/* Local styles for flag */}
      <style>{`
        .flag{
          width: 22px;
          height: 16px;
          border-radius: 6px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,.28);
          display: inline-flex;
        }
        .flag-svg{ width:100%; height:100%; display:block; }
      `}</style>
    </header>
  );
}
