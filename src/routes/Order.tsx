import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { DATA } from "../lib/data";

function dial(phone: string) {
  if (!phone) return;
  window.location.href = `tel:${phone}`;
}

function waOpen(phoneDigits: string, text: string) {
  if (!phoneDigits) return;
  const p = phoneDigits.replace(/\D+/g, "");
  const url = `https://wa.me/${p}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}

export default function Order() {
  const { type = "hotels", id = "" } = useParams();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "hy" | "ru" | "en";

  const item: any = (DATA[type] || []).find((x: any) => x.id === id);

  const [name, setName] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [people, setPeople] = React.useState("2");
  const [note, setNote] = React.useState("");

  if (!item) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
        <Card className="p-5 text-sm text-[var(--muted)]">{t("empty")}</Card>
        <div className="mt-3">
          <Link to={`/list/${type}`} className="text-xs font-bold text-[var(--accent)]">← Back</Link>
        </div>
      </motion.div>
    );
  }

  const title = item.title?.[lang] || item.title?.hy || item.title?.en || "Order";
  const phone = item.phone || "";
  const whatsapp = item.whatsapp || "";
  const booking = item.booking_link || item.website || "";

  const msg = [
    `Պատվերի հայտ՝ ${title}`,
    name ? `Անուն՝ ${name}` : null,
    from ? `Մուտք՝ ${from}` : null,
    to ? `Ելք՝ ${to}` : null,
    people ? `Մարդկանց քանակ՝ ${people}` : null,
    note ? `Նշում՝ ${note}` : null,
    `Աղբյուր՝ Jermuk Guide (կայքից)`
  ].filter(Boolean).join("\n");

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}>
      <div className="flex items-center justify-between">
        <Link to={`/place/${type}/${id}`} className="text-xs font-bold text-[var(--accent)]">← Back</Link>
        <span className="text-[11px] font-black text-[var(--muted)]">ORDER</span>
      </div>

      <Card className="mt-3 p-4">
        <div className="text-lg font-black">{title}</div>
        <div className="mt-1 text-sm text-[var(--muted)] leading-relaxed">{t("order_help")}</div>

        <div className="mt-4 grid grid-cols-1 gap-2">
          <input className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm" placeholder={t("order_name")} value={name} onChange={(e) => setName(e.target.value)} />
          <div className="grid grid-cols-2 gap-2">
            <input className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm" placeholder={t("order_from")} value={from} onChange={(e) => setFrom(e.target.value)} />
            <input className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm" placeholder={t("order_to")} value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <input className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm" placeholder={t("order_people")} value={people} onChange={(e) => setPeople(e.target.value)} />
          <textarea className="w-full min-h-[90px] rounded-xl border border-[var(--border)] bg-transparent px-3 py-2 text-sm" placeholder={t("order_note")} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button onClick={() => dial(phone)} disabled={!phone}>{t("call")}</Button>
          <Button onClick={() => waOpen(whatsapp || phone, msg)} disabled={!(whatsapp || phone)}>{t("whatsapp")}</Button>
          <Button
            variant="ghost"
            className="col-span-2"
            onClick={() => { if (booking) window.open(booking, "_blank"); }}
            disabled={!booking}
          >
            {t("order_booking")}
          </Button>
        </div>

        <div className="mt-3 text-[11px] text-[var(--muted)] leading-relaxed">
          * {t("order_note_backend")}
        </div>
      </Card>
    </motion.div>
  );
}
