import { registerSW } from "virtual:pwa-register";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferredPrompt: InstallPromptEvent | null = null;
let updateSWFn: ((reloadPage?: boolean) => Promise<void>) | null = null;

export function isStandalone(): boolean {
  // iOS uses navigator.standalone
  // Chrome/Android uses display-mode
  return (
    window.matchMedia?.("(display-mode: standalone)")?.matches === true ||
    (navigator as any).standalone === true
  );
}

export function isMobile(): boolean {
  const ua = navigator.userAgent || "";
  return /Android|iPhone|iPad|iPod/i.test(ua);
}

export function canPromptInstall(): boolean {
  return !!deferredPrompt;
}

export async function promptInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!deferredPrompt) return "unavailable";
  await deferredPrompt.prompt();
  const res = await deferredPrompt.userChoice;
  deferredPrompt = null;
  return res.outcome;
}

export function setupPWA() {
  // Capture install prompt (Android/Chrome)
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e as InstallPromptEvent;
    window.dispatchEvent(new CustomEvent("pwa:installAvailable"));
  });

  // Mark installed when app is launched standalone
  const markInstalled = () => {
    if (isStandalone()) {
      localStorage.setItem("pwa_installed", "1");
    }
  };
  markInstalled();
  window.addEventListener("appinstalled", () => {
    localStorage.setItem("pwa_installed", "1");
    window.dispatchEvent(new CustomEvent("pwa:installed"));
  });

  // Service worker update flow
  updateSWFn = registerSW({
    immediate: true,
    onRegisteredSW(_swUrl, reg) {
      // Force-check for updates more often (helps users get the “update available” prompt faster)
      if (!reg) return;
      // Check when tab becomes visible
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) reg.update();
      });
      // Periodic checks (every 60s)
      setInterval(() => reg.update(), 60_000);
    },
    onNeedRefresh() {
      window.dispatchEvent(new CustomEvent("pwa:needRefresh"));
    },
    onOfflineReady() {
      window.dispatchEvent(new CustomEvent("pwa:offlineReady"));
    }
  });

  // When we regain control after update, ensure installed flag
  navigator.serviceWorker?.addEventListener("controllerchange", () => {
    markInstalled();
  });
}

export async function applyUpdate() {
  if (!updateSWFn) return;
  // Hard refresh: remove old CacheStorage entries before activating the new service worker.
  // This makes the "Update" button deterministic for installed PWAs.
  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    }
  } catch {
    // ignore
  }
  await updateSWFn(true);
}

export function isInstallRequired(): boolean {
  if (!isMobile()) return false;
  if (isStandalone()) return false;
  if (localStorage.getItem("pwa_installed") === "1") return false;
  return true;
}
