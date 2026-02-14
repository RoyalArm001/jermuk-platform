import React from "react";
import { useNavigate } from "react-router-dom";

function ChipButton({ children, onClick, title }: { children: React.ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="h-10 px-3 rounded-full border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,.12)] hover:bg-white/80 active:scale-[.99] flex items-center gap-2 text-sm"
    >
      {children}
    </button>
  );
}

export default function Topbar() {
  const nav = useNavigate();

  return (
    <div className="rounded-[22px] border border-white/35 bg-white/55 backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,.14)] px-3 py-2 flex items-center gap-3">
      <button
        className="h-10 w-10 rounded-full border border-white/40 bg-white/70 grid place-items-center shadow-[0_12px_30px_rgba(0,0,0,.12)]"
        onClick={() => nav("/more")}
        aria-label="Menu"
      >
        ☰
      </button>

      <div className="flex items-center gap-2 min-w-[140px]">
        <div className="h-8 w-8 rounded-full bg-emerald-500/90 grid place-items-center text-white font-black">A</div>
        <div className="font-black text-sm">Jermuk Guide</div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="h-10 rounded-full border border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,.12)] px-4 flex items-center gap-2">
          <span className="opacity-70">🔎</span>
          <input
            className="w-full bg-transparent outline-none text-sm"
            placeholder="Search..."
            // TODO: connect to your search state
          />
        </div>
      </div>

      <ChipButton onClick={() => nav("/favorites")} title="Favorites">⭐</ChipButton>

      {/* Language flags (TODO: connect to your i18n setLang) */}
      <div className="flex items-center gap-2">
        <ChipButton title="Հայերեն">🇦🇲</ChipButton>
        <ChipButton title="English">🇬🇧</ChipButton>
        <ChipButton title="Русский">🇷🇺</ChipButton>
      </div>
    </div>
  );
}
