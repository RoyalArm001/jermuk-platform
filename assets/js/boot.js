const SPLASH_MIN_MS = 5200;
const SPLASH_MAX_WAIT_MS = 6500;

function sleep(ms){ return new Promise(r=>setTimeout(r, ms)); }

function detectLang(){
  const saved = localStorage.getItem('jtp_lang');
  if(saved) return saved;
  const l = (navigator.language || 'hy').toLowerCase();
  if(l.startsWith('ru')) return 'ru';
  if(l.startsWith('en')) return 'en';
  return 'hy';
}

const STORY = {
  hy: [
    { t: "Բարի գալուստ Ջերմուկ", s: "Քաղաք, որտեղ ջուրը բուժում է, իսկ բնությունը՝ հանգստացնում։" },
    { t: "Հանքային ջրեր & SPA", s: "Ջերմուկը հայտնի է իր հանքային ջրերով և առողջարաններով։" },
    { t: "Բնություն", s: "Ջրվեժներ, անտառներ, լեռներ և մաքուր օդ։" },
    { t: "Հյուրընկալություն", s: "Հյուրանոցներ, վարձու տներ և ջերմ սպասարկում։" },
    { t: "Սնունդ", s: "Ռեստորաններ, սրճարաններ, համեղ ու տաք միջավայր։" },
    { t: "Պատրաստ է", s: "Տեսիր • Ընտրիր • Կապ հաստատիր • Գնա քարտեզով" }
  ],
  en: [
    { t: "Welcome to Jermuk", s: "A town where water heals and nature calms." },
    { t: "Mineral Springs & SPA", s: "Jermuk is known for mineral water and wellness." },
    { t: "Nature", s: "Waterfalls, forests, mountains and clean air." },
    { t: "Hospitality", s: "Hotels, rentals, and warm service." },
    { t: "Food", s: "Restaurants and cafés with a cozy atmosphere." },
    { t: "Ready", s: "See • Choose • Contact • Navigate by map" }
  ],
  ru: [
    { t: "Добро пожаловать в Джермук", s: "Город, где вода лечит, а природа успокаивает." },
    { t: "Минеральные воды и SPA", s: "Джермук известен минеральной водой и здравницами." },
    { t: "Природа", s: "Водопады, леса, горы и чистый воздух." },
    { t: "Гостеприимство", s: "Отели, аренда жилья и теплый сервис." },
    { t: "Еда", s: "Рестораны и кафе с уютной атмосферой." },
    { t: "Готово", s: "Смотри • Выбирай • Свяжись • Иди по карте" }
  ]
};


function mountLangSwitcher(){
  const host = document.querySelector('.topbar') || document.body;
  if(document.getElementById('langSwitch')) return;

  const wrap = document.createElement('div');
  wrap.id = 'langSwitch';
  wrap.className = 'lang-switch';
  wrap.innerHTML = `
    <button type="button" data-lang="hy" aria-label="Հայերեն">HY</button>
    <button type="button" data-lang="en" aria-label="English">EN</button>
    <button type="button" data-lang="ru" aria-label="Русский">RU</button>
  `;
  host.prepend(wrap);

  const setActive = (lang)=>{
    wrap.querySelectorAll('button').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
  };

  const current = localStorage.getItem('jtp_lang') || detectLang();
  setActive(current);

  wrap.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-lang]');
    if(!btn) return;
    const lang = btn.dataset.lang;
    localStorage.setItem('jtp_lang', lang);
    if(window.JTP && window.JTP.setLang) window.JTP.setLang(lang);
    setActive(lang);
    // Update splash story immediately
    startStory(lang);
  });
}

async function maybeTranslateWithAPI(lang, frames){
  // Optional: if you deploy /api/translate (Cloudflare Worker), we can translate from HY automatically.
  if(lang === 'hy') return frames;
  try{
    const res = await fetch('/api/translate', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ texts: frames.map(f => `${f.t}\n${f.s}`), target: lang })
    });
    if(!res.ok) return frames;
    const arr = await res.json();
    if(!Array.isArray(arr) || !arr.length) return frames;
    return arr.map((x,i)=>{
      const parts = String(x).split('\n');
      return { t: parts[0] || frames[i].t, s: parts.slice(1).join('\n') || frames[i].s };
    });
  }catch{
    return frames;
  }
}


