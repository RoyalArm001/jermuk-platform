import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  full?: boolean;
};

export default function Button({ variant="primary", full=false, className="", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 disabled:opacity-60 disabled:cursor-not-allowed";
  const v =
    variant === "primary"
      ? "bg-[var(--accent)] text-white shadow-soft"
      : "bg-transparent text-[var(--fg)] border border-[var(--border)]";
  const w = full ? "w-full" : "";
  return <button className={`${base} ${v} ${w} ${className}`} {...props} />;
}
