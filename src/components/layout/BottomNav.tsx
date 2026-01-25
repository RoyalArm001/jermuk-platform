import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Item = ({ to, label, icon }: { to: string; label: string; icon: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-2xl transition border
      ${isActive ? "bg-[var(--accent)] text-white border-transparent" : "bg-transparent text-[var(--fg)] border-[var(--border)]"}`
    }
  >
    <span className="text-base leading-none">{icon}</span>
    <span className="text-[11px] font-semibold">{label}</span>
  </NavLink>
);

export default function BottomNav() {
  const { t } = useTranslation();
  return (
    <nav className="fixed left-0 right-0 bottom-0 z-30 safe-bottom md:hidden">
      <div className="mx-auto max-w-md px-4 pb-4 md:max-w-6xl md:px-6">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl shadow-soft p-2 grid grid-cols-5 gap-2">
          <Item to="/home" label={t("home")} icon="🏠" />
          <Item to="/search" label={t("search")} icon="🔎" />
          <Item to="/map" label={t("map")} icon="🗺️" />
          <Item to="/favorites" label={t("favorites")} icon="❤️" />
          <Item to="/more" label={t("more")} icon="☰" />
        </div>
      </div>
    </nav>
  );
}
