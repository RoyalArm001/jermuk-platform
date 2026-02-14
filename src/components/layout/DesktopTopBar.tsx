import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { setLang } from "../../i18n";
import { setThemeMode, setAccent } from "../../lib/theme";

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

const ACCENTS = [
  "#ef4444",
  "#14b8a6",
  "#3b82f6",
  "#f59e0b",
  "#ec4899",
  "#f97316",
  "#64748b",
  "#7c3aed",
  "#1d4ed8",
];

function IconBtn({
  children,
  onClick,
  title,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  title: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={
        "h-10 w-10 rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] hover:bg-white/10 transition grid place-items-center shadow-[0_12px_30px_rgba(0,0,0,.18)] " +
        className
      }
    >
      {children}
    </button>
  );
}

// DesktopTopBar (used on desktop, but also safe if rendered on smaller widths):
// - Keeps compact layout
// - Search hides on very small widths
// - Has Theme mode + Theme color picker (like your screenshots)
export default function DesktopTopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { t, i18n } = useTranslation();
  const nav = useNavigate();
  const current = (i18n.language as Lang) || "hy";

  const order: Lang[] = ["hy", "ru", "en"];
  const nextLang = () => {
    const idx = Math.max(0, order.indexOf(current));
    return order[(idx + 1) % order.length];
  };

  const [modeOpen, setModeOpen] = React.useState(false);
  const [colorOpen, setColorOpen] = React.useState(false);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el.closest("[data-theme-menu]")) setModeOpen(false);
      if (!el.closest("[data-color-modal]")) setColorOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="rounded-[22px] border border-white/10 bg-[rgba(7,11,19,0.55)] text-[var(--fg)] backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.28)] px-3 py-2 flex items-center gap-3">
      {/* Menu */}
      <IconBtn title={t("menu")} onClick={onOpenMenu}>
        ☰
      </IconBtn>

      {/* Brand / title */}
      <div className="flex items-center gap-2 min-w-0">
        <img src="/brand/jermuk-logo.svg" className="h-8 w-8" alt="Jermuk" />
        <div className="min-w-0">
          <div className="font-black text-sm truncate">{t("app_name")}</div>
        </div>
      </div>

      {/* Search (hide on very small widths) */}
      <div className="hidden sm:flex flex-1 min-w-0">
        <div className="h-10 w-full rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,.18)] px-4 flex items-center gap-2">
          <span className="opacity-70">🔎</span>
          <input
            className="w-full bg-transparent outline-none text-sm"
            placeholder={t("search") + "..."}
          />
        </div>
      </div>

      {/* Favorites */}
      <IconBtn title={t("favorites")} onClick={() => nav("/favorites")}>
        ⭐
      </IconBtn>

      {/* Theme menu */}
      <div data-theme-menu className="relative">
        <IconBtn title="Theme" onClick={() => setModeOpen((v) => !v)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </IconBtn>

        {modeOpen && (
          <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/10 bg-[rgba(12,18,32,0.92)] backdrop-blur-xl shadow-[0_22px_60px_rgba(0,0,0,.45)] overflow-hidden z-50">
            <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5" onClick={() => { setThemeMode("light"); setModeOpen(false); }}>
              Light
            </button>
            <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5" onClick={() => { setThemeMode("dark"); setModeOpen(false); }}>
              Dark
            </button>
            <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5" onClick={() => { setThemeMode("system"); setModeOpen(false); }}>
              System Default
            </button>
            <div className="h-px bg-white/10" />
            <button className="w-full px-4 py-3 text-left text-sm hover:bg-white/5" onClick={() => { setColorOpen(true); setModeOpen(false); }}>
              Theme Color
            </button>
          </div>
        )}
      </div>

      {/* Language */}
      <button
        type="button"
        onClick={() => setLang(nextLang())}
        className="h-10 w-10 rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] hover:bg-white/10 transition grid place-items-center shadow-[0_12px_30px_rgba(0,0,0,.18)]"
        title={current === "hy" ? "Հայերեն" : current === "ru" ? "Русский" : "English"}
      >
        <span className="flag">
          <FlagSvg code={current} />
        </span>
      </button>

      {/* Theme Color Modal */}
      {colorOpen && (
        <div className="fixed inset-0 z-[70] grid place-items-center px-6">
          <div className="absolute inset-0 bg-black/55" />
          <div
            data-color-modal
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[rgba(12,18,32,0.92)] backdrop-blur-xl shadow-[0_28px_80px_rgba(0,0,0,.55)] p-5"
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
    </div>
  );
}
