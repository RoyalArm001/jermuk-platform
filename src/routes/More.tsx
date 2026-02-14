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
        <div className={["font-extrabold truncate", compact ? "text-sm" : "text-sm"].join(" ")} data-tr="1">
          {title}
        </div>
        {subtitle ? (
          <div className={["text-[var(--muted)] truncate mt-0.5", compact ? "text-[11px]" : "text-xs"].join(" ")} data-tr="1">
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
  const { t } = useTranslation();
  // Content stays Armenian (HY only) — online translate will target marked nodes.
  const c = (city as any).hy;
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
          <div className="text-xs text-[var(--muted)] mt-1" data-tr="1">Մենյու • Բաժիններ • Տեղեկություն</div>
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        <Accordion title="Բաժիններ" icon="🧭" defaultOpen>
          <TreeGroup compact={compact}>
            <TreeItem to="/stay" icon="🏨" title={t("stay")} subtitle={t("stay_sub")} compact={compact} />
            <TreeItem to="/list/food" icon="🍽️" title={t("food")} subtitle="Սնունդ • սրճարան • ռեստորան" compact={compact} />
            <TreeItem to="/list/sights" icon="🏞️" title={t("sights")} subtitle="Բնություն • մշակույթ • վայրեր" compact={compact} />
            <TreeItem to="/list/trails" icon="🚶" title={t("trails")} subtitle="Երթուղիներ • քայլարշավ" compact={compact} />
            <TreeItem to="/transport" icon="🚗" title={t("transport")} subtitle={t("transport_sub")} compact={compact} />
            <TreeItem to="/list/services" icon="🛎️" title={t("services")} subtitle="Ուղեցույց • տուրեր • օգնություն" compact={compact} />
          </TreeGroup>
        </Accordion>

        <Accordion title={t("map")} icon="🗺️">
          <TreeGroup compact={compact}>
            <TreeItem to="/map" icon="📍" title="Բացել քարտեզը" subtitle="Կետեր ըստ տեղադրության" compact={compact} />
          </TreeGroup>
        </Accordion>

        <Accordion title={t("about")} icon="ℹ️">
          <div className="pt-3 text-sm text-[var(--muted)] leading-relaxed">
            <div className="text-sm font-extrabold text-[var(--fg)]" data-tr="1">{c?.name}</div>
            <div className="mt-2" data-tr="1">{c?.short}</div>
            <div className="mt-3 text-xs" data-tr="1">
              {c?.facts?.region}
              {c?.facts?.elevation_m ? ` • ${c.facts.elevation_m}m` : ""}
            </div>
          </div>
        </Accordion>

        <Accordion title={t("contact")} icon="☎️">
          <div className="pt-3 text-sm text-[var(--muted)] leading-relaxed">
            <span data-tr="1">Կապ՝</span> <span className="font-extrabold text-[var(--fg)]">091733633</span>
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
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-[var(--muted)]">
              © {new Date().getFullYear()}{" "}
              <span className="font-bold text-[var(--accent)]">RoyalArm</span>{" "}
              <span className="opacity-60">•</span> All rights reserved.
            </div>

            <div className="text-xs text-[var(--muted)] flex flex-wrap items-center gap-x-3 gap-y-2">
              <Link to="/terms" className="font-bold text-[var(--accent)] hover:underline">Terms of Use</Link>
              <span className="opacity-60">•</span>
              <Link to="/sitemap" className="font-bold text-[var(--accent)] hover:underline">Sitemap</Link>
              <span className="opacity-60">•</span>
              <Link to="/privacy" className="font-bold text-[var(--accent)] hover:underline">Privacy</Link>
              <span className="opacity-60">•</span>
              <Link to="/contact" className="font-bold text-[var(--accent)] hover:underline">Contact</Link>
              <span className="opacity-60">•</span>
              <Link to="/about" className="font-bold text-[var(--accent)] hover:underline">About</Link>
            </div>

            <div className="flex items-center gap-2">
              <a
                className="h-9 w-9 rounded-full border border-white/10 bg-black/10 hover:bg-white/5 grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,.22)]"
                href="#"
                aria-label="Facebook"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M14 9h3V6h-3c-2.76 0-5 2.24-5 5v3H6v3h3v7h3v-7h3l1-3h-4v-3c0-.55.45-1 1-1z"/>
                </svg>
              </a>

              <a
                className="h-9 w-9 rounded-full border border-white/10 bg-black/10 hover:bg-white/5 grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,.22)]"
                href="#"
                aria-label="Instagram"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"/>
                </svg>
              </a>

              <a
                className="h-9 w-9 rounded-full border border-white/10 bg-black/10 hover:bg-white/5 grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,.22)]"
                href="#"
                aria-label="X"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-7.1L4.6 22H2l7.3-8.4L1 2h7.1l4.9 6.5L18.9 2zm-1.2 18h1.9L7.2 4H5.2l12.5 16z"/>
                </svg>
              </a>

              <a
                className="h-9 w-9 rounded-full border border-white/10 bg-black/10 hover:bg-white/5 grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,.22)]"
                href="#"
                aria-label="TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
                  <path d="M16.5 2c.3 2.6 1.8 4.4 4.5 4.7V10c-1.9 0-3.4-.6-4.5-1.5V16c0 3.9-3.2 7-7.1 7-3.9 0-7.1-3.1-7.1-7s3.2-7 7.1-7c.3 0 .6 0 1 .1v3.7c-.3-.1-.6-.2-1-.2-1.8 0-3.2 1.4-3.2 3.2S7.6 19 9.4 19c1.7 0 3.1-1.3 3.2-3V2h3.9z"/>
                </svg>
              </a>

              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="ml-2 h-10 w-10 rounded-full border border-[var(--accent)]/60 bg-black/10 hover:bg-white/5 grid place-items-center shadow-[0_12px_36px_rgba(0,0,0,.25)] active:scale-[.98]"
                aria-label="Back to top"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 8l6 6H6l6-6z"/>
                </svg>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}