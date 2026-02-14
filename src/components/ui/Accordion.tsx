import React from "react";

type Item = { label: string; onClick: () => void; dataKey?: string };

type Props = {
  title: string;
  /** Optional translation key marker for the title */
  titleKey?: string;
  icon: string;
  /** Optional: list-style items (used in Sidebar/Desktop menus) */
  items?: Item[];
  /** Optional: custom content (used in More/Place pages) */
  children?: React.ReactNode;
  /** Optional: initial open state */
  defaultOpen?: boolean;
};

export default function Accordion({ title, titleKey, icon, items, children, defaultOpen = false }: Props) {
  const [open, setOpen] = React.useState<boolean>(!!defaultOpen);

  const hasItems = Array.isArray(items) && items.length > 0;
  const hasChildren = !!children;

  return (
    <div className="rounded-2xl border border-white/30 bg-white/55 backdrop-blur-xl shadow-[0_10px_26px_rgba(0,0,0,.10)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-3 py-2.5"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl border border-white/40 bg-white/70 grid place-items-center shadow-[0_10px_26px_rgba(0,0,0,.10)]">
            {icon}
          </span>
          <span className="font-semibold text-sm" data-i18n={titleKey || undefined} data-tr={titleKey ? undefined : "1"}>
            {title}
          </span>
        </div>
        <span className="opacity-70">{open ? "˄" : "˅"}</span>
      </button>

      {open && (
        <div className="px-3 pb-3">
          {hasChildren ? (
            children
          ) : hasItems ? (
            items!.map((it, idx) => (
              <button
                key={idx}
                type="button"
                onClick={it.onClick}
                className="w-full text-left text-sm rounded-xl px-3 py-2 hover:bg-white/70 border border-white/20"
                data-i18n={it.dataKey || undefined}
                data-tr={it.dataKey ? undefined : "1"}
              >
                {it.label}
              </button>
            ))
          ) : null}
        </div>
      )}
    </div>
  );
}
