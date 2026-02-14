import React, { useMemo } from "react";
import { motion } from "framer-motion";
import HeroCarousel from "../components/home/HeroCarousel";
import InfoGrid9 from "../components/home/InfoGrid9";
import HomeSidebar from "../components/home/HomeSidebar";
import { buildHomeFeed } from "../lib/homeFeed";

export default function Home() {
  const feed = useMemo(() => buildHomeFeed(), []);

  const heroItems = feed.slice(0, 6);
  const gridItems = feed.slice(6, 6 + 9);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22 }}
      className="grid gap-6 lg:grid-cols-[1fr_360px]"
    >
      <div className="grid gap-6">
        <HeroCarousel items={heroItems} />

        <div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm font-extrabold">Առաջարկվող</div>
              <div className="text-xs text-[var(--muted)]">3×3 (mix)</div>
            </div>
          </div>
          <div className="mt-3">
            <InfoGrid9 items={gridItems} />
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-24">
          <HomeSidebar />
        </div>
      </div>
    </motion.div>
  );
}