async function typeText(el, text, speed=22){
  el.textContent = '';
  for(let k=0;k<text.length;k++){
    el.textContent += text[k];
    await sleep(speed);
  }
}

async function playStory(minMs){
  const titleEl = document.getElementById('splashTitle');
  const subEl = document.getElementById('splashSub');
  const skipBtn = document.getElementById('splashSkip');

  let done = false;
  skipBtn?.addEventListener('click', ()=>{ done = true; });

  const lang = detectLang();
  document.documentElement.setAttribute("lang", lang);
  let frames = STORY[lang] || STORY.hy;

  // Optional API translation (if you deploy /api/translate)
  // frames = await maybeTranslateWithAPI(lang, STORY.hy);

  const start = Date.now();

  for(let i=0;i<frames.length;i++){
    if(done) break;

    // soft fade-out
    titleEl.classList.add('fadeout'); subEl.classList.add('fadeout');
    await sleep(180);
    titleEl.classList.remove('fadeout'); subEl.classList.remove('fadeout');

    // typing title then subtitle
    await typeText(titleEl, frames[i].t, 20);
    await sleep(120);
    if(done) break;
    await typeText(subEl, frames[i].s, 14);

    // hold a bit before next
    const hold = (i === frames.length-1) ? 650 : 900;
    const until = Date.now() + hold;
    while(Date.now() < until){
      if(done) break;
      await sleep(60);
    }

    // Ensure we don't finish too fast
    if(Date.now() - start < minMs && i === frames.length-1){
      while(Date.now() - start < minMs && !done){
        await sleep(80);
      }
    }
  }
}



async function registerAndUpdateSW(){
  if(!('serviceWorker' in navigator)) return {updated:false};

  // Prevent infinite reload loops
  const reloadedKey = 'jermuk_sw_reloaded_once';
  let updated = false;

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    updated = true;
    if(!sessionStorage.getItem(reloadedKey)){
      sessionStorage.setItem(reloadedKey, '1');
      // reload once to ensure newest cached assets are used
      location.reload();
    }
  });

  const reg = await navigator.serviceWorker.register('./sw.js');

  // Ask SW to check for updates
  try { await reg.update(); } catch {}

  // If there's a waiting SW, activate it now
  if (reg.waiting) {
    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
  }

  // If a new SW is installing, activate when ready
  if (reg.installing) {
    reg.installing.addEventListener('statechange', () => {
      if (reg.installing?.state === 'installed' && navigator.serviceWorker.controller) {
        reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }

  return { updated };
}

async function warmupData(){
  // Warm core JSON (and let SW cache it)
  const urls = ['./data/hotels.json','./data/food.json','./data/travel.json'];
  await Promise.allSettled(urls.map(u => fetch(u, { cache:'no-store' }).then(r=>r.ok?r.json():null)));
}

async function boot(){
  mountLangSwitcher();
const splash = document.getElementById('splash');
  const app = document.getElementById('app');

  // Keep app hidden until splash ends
  app.style.visibility = 'hidden';

  const start = Date.now();

  const tasks = (async () => {
    await Promise.allSettled([
      registerAndUpdateSW(),
      warmupData()
    ]);
  })();

  // Play story while background update runs
  const story = playStory(SPLASH_MIN_MS).catch(()=>{});

  // Wait at least min duration; but also don't wait forever
  const elapsed = Date.now() - start;
  const minWait = Math.max(0, SPLASH_MIN_MS - elapsed);
  await Promise.race([
    (async () => { await sleep(minWait); await Promise.allSettled([tasks, story]); })(),
    sleep(SPLASH_MAX_WAIT_MS)
  ]);

  // Fade out splash, reveal app
  splash.classList.add('splash--hide');
  await sleep(450);
  splash.remove();

  app.style.visibility = 'visible';
  window.JTP && window.JTP.init && window.JTP.init();
}

boot().catch(() => {
  // If something goes wrong, still load app
  const splash = document.getElementById('splash');
  const app = document.getElementById('app');
  if(splash) splash.remove();
  if(app) app.style.visibility = 'visible';
  window.JTP && window.JTP.init && window.JTP.init();
});
