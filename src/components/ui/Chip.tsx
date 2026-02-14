import React from "react";
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean };
export default function Chip({ active=false, className="", ...props }: Props) {
  return (
    <button
      className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-semibold border transition
      ${active ? "bg-[var(--accent)] text-white border-transparent" : "bg-transparent text-[var(--fg)] border-[var(--border)]"}
      ${className}`}
      {...props}
    />
  );
}
