import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { applyUpdate } from "./lib/pwa";
import Install from "./routes/Install";
import Home from "./routes/Home";
import List from "./routes/List";
import Place from "./routes/Place";
import Map from "./routes/Map";
import Favorites from "./routes/Favorites";
import More from "./routes/More";
import Stay from "./routes/Stay";
import TransportMenu from "./routes/TransportMenu";
import Sitemap from "./routes/Sitemap";
import Disclaimer from "./routes/Disclaimer";
import Privacy from "./routes/Privacy";
import Terms from "./routes/Terms";
import Contact from "./routes/Contact";
import About from "./routes/About";
import NotFound from "./routes/NotFound";
import Search from "./routes/Search";
import Order from "./routes/Order";
import PageShell from "./components/layout/PageShell";
import IntroVideo from "./routes/IntroVideo";
import IntroFlow from "./routes/IntroFlow";
import { getBool } from "./lib/storage";

// Intro sequence: Video → Story → Flags → App.

function BootRedirect() {
  return <Navigate to="/home" replace />;
}

export default function App() {
  const [needRefresh, setNeedRefresh] = React.useState(false);

  // Phase machine avoids blank screens after language selection.
  // If intro was already completed once, skip directly to app.
  const [phase, setPhase] = React.useState<"video" | "flow" | "app">(
    getBool("intro_seen", false) ? "app" : "video"
  );

  React.useEffect(() => {
    const onNeed = () => setNeedRefresh(true);
    window.addEventListener("pwa:needRefresh", onNeed);
    return () => window.removeEventListener("pwa:needRefresh", onNeed);
  }, []);

  const location = useLocation();

  return (
    <>
      <div className="grain" />

      {phase === "video" && <IntroVideo onDone={() => setPhase("flow")} />}
      {phase === "flow" && <IntroFlow onDone={() => setPhase("app")} />}

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

      {phase === "app" && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<BootRedirect />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route element={<PageShell />}>
              {/* Keep Install route for manual use, but no redirect / prompting */}
              <Route path="/install" element={<Install />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/list/:type" element={<List />} />
              <Route path="/place/:type/:id" element={<Place />} />
              <Route path="/order/:type/:id" element={<Order />} />
              <Route path="/map" element={<Map />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/more" element={<More />} />
              <Route path="/stay" element={<Stay />} />
              <Route path="/transport" element={<TransportMenu />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      )}
    </>
  );
}
