import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import { DATA } from "../lib/data";
import { Link } from "react-router-dom";
import MapView from "../components/map/MapView";

const TYPES = ["hotels","rentals","food","sights","services","transport","trails"];

export default function Map() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy"|"ru"|"en";
  const [type, setType] = React.useState<string>("sights");

  const list = (DATA[type] || []) as any[];
  const withGeo = list.filter(x => x?.geo?.lat && x?.geo?.lng);
  const missingGeo = list.length - withGeo.length;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="text-lg font-black">{t("map")}</div>
      <div className="text-xs text-[var(--muted)] mt-1">
        Real map • Pins use geo.lat/lng
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {TYPES.map(x => (
          <Chip key={x} active={type===x} onClick={() => setType(x)}>{x}</Chip>
        ))}
      </div>

      <Card className="mt-2 p-4">
        <div className="text-sm font-extrabold">Geo status</div>
        <div className="mt-2 text-xs text-[var(--muted)]">
          Total: {list.length} • With geo: {withGeo.length} • Missing geo: {missingGeo}
        </div>
      </Card>

      {withGeo.length ? (
        <div className="mt-3">
          <MapView type={type} lang={lang} />
        </div>
      ) : (
        <Card className="mt-3 p-5">
          <div className="text-sm font-extrabold">No pins yet</div>
          <div className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
            Այս category-ում geo տվյալներ դեռ չկան։ Հաջորդ փուլում լցնում ենք իրական տվյալներ (lat/lng) ու քարտեզը ավտոմատ լցվում է pin-երով։
          </div>
        </Card>
      )}

      <div className="mt-4 grid gap-3">
        {list.slice(0, 10).map((p:any) => (
          <Card key={p.id} className="p-4">
            <div className="text-sm font-extrabold">{p.title?.[lang]}</div>
            <div className="text-xs text-[var(--muted)] mt-1 line-clamp-2">{p.desc?.[lang]}</div>
            <div className="mt-2 text-[11px] text-[var(--muted)]">
              {p.geo?.lat && p.geo?.lng ? "📍 geo ok" : "⚠️ geo missing"}
            </div>
            <Link to={`/place/${type}/${p.id}`} className="inline-block mt-2 text-xs font-bold text-[var(--accent)]">
              Open →
            </Link>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
