import React from "react";

export default function NavPill({
  icon,
  label,
  onClick,
  dataKey,
  className = "",
}: {
  icon: string;
  label: string;
  onClick: () => void;
  /** Optional i18n key marker for automated translation tooling */
  dataKey?: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 border border-white/30 bg-white/65 backdrop-blur-xl shadow-[0_10px_26px_rgba(0,0,0,.10)] hover:bg-white/75 active:scale-[.995] " +
        className
      }
    >
      <span className="h-10 w-10 rounded-2xl border border-white/40 bg-white/70 grid place-items-center shadow-[0_10px_26px_rgba(0,0,0,.10)]">
        {icon}
      </span>
      <span className="font-semibold text-sm" data-i18n={dataKey || undefined}>
        {label}
      </span>
    </button>
  );
}
