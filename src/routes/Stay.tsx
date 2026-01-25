import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import hotels from "../data/hotels.json";
import rentals from "../data/rentals.json";

function MiniCard({ type, p, lang }: any) {
  return (
    <Card className="p-4">
      <div className="flex gap-3">
        <img src={p.gallery?.[0] || "/icons/icon-192.png"} className="h-16 w-16 rounded-2xl object-cover" alt="" />
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
      <div className="mt-3">
        <Link to={`/place/${type}/${p.id}`}>
          <Button full>Open</Button>
        </Link>
      </div>
    </Card>
  );
}

export default function Stay() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";

  const topHotels = (hotels as any[]).slice(0, 6);
  const topRentals = (rentals as any[]).slice(0, 6);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-black">{t("stay")}</div>
          <div className="text-xs text-[var(--muted)]">{t("stay_sub")}</div>
        </div>
        <Link className="text-xs font-bold text-[var(--accent)]" to="/home">{t("home")}</Link>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-sm font-extrabold">{t("hotels")}</div>
          <div className="text-xs text-[var(--muted)]">{t("hotels_sub")}</div>
        </div>
        <Link to="/list/hotels" className="text-xs font-bold text-[var(--accent)]">{t("view_all")}</Link>
      </div>
      <div className="mt-3 grid gap-3">
        {topHotels.map((p) => <MiniCard key={p.id} type="hotels" p={p} lang={lang} />)}
      </div>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <div className="text-sm font-extrabold">{t("rentals")}</div>
          <div className="text-xs text-[var(--muted)]">{t("rentals_sub")}</div>
        </div>
        <Link to="/list/rentals" className="text-xs font-bold text-[var(--accent)]">{t("view_all")}</Link>
      </div>
      <div className="mt-3 grid gap-3">
        {topRentals.map((p) => <MiniCard key={p.id} type="rentals" p={p} lang={lang} />)}
      </div>
    </motion.div>
  );
}
