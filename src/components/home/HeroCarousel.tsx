import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { HomeItem, typeLabelHY } from "../../lib/homeFeed";
import { isFav, toggleFav } from "../../lib/favorites";
import { getViews, formatViews } from "../../lib/views";

type Props = { items: HomeItem[] };

export default function HeroCarousel({ items }: Props) {
  const list = useMemo(() => items.filter(Boolean).slice(0, 6), [items]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || list.length <= 1) return;
    const t = window.setInterval(() => {
      setActive((p) => (p + 1) % list.length);
    }, 6500);
    return () => window.clearInterval(t);
  }, [paused, list.length]);

  const current = list[active];

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/30 shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {current?.cover ? (
          <>
            <img
              src={current.cover}
              alt="bg"
              className="h-full w-full object-cover scale-[1.06] blur-[2px] opacity-40"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-black/15" />
          </>
        ) : (
          <div className="h-full w-full bg-[var(--card)]" />
        )}
      </div>

      <div className="relative grid gap-4 p-4 md:p-6 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={current?.id || "x"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Card className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="inline-flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/15">
                        {typeLabelHY(current?.type || "sights")}
                      </span>
                      <span className="text-xs text-white/70">
                        {formatViews(getViews(current?.id || ""))}
                      </span>
                    </div>

                    <div className="mt-3 text-xl md:text-2xl font-extrabold text-white truncate">
                      {current?.title || "—"}
                    </div>
                    <div className="mt-2 text-sm text-white/75 line-clamp-2">
                      {current?.desc || current?.address || "Ջերմուկի լավագույն ընտրանին՝ մեկ տեղում։"}
                    </div>

                    {current?.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {current.tags.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/90 border border-white/15"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    aria-label="Save"
                    onClick={() => current?.id && toggleFav(current.id)}
                    className="w-11 h-11 rounded-full grid place-items-center bg-white/10 hover:bg-white/15 transition border border-white/15 text-white shrink-0"
                    title="Պահպանել"
                  >
                    {current?.id && isFav(current.id) ? "★" : "☆"}
                  </button>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <Link to={current?.id ? `/place/${current.id}` : "#"}>
                    <Button>Դիտել</Button>
                  </Link>
                  <Link to={`/${current?.type || "sights"}`}>
                    <Button variant="ghost">Բոլորը</Button>
                  </Link>

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      className="w-10 h-10 rounded-full grid place-items-center bg-white/10 hover:bg-white/15 transition border border-white/15 text-white"
                      onClick={() => setActive((p) => (p - 1 + list.length) % list.length)}
                      aria-label="Prev"
                    >
                      {"<"}
                    </button>
                    <button
                      className="w-10 h-10 rounded-full grid place-items-center bg-white/10 hover:bg-white/15 transition border border-white/15 text-white"
                      onClick={() => setActive((p) => (p + 1) % list.length)}
                      aria-label="Next"
                    >
                      {">"}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {list.map((it, idx) => (
                    <button
                      key={it.id}
                      onClick={() => setActive(idx)}
                      className={`h-2 rounded-full transition ${
                        idx === active ? "w-8 bg-white/80" : "w-2 bg-white/30 hover:bg-white/45"
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden lg:block">
          <div className="grid gap-3">
            {list.map((it, idx) => (
              <button
                key={it.id}
                onClick={() => setActive(idx)}
                className={`text-left rounded-2xl overflow-hidden border transition ${
                  idx === active ? "border-white/40 bg-white/10" : "border-white/15 bg-white/5 hover:bg-white/10"
                }`}
              >
                <div className="flex gap-3 p-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 shrink-0">
                    {it.cover ? (
                      <img src={it.cover} alt="" className="w-full h-full object-cover" draggable={false} />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-white/65">{typeLabelHY(it.type)}</div>
                    <div className="text-sm font-extrabold text-white truncate">{it.title}</div>
                    <div className="text-xs text-white/65 truncate">{it.address || ""}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
