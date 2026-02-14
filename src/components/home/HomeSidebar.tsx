import React, { useMemo } from "react";
import Card from "../ui/Card";
import { buildHomeFeed, typeLabelHY } from "../../lib/homeFeed";
import { isFav } from "../../lib/favorites";
import { Link } from "react-router-dom";

export default function HomeSidebar() {
  const feed = useMemo(() => buildHomeFeed(), []);
  const saved = useMemo(() => feed.filter((x) => isFav(x.id)).slice(0, 6), [feed]);

  return (
    <div className="grid gap-3">
      <Card className="p-5">
        <div className="text-sm font-extrabold">Ջերմուկ — City Guide</div>
        <div className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
          Մի տեղում՝ հյուրանոցներ, սնունդ, տրանսպորտ, տեսարժան վայրեր, ծառայություններ։
        </div>
        <div className="mt-3 flex gap-2">
          <Link className="text-xs font-bold text-[var(--accent)]" to="/map">
            Բացել քարտեզը →
          </Link>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm font-extrabold">Պահպանված</div>
          <Link to="/saved" className="text-xs font-bold text-[var(--accent)]">
            Բոլորը →
          </Link>
        </div>

        {saved.length ? (
          <div className="mt-3 grid gap-2">
            {saved.map((x) => (
              <Link
                key={x.id}
                to={`/place/${x.id}`}
                className="rounded-xl border border-white/30 bg-white/40 hover:bg-white/55 transition p-3"
              >
                <div className="text-xs text-[var(--muted)]">{typeLabelHY(x.type)}</div>
                <div className="text-sm font-extrabold truncate">{x.title}</div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-3 text-sm text-[var(--muted)]">Դեռ ոչինչ չես պահպանել։ ⭐</div>
        )}
      </Card>

      <Card className="p-5">
        <div className="text-sm font-extrabold">Quick</div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link to="/hotels" className="rounded-xl bg-white/40 border border-white/30 p-3 text-xs font-bold hover:bg-white/55 transition">
            Հյուրանոցներ
          </Link>
          <Link to="/food" className="rounded-xl bg-white/40 border border-white/30 p-3 text-xs font-bold hover:bg-white/55 transition">
            Սնունդ
          </Link>
          <Link to="/sights" className="rounded-xl bg-white/40 border border-white/30 p-3 text-xs font-bold hover:bg-white/55 transition">
            Տեսարժան
          </Link>
          <Link to="/services" className="rounded-xl bg-white/40 border border-white/30 p-3 text-xs font-bold hover:bg-white/55 transition">
            Ծառայություն
          </Link>
        </div>
      </Card>
    </div>
  );
}
