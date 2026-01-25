import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { DATA, Place } from "../lib/data";
import { toggleFav, isFav } from "../lib/favorites";

function normalize(s: string) {
  return (s || "").toLowerCase().trim();
}

export default function Search() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";
  const [q, setQ] = React.useState("");

  const query = normalize(q);

  const all: { type: string; item: any }[] = React.useMemo(() => {
    const out: { type: string; item: any }[] = [];
    for (const [type, list] of Object.entries(DATA)) {
      (list as any[]).forEach((item) => out.push({ type, item }));
    }
    return out;
  }, []);

  const results = React.useMemo(() => {
    if (!query) return all.slice(0, 20);
    return all
      .filter(({ item }) => {
        const title = normalize(item?.title?.[lang]);
        const desc = normalize(item?.desc?.[lang]);
        const tags = (item?.tags || []).map(normalize).join(" ");
        const amenities = (item?.amenities || []).map(normalize).join(" ");
        return (
          title.includes(query) ||
          desc.includes(query) ||
          tags.includes(query) ||
          amenities.includes(query)
        );
      })
      .slice(0, 50);
  }, [all, query, lang]);

  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.22}}>
      <div className="text-lg font-black">{t("search")}</div>

      <Card className="mt-3 p-4">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="w-full bg-transparent outline-none text-sm font-semibold placeholder:text-[var(--muted)]"
        />
        <div className="mt-2 text-xs text-[var(--muted)]">
          {query ? `${results.length} results` : "Type to search across the city guide"}
        </div>
      </Card>

      <div className="mt-3 grid gap-3">
        {results.map(({ type, item }) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center gap-3">
              <img src={item.gallery?.[0] || "/icons/icon-192.png"} className="h-12 w-12 rounded-2xl object-cover" alt="" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-[var(--muted)]">{type}</div>
                <div className="text-sm font-extrabold truncate">{item.title?.[lang]}</div>
                <div className="text-xs text-[var(--muted)] line-clamp-2 mt-1">{item.desc?.[lang]}</div>
              </div>
            </div>

            <div className="mt-3 flex gap-2">
              <Link to={`/place/${type}/${item.id}`} className="flex-1">
                <Button full>{t("open")}</Button>
              </Link>
              <Button variant="ghost" onClick={() => toggleFav(item.id)}>
                {isFav(item.id) ? "❤️" : "🤍"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
