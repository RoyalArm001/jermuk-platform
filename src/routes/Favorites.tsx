import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { getFavs, toggleFav } from "../lib/favorites";
import { findPlaceById } from "../lib/data";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";

  const [ids, setIds] = React.useState<string[]>(getFavs());
  const refresh = () => setIds(getFavs());

  const items = ids
    .map((id) => {
      const found = findPlaceById(id);
      if (!found) return null;
      return { id, type: found.type, place: found.place as any };
    })
    .filter(Boolean) as any[];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-lg font-black">{t("favorites")}</div>
          <div className="text-xs text-[var(--muted)]">{items.length ? `${items.length} saved` : ""}</div>
        </div>
        <Link to="/search" className="text-xs font-bold text-[var(--accent)]">{t("search")}</Link>
      </div>

      {items.length === 0 ? (
        <Card className="mt-3 p-5 text-sm text-[var(--muted)]">{t("empty")}</Card>
      ) : (
        <div className="mt-3 grid gap-3">
          {items.map((x) => (
            <Card key={x.id} className="p-4">
              <div className="flex gap-3">
                <img
                  src={x.place.gallery?.[0] || "/icons/icon-192.png"}
                  className="h-14 w-14 rounded-2xl object-cover border border-[var(--border)]"
                  alt=""
                />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[var(--muted)]">{x.type}</div>
                  <div className="text-sm font-extrabold truncate">{x.place.title?.[lang]}</div>
                  <div className="text-xs text-[var(--muted)] line-clamp-2 mt-1">{x.place.desc?.[lang]}</div>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Link to={`/place/${x.type}/${x.id}`} className="flex-1">
                  <Button full>{t("open")}</Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => { toggleFav(x.id); refresh(); }}
                  aria-label="Remove"
                >
                  🗑️
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
