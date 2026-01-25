import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";

export default function PageShell() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-md px-4 pt-4 pb-28 md:max-w-6xl md:px-6 md:pt-6 md:pb-10">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
