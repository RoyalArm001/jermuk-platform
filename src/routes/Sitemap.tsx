import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

const Item = ({ to, label }: { to: string; label: string }) => (
  <Link to={to} className="block">
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 hover:bg-white/5 transition">
      <div className="text-sm font-extrabold">{label}</div>
      <div className="text-xs text-[var(--muted)]">{to}</div>
    </div>
  </Link>
);

export default function Sitemap() {
  return (
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.2}}>
      <Card className="p-5">
        <div className="text-lg font-black">Sitemap</div>
        <div className="mt-2 text-sm text-[var(--muted)]">
          Կայքի հիմնական էջերի ցուցակ։
        </div>

        <div className="mt-4 grid gap-3">
          <Item to="/home" label="Home" />
          <Item to="/search" label="Search" />
          <Item to="/map" label="Map" />
          <Item to="/favorites" label="Favorites" />
          <Item to="/more" label="More" />
          <Item to="/list/hotels" label="Hotels (demo)" />
          <Item to="/install" label="Install (PWA)" />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <Link to="/more" className="text-sm font-bold text-[var(--accent)]">Հետ → More</Link>
          <Link to="/home" className="text-sm font-bold text-[var(--accent)]">Գնալ Home</Link>
        </div>
      </Card>
    </motion.div>
  );
}
