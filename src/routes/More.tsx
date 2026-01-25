import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import Accordion from "../components/ui/Accordion";
import city from "../data/city.json";

const TreeItem = ({
  to,
  icon,
  title,
  subtitle,
  compact,
}: {
  to: string;
  icon?: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
}) => (
  <Link to={to} className="block">
    <div
      className={[
        "group flex items-center gap-3 rounded-2xl border border-transparent",
        "bg-black/10 hover:bg-white/5 hover:border-[var(--border)]",
        compact ? "py-2 px-3" : "py-3 px-3",
      ].join(" ")}
    >
      <span className="h-2 w-2 rounded-full bg-white/55 shadow-[0_0_0_6px_rgba(255,255,255,0.06)] shrink-0" />
      {icon ? (
        <span className={["shrink-0 grid place-items-center rounded-2xl border border-[var(--border)] bg-white/0",
          compact ? "h-8 w-8 text-sm" : "h-9 w-9 text-base"].join(" ")}>
          {icon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <div className={["font-extrabold truncate", compact ? "text-sm" : "text-sm"].join(" ")}>
          {title}
        </div>
        {subtitle ? (
          <div className={["text-[var(--muted)] truncate mt-0.5", compact ? "text-[11px]" : "text-xs"].join(" ")}>
            {subtitle}
          </div>
        ) : null}
      </div>
      <div className="text-[var(--muted)] font-black opacity-70 group-hover:opacity-100">›</div>
    </div>
  </Link>
);

const TreeGroup = ({
  children,
  compact,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) => (
  <div className={["relative", compact ? "pl-7" : "pl-8"].join(" ")}>
    <div
      className={[
        "absolute",
        compact ? "left-[11px]" : "left-[14px]",
        compact ? "top-3" : "top-3",
        compact ? "bottom-3" : "bottom-4",
        "w-px rounded bg-[var(--border)] opacity-60",
      ].join(" ")}
    />
    <div className={compact ? "grid gap-2 pt-2" : "grid gap-2 pt-3"}>{children}</div>
  </div>
);

export default function More() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";
  const c = (city as any)[lang];
  const compact = true;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
    >
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-lg font-black">{t("more")}</div>
          <div className="text-xs text-[var(--muted)] mt-1">Menu • Categories • Info</div>
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        <Accordion title="Categories" icon="🧭" defaultOpen>
          <TreeGroup compact={compact}>
            <TreeItem to="/stay" icon="🏨" title={t("stay")} subtitle={t("stay_sub")} compact={compact} />
            <TreeItem to="/list/food" icon="🍽️" title={t("food")} subtitle="Food • bars • cafe" compact={compact} />
            <TreeItem to="/list/sights" icon="🏞️" title={t("sights")} subtitle="Nature • culture • places" compact={compact} />
            <TreeItem to="/list/trails" icon="🚶" title={t("trails")} subtitle="Routes • hiking" compact={compact} />
            <TreeItem to="/transport" icon="🚗" title={t("transport")} subtitle={t("transport_sub")} compact={compact} />
            <TreeItem to="/list/services" icon="🛎️" title={t("services")} subtitle="Guides • tours • help" compact={compact} />
          </TreeGroup>
        </Accordion>

        <Accordion title={t("map")} icon="🗺️">
          <TreeGroup compact={compact}>
            <TreeItem to="/map" icon="📍" title="Open Map" subtitle="Pins by geo.lat/lng" compact={compact} />
          </TreeGroup>
        </Accordion>

        <Accordion title={t("about")} icon="ℹ️">
          <div className="pt-3 text-sm text-[var(--muted)] leading-relaxed">
            <div className="text-sm font-extrabold text-[var(--fg)]">{c?.name}</div>
            <div className="mt-2">{c?.short}</div>
            <div className="mt-3 text-xs">
              {c?.facts?.region}
              {c?.facts?.elevation_m ? ` • ${c.facts.elevation_m}m` : ""}
            </div>
          </div>
        </Accordion>

        <Accordion title={t("contact")} icon="☎️">
          <div className="pt-3 text-sm text-[var(--muted)] leading-relaxed">
            RoyalArm Contact: <span className="font-extrabold text-[var(--fg)]">091733633</span>
            <div className="mt-3 flex gap-2">
              <a className="text-sm font-extrabold text-[var(--accent)]" href="tel:091733633">
                Call
              </a>
              <span className="text-[var(--muted)]">•</span>
              <a
                className="text-sm font-extrabold text-[var(--accent)]"
                href="https://wa.me/37491733633"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Accordion>

        <Accordion title={t("faq")} icon="❓">
          <div className="pt-3 text-sm text-[var(--muted)] leading-relaxed">
            Phase 1–3 — UI & core pages • Phase 5 — Map • Next — real data fill (Jermuk).
          </div>
        </Accordion>

        <Card className="p-4">
          <div className="text-center text-xs text-[var(--muted)]">
            <Link to="/sitemap" className="font-bold text-[var(--accent)]">Sitemap</Link>
            <span className="opacity-60"> • </span>
            <Link to="/disclaimer" className="font-bold text-[var(--accent)]">Disclaimer</Link>
            <span className="opacity-60"> • </span>
            <Link to="/privacy" className="font-bold text-[var(--accent)]">Privacy</Link>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
