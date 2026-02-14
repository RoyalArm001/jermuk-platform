import React from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Chip from "../components/ui/Chip";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { toggleFav, isFav } from "../lib/favorites";
import { DATA, Place } from "../lib/data";
import { getViews, formatViews } from "../lib/views";

const FILTERS = ["wifi", "pool", "spa", "breakfast", "parking"];

export default function List() {
  const { type = "hotels" } = useParams();
  const [searchParams] = useSearchParams();
  const tag = searchParams.get("tag") || "";
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";

  const [active, setActive] = React.useState<string>("");

  const items: Place[] = (DATA[type] || []).filter((x: any) => {
    if (tag && !(x.tags || []).includes(tag)) return false;
    if (!active) return true;
    return (x.amenities || []).includes(active);
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-black capitalize">{type}{tag ? ` • ${tag}` : ""}</div>
          <div className="text-xs text-[var(--muted)]">Filters & cards</div>
        </div>
        <Link className="text-xs font-bold text-[var(--accent)]" to="/home">{t("home")}</Link>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        <Chip active={!active} onClick={() => setActive("")}>{t("all")}</Chip>
        {FILTERS.map((f) => (
          <Chip key={f} active={active === f} onClick={() => setActive(f)}>{f}</Chip>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {items.length === 0 && (
          <Card className="p-5 text-sm text-[var(--muted)]">{t("empty")}</Card>
        )}
        {items.map((p: any) => (
          <Card key={p.id} className="p-4">
            <div className="flex gap-3 md:flex-col">
              <div className="relative md:w-full">
                <img src={p.gallery?.[0] || "/icons/icon-192.png"} className="h-16 w-16 rounded-2xl object-cover md:h-40 md:w-full" alt="" />
                <div className="hidden md:flex absolute top-2 right-2 items-center gap-1 text-[11px] font-extrabold px-2.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur">
                  👁 {formatViews(getViews(`${type}:${p.id}`))}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold truncate">{p.title?.[lang]}</div>
                <div className="mt-1 text-xs text-[var(--muted)] line-clamp-2">{p.desc?.[lang]}</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(p.amenities || []).slice(0, 4).map((a: string) => (
                    <span key={a} className="text-[10px] font-bold px-2 py-1 rounded-full border border-[var(--border)] text-[var(--muted)]">{a}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Link to={`/place/${type}/${p.id}`} className="flex-1">
                <Button full>{t("open")}</Button>
              </Link>
              <Button variant="ghost" onClick={() => toggleFav(p.id)}>
                {isFav(p.id) ? "❤️" : "🤍"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
