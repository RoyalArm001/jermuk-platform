import React from "react";
import { Link } from "react-router-dom";
import Card from "../ui/Card";
import { HomeItem, typeLabelHY } from "../../lib/homeFeed";
import { isFav, toggleFav } from "../../lib/favorites";

type Props = { items: HomeItem[] };

export default function InfoGrid9({ items }: Props) {
  const list = items.filter(Boolean).slice(0, 9);

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {list.map((it) => (
        <Card key={it.id} className="p-0 overflow-hidden">
          <div className="relative">
            <div className="h-36 bg-white/10">
              {it.cover ? (
                <img src={it.cover} alt="" className="w-full h-full object-cover" draggable={false} />
              ) : null}
            </div>

            <button
              type="button"
              aria-label="Save"
              onClick={() => toggleFav(it.id)}
              className="absolute right-3 top-3 w-10 h-10 rounded-full grid place-items-center bg-white/70 backdrop-blur border border-white/40 shadow-sm"
              title="Պահպանել"
            >
              {isFav(it.id) ? "★" : "☆"}
            </button>

            <div className="absolute left-3 top-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black/55 text-white border border-white/15">
                {typeLabelHY(it.type)}
              </span>
            </div>
          </div>

          <div className="p-4">
            <div className="font-extrabold text-sm truncate">{it.title}</div>
            <div className="mt-1 text-xs text-[var(--muted)] truncate">
              {it.address || it.desc || "—"}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-[var(--muted)]">
                {typeof it.rating === "number" ? `⭐ ${it.rating.toFixed(1)}` : ""}
              </div>
              <Link to={`/place/${it.id}`} className="text-xs font-bold text-[var(--accent)]">
                Դիտել →
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
