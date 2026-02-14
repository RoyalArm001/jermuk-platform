import React from "react";
export default function Card({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-3xl border border-[var(--border)] bg-[var(--card)] backdrop-blur-xl shadow-soft ${className}`}
      {...props}
    />
  );
}
