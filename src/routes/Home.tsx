import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import hotels from "../data/hotels.json";
import { isFav, toggleFav } from "../lib/favorites";
import { getViews, formatViews } from "../lib/views";

export default function Home() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";

  const top = (hotels as any[]).slice(0, 3);

  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.22}}>
      <Card className="p-5">
        <div className="text-sm font-extrabold">{t("home")}</div>
        <div className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
          Home-ը հիմա վերափոխման մեջ է։ Մենյու/բաժինները տեղափոխված են <b>More</b> բաժին։
        </div>
        <div className="mt-4">
          <Link to="/more">
            <Button full>Open Menu</Button>
          </Link>
        </div>
      </Card>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-sm font-extrabold">{t("top_picks")}</div>
          <div className="text-xs text-[var(--muted)]">Demo (JSON)</div>
        </div>
        <Link to="/list/hotels" className="text-xs font-bold text-[var(--accent)]">{t("view_all")}</Link>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {top.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex items-center gap-3 md:flex-col md:items-start">
              <div className="relative md:w-full">
                <img src={p.gallery?.[0] || "/icons/icon-192.png"} className="h-12 w-12 rounded-2xl object-cover md:h-40 md:w-full" alt="demo" />
                <div className="hidden md:flex absolute top-2 right-2 items-center gap-1 text-[11px] font-extrabold px-2.5 py-1.5 rounded-full border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur">
                  👁 {formatViews(getViews(`hotels:${p.id}`))}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-extrabold truncate">{p.title?.[lang]}</div>
                <div className="text-xs text-[var(--muted)] line-clamp-2 mt-1">{p.desc?.[lang]}</div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="ghost" onClick={()=>toggleFav(p.id)}>{isFav(p.id) ? "❤️" : "🤍"}</Button>
              <Link to={`/place/hotels/${p.id}`} className="flex-1">
                <Button full>{t("open")}</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
