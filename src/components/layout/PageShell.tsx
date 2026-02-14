import React from "react";
import { Outlet } from "react-router-dom";
import DesktopTopBar from "./DesktopTopBar";
import DesktopMenuDrawer from "./DesktopMenuDrawer";
import BottomNav from "./BottomNav";

export default function PageShell() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen">
      {/*
        Desktop uses its own sticky top bar.
      */}
      <div className="mx-auto w-full max-w-[1220px] px-4 pt-6 pb-28 md:px-6 md:pt-[clamp(14px,2vw,30px)] md:pb-10">
        {/* Desktop: top bar is independent; menu opens as a drawer (like your old reference). */}
        <div className="sticky top-3 md:top-[clamp(14px,2vw,30px)] z-30 safe-top">
          <DesktopTopBar onOpenMenu={() => setMenuOpen(true)} />
        </div>
        {/* Drawer menu (mobile + desktop) */}
        <DesktopMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

        {/* Desktop content */}
        <div className="hidden md:block pt-4">
          <Outlet />
        </div>
        
        {/* Mobile layout */}
        <div className="md:hidden pt-4">
          <Outlet />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
