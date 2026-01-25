import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      devOptions: { enabled: true },
      includeAssets: ["favicon.svg", "icons/icon-192.png", "icons/icon-512.png"],
      manifest: {
        name: "Jermuk City Guide",
        short_name: "Jermuk",
        description: "Jermuk city guide: hotels, sights, food, transport and services.",
        theme_color: "#0ea5a4",
        background_color: "#070b13",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
        ]
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,svg,png,json,webmanifest}"],
        runtimeCaching: [
          {
            // Cache external images (gallery links) for offline browsing
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "jt-images",
              expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 14 }, // 14 days
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            // JSON/data requests (if any runtime fetch happens)
            urlPattern: ({ request }) => request.destination === "document" || request.destination === "script" || request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "jt-app-shell",
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ],
  server: { port: 5173, strictPort: true }
});
