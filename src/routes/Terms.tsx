import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";

export default function Terms() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-5">
        <h1 className="text-xl font-black">Terms of Use</h1>

        <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
          This guide is provided for informational purposes. We try to keep the data accurate and up to date,
          but details (prices, contacts, availability) may change. Please confirm directly with the place.
        </p>

        <h2 className="mt-5 font-bold">Responsibility</h2>
        <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
          Jermuk Travel does not provide hotel/services directly. Any booking, call or request happens between
          you and the listed provider.
        </p>

        <h2 className="mt-5 font-bold">Content</h2>
        <p className="mt-2 text-sm text-[var(--muted)] leading-relaxed">
          Photos, names and descriptions belong to their respective owners. If you want content removed or corrected,
          contact us.
        </p>
      </Card>
    </motion.div>
  );
}