import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Gallery from "../components/ui/Gallery";
import { DATA } from "../lib/data";
import { isFav, toggleFav } from "../lib/favorites";
import { incrementView, getViews, formatViews } from "../lib/views";

function dial(phone: string) {
  if (!phone) return;
  window.location.href = `tel:${phone}`;
}
function wa(phone: string) {
  if (!phone) return;
  const p = phone.replace(/\s+/g, "");
  window.open(`https://wa.me/${p}`, "_blank");
}

export default function PlacePage() {
  const { type = "hotels", id = "" } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";

  const item: any = (DATA[type] || []).find((x: any) => x.id === id);

  // local view counter (PWA-friendly, offline-safe)
  React.useEffect(() => {
    if (!item) return;
    incrementView(`${type}:${id}`);
  }, [type, id, item]);

  const views = item ? getViews(`${type}:${id}`) : 0;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="flex items-center justify-between">
        <Link to={`/list/${type}`} className="text-xs font-bold text-[var(--accent)]">← Back</Link>
        <button
          className="text-xs font-bold text-[var(--accent)]"
          onClick={() => { if (item) toggleFav(item.id); }}
        >
          {item && isFav(item.id) ? "❤️ Saved" : "🤍 Save"}
        </button>
      </div>

      {!item ? (
        <Card className="mt-3 p-5 text-sm text-[var(--muted)]">{t("empty")}</Card>
      ) : (
        <>
          <div className="mt-3">
            <Gallery images={item.gallery || []} alt={item.title?.[lang] || "place"} />
          </div>

          <Card className="mt-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-lg font-black">{item.title?.[lang]}</div>
              <div className="shrink-0 text-[11px] font-extrabold px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--muted)]">
                👁 {formatViews(views)}
              </div>
            </div>
            <div className="mt-1 text-sm text-[var(--muted)] leading-relaxed">{item.desc?.[lang]}</div>

            {item.address?.[lang] && (
              <div className="mt-3 text-xs text-[var(--muted)]">
                📍 {item.address?.[lang]}
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              {(item.amenities || []).map((a: string) => (
                <span key={a} className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-[var(--border)]">
                  {a}
                </span>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link to={`/order/${type}/${id}`} className="col-span-2">
                <Button className="w-full">{t("order")}</Button>
              </Link>
              <Button onClick={() => dial(item.phone || "")} disabled={!item.phone}>{t("call")}</Button>
              <Button onClick={() => wa(item.whatsapp || item.phone || "")} disabled={!item.whatsapp && !item.phone}>{t("whatsapp")}</Button>
              <Button
                variant="ghost"
                className="col-span-2"
                onClick={() => {
                  const url = item.booking_link || item.website;
                  if (url) window.open(url, "_blank");
                }}
                disabled={!item.booking_link && !item.website}
              >
                {t("order_booking")}
              </Button>
              <Button variant="ghost" className="col-span-2" onClick={() => {}}>{t("route")} • {t("coming_soon")}</Button>
            </div>
          </Card>

          <Card className="mt-3 p-4">
            <div className="text-sm font-extrabold">Tips</div>
            <div className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
              Phase 2-ում այս էջը կունենա քարտեզ, մոտակայքի pin-եր և route navigation։
            </div>
          </Card>
        </>
      )}
    </motion.div>
  );
}
