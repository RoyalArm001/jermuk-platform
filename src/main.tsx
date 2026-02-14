import React from "react";
import { setupPWA } from "./lib/pwa";
import { applyTheme } from "./lib/theme";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/globals.css";
import "leaflet/dist/leaflet.css";
import "./i18n";
import App from "./app";

setupPWA();
applyTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
