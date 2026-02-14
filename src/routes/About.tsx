import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import { DATA } from "../lib/data";
import { getFavs } from "../lib/favorites";
import { getRemoteCounter } from "../lib/realViewsRemote";

function localTotalViews(): number {
  try {
    const raw = localStorage.getItem("jt_views_v1");
    if (!raw) return 0;
    const map = JSON.parse(raw);
    if (!map || typeof map !== "object") return 0;
    return Object.values(map).reduce((sum: number, v: any) => sum + (typeof v === "number" ? v : 0), 0);
  } catch {
    return 0;
  }
}

export default function About() {
  const [totalViews, setTotalViews] = React.useState<number>(localTotalViews());
  const [favCount, setFavCount] = React.useState<number>(0);

  const pagesCount = React.useMemo(() => {
    try {
      return Object.values(DATA).reduce((sum: number, arr: any) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
    } catch {
      return 0;
    }
  }, []);

  React.useEffect(() => {
    setFavCount(getFavs().length);

    let alive = true;
    (async () => {
      const remote = await getRemoteCounter("PostID_WebsiteStats");
      if (alive && typeof remote === "number") setTotalViews(remote);
    })();

    const onStorage = () => setFavCount(getFavs().length);
    window.addEventListener("storage", onStorage);
    return () => {
      alive = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-5">
        <h1 className="text-xl font-black" data-i18n="about.title">Մասին</h1>

        <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed" data-i18n="about.desc1">
          «Jermuk Guide / Jermuk Travel»-ը մոբայլ-կենտրոն ուղեցույց է՝ հյուրանոցների, սննդի, տեսարժան վայրերի,
          տուրերի, ծառայությունների ու տրանսպորտի համար։ Նպատակը՝ արագ, պարզ և PWA-ready փորձ՝ նույնիսկ թույլ ինտերնետի դեպքում։
        </p>

        <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed" data-i18n="about.desc2">
          Նախագիծը կառուցվում է փուլերով՝ սկզբում կայուն UI/Router, հետո JSON տվյալներ և վերջում՝ մանրամասների էջեր ու SEO։
        </p>
      </Card>

      <div className="mt-4 grid gap-3">
        <Card className="p-4">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--muted)]">
            <span className="text-base">👁</span>
            <span data-i18n="about.stat.totalViewsLabel">Այցելություններ</span>
          </div>
          <div className="mt-2 text-center text-4xl font-black tracking-tight">{totalViews}</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--muted)]">
            <span className="text-base">🧩</span>
            <span data-i18n="about.stat.pagesLabel">Էջեր</span>
          </div>
          <div className="mt-2 text-center text-4xl font-black tracking-tight">{pagesCount}</div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-[var(--muted)]">
            <span className="text-base">⭐</span>
            <span data-i18n="about.stat.favsLabel">Սիրվածներ</span>
          </div>
          <div className="mt-2 text-center text-4xl font-black tracking-tight">{favCount}</div>
        </Card>
      </div>
    </motion.div>
  );
}
