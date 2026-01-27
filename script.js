/**
 * GLOBAL SAME TIME FOR EVERYONE (120 hours)
 * - Uses fixed START_AT_UTC
 * - Uses server time from /api/time (Cloudflare Pages Function)
 */
const START_AT_UTC = "2026-01-27T00:00:00Z";
const HOURS = 120;
const TIME_ENDPOINT = "/api/time";

const texts = [
  { lang: "HY", text: "Jermuk Travel — Ջերմուկ քաղաքի ամբողջական ուղեցույցը՝ հյուրանոցներ, սնունդ, տեսարժան վայրեր, տրանսպորտ և սարերի օֆֆռոդ ուղևորություններ մեկ հավելվածում։" },
  { lang: "RU", text: "Jermuk Travel — единый гид по городу Джермук: отели, еда, достопримечательности, транспорт и горные off-road поездки." },
  { lang: "EN", text: "Jermuk Travel is a complete city guide with stays, food, sights, transport, and mountain off-road trips in one app." }
];

const footerLines = [
  "HY: Կայքը ներկայում թարմացվում է — պատրաստ կլինի 120 ժամից։",
  "RU: Сайт обновляется — будет готов через 120 часов.",
  "EN: The platform is being updated — ready in 120 hours."
];

const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");
const langBox = document.getElementById("lang-text");
const footerBox = document.getElementById("footerText");
const tagline = document.getElementById("tagline");

langBox.innerText = texts[0].text;
footerBox.innerText = footerLines.join("\\n");

let i = 0;
setInterval(() => {
  i = (i + 1) % texts.length;
  langBox.innerText = texts[i].text;
}, 6000);

const startTs = Date.parse(START_AT_UTC);
const endTs = startTs + HOURS * 3600 * 1000;

let serverOffsetMs = 0;

async function syncServerTime(){
  const r = await fetch(TIME_ENDPOINT, { cache: "no-store" });
  const j = await r.json();
  if (typeof j.now === "number") serverOffsetMs = j.now - Date.now();
}

async function loop(){
  try{
    if (Number.isNaN(startTs)) { tagline.textContent = "START_AT_UTC invalid"; return; }
    await syncServerTime();

    const now = Date.now() + serverOffsetMs;
    const diff = endTs - now;

    if (diff <= 0) {
      hEl.textContent = "00"; mEl.textContent = "00"; sEl.textContent = "00";
      tagline.textContent = "Ready / Live";
      return;
    }

    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    hEl.textContent = String(h).padStart(2,"0");
    mEl.textContent = String(m).padStart(2,"0");
    sEl.textContent = String(s).padStart(2,"0");

    const msToNextSecond = 1000 - (now % 1000);
    setTimeout(loop, msToNextSecond + 20);
  }catch(e){
    setTimeout(loop, 800);
  }
}
loop();