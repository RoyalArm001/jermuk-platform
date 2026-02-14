import React from "react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";

export default function Contact() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-5">
        <h1 className="text-xl font-black">Contact</h1>

        <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
          For collaboration, content updates, or corrections, contact us:
        </p>

        <div className="mt-4 space-y-3">
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="text-sm font-bold">Email</div>
            <div className="text-sm text-[var(--muted)]">contact@jermuktravel.com</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/10 p-4">
            <div className="text-sm font-bold">WhatsApp</div>
            <div className="text-sm text-[var(--muted)]">+374 … … …</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}