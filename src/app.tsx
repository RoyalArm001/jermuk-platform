import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { isInstallRequired, applyUpdate } from "./lib/pwa";
import Intro from "./routes/Intro";
import Install from "./routes/Install";
import Home from "./routes/Home";
import List from "./routes/List";
import Place from "./routes/Place";
import Map from "./routes/Map";
import Favorites from "./routes/Favorites";
import More from "./routes/More";
import Sitemap from "./routes/Sitemap";
import Disclaimer from "./routes/Disclaimer";
import Privacy from "./routes/Privacy";
import NotFound from "./routes/NotFound";
import Search from "./routes/Search";
import Order from "./routes/Order";
import PageShell from "./components/layout/PageShell";

function BootRedirect() {
  return <Navigate to="/home" replace />;
}

function RequireInstall({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (isInstallRequired() && location.pathname !== "/install") {
    return <Navigate to="/install" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  const [needRefresh, setNeedRefresh] = React.useState(false);
  const [showIntro, setShowIntro] = React.useState(true); // always on every app launch

  React.useEffect(() => {
    const onNeed = () => setNeedRefresh(true);
    window.addEventListener("pwa:needRefresh", onNeed);
    return () => window.removeEventListener("pwa:needRefresh", onNeed);
  }, []);

  const location = useLocation();

  return (
    <>
      <div className="grain" />

      {/* Always-play intro animation. Language is remembered, intro is not. */}
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}

      {needRefresh && (
        <div className="fixed left-3 right-3 bottom-16 z-[9999] rounded-2xl bg-black/80 text-white p-3 flex items-center justify-between backdrop-blur">
          <div className="text-sm font-bold">Թարմացում կա</div>
          <button
            className="px-3 py-2 rounded-xl bg-white text-black text-sm font-black"
            onClick={() => applyUpdate()}
          >
            Թարմացնել
          </button>
        </div>
      )}

      <RequireInstall>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<BootRedirect />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route element={<PageShell />}>
              <Route path="/install" element={<Install />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/list/:type" element={<List />} />
              <Route path="/place/:type/:id" element={<Place />} />
              <Route path="/order/:type/:id" element={<Order />} />
              <Route path="/map" element={<Map />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/more" element={<More />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </RequireInstall>
    </>
  );
}
