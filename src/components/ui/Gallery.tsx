import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
  autoMs?: number;
};

export default function Gallery({ images, alt="gallery", className="", autoMs=4500 }: Props) {
  const pics = (images || []).filter(Boolean);
  const safe = pics.length ? pics : ["/icons/icon-512.png"];
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (safe.length <= 1) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % safe.length), autoMs);
    return () => window.clearInterval(t);
  }, [safe.length, autoMs]);

  const prev = () => setI((x) => (x - 1 + safe.length) % safe.length);
  const next = () => setI((x) => (x + 1) % safe.length);

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-[var(--border)] ${className}`}>
      <div className="absolute inset-0 bg-black/5" />
      <AnimatePresence mode="wait">
        <motion.img
          key={safe[i]}
          src={safe[i]}
          alt={alt}
          className="h-48 w-full object-cover"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.995 }}
          transition={{ duration: 0.25 }}
          loading="lazy"
        />
      </AnimatePresence>

      {safe.length > 1 && (
        <>
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/35 px-3 py-2 text-white text-sm font-bold backdrop-blur"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/35 px-3 py-2 text-white text-sm font-bold backdrop-blur"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1.5">
            {safe.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                aria-label={`Go to ${idx + 1}`}
                className={`h-2 w-2 rounded-full transition ${
                  idx === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
