import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  title: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function Accordion({ title, icon, badge, defaultOpen=false, children }: Props) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-soft overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-4 flex items-center gap-3 text-left"
        aria-expanded={open}
      >
        <div className="h-10 w-10 rounded-2xl border border-[var(--border)] flex items-center justify-center bg-white/0">
          <span className="text-lg leading-none">{icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-sm font-extrabold truncate">{title}</div>
            {badge ? <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">{badge}</span> : null}
          </div>
          <div className="text-xs text-[var(--muted)] truncate">Tap to open</div>
        </div>

        <div className={`h-9 w-9 rounded-full border border-[var(--border)] flex items-center justify-center transition ${open ? "bg-white/0" : "bg-white/0"}`}>
          <span className={`text-base transition ${open ? "rotate-180" : ""}`}>⌄</span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-4 pb-4"
          >
            <div className="pt-2 border-t border-[var(--border)]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
