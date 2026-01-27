const gate = document.getElementById("installGate");
const appUI = document.getElementById("appUI");
const installBtn = document.getElementById("installBtn");
const iosHelpBtn = document.getElementById("iosHelpBtn");
const iosHelp = document.getElementById("iosHelp");

iosHelpBtn?.addEventListener("click", () => iosHelp.classList.toggle("hidden"));

function isStandalone(){
  return window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
}
function showGate(){ gate.classList.remove("hidden"); appUI.classList.add("hidden"); }
function hideGate(){ gate.classList.add("hidden"); appUI.classList.remove("hidden"); }

let deferredPrompt = null;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installBtn) installBtn.disabled = false;
});

installBtn?.addEventListener("click", async () => {
  if(!deferredPrompt){
    iosHelp.classList.remove("hidden");
    return;
  }
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
});

if (!isStandalone()) showGate(); else hideGate();

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    if (isStandalone()) hideGate();
    else showGate();
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}