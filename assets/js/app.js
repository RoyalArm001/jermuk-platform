import { onRouteChange, getRoute, navTo } from './router.js';
import { applyI18n, getLang, setLang, t } from './i18n.js';
import { loadJSON, formatAMD, esc } from './api.js';

const state = {
  hotels: [],
  hotelsLoaded: false,
  q: ''
};

const el = (id) => document.getElementById(id);

function openSidebar(open){
  const sidebar = el('sidebar');
  const backdrop = el('backdrop');
  if (!sidebar || !backdrop) return;
  sidebar.classList.toggle('open', open);
  backdrop.classList.toggle('open', open);
  sidebar.setAttribute('aria-hidden', String(!open));
  backdrop.setAttribute('aria-hidden', String(!open));
}

function openLangModal(open){
  const m = el('langModal');
  if (!m) return;
  m.classList.toggle('open', open);
  m.setAttribute('aria-hidden', String(!open));
}

async function ensureHotels(){
  if (state.hotelsLoaded) return;
  state.hotels = await loadJSON('data/hotels.json');
  state.hotelsLoaded = true;
}

function setActiveNav(){
  const hash = location.hash || '#/';
  document.querySelectorAll('.bnav, .sidebar-nav .nav-item').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === hash);
  });
}

function viewHome(lang){
  return `
    <section class="hero">
      <div class="hero-card">
        <div class="kicker">Jermuk • Armenia</div>
        <h1 class="h1">${esc(t('home.title', lang))}</h1>
        <p class="lead">${esc(t('home.lead', lang))}</p>
        <div class="actions">
          <button class="btn" id="goHotels">${esc(t('home.cta', lang))}</button>
          <a class="btn secondary" href="#/about">${esc(t('nav.about', lang))}</a>
        </div>
      </div>
      <div class="grid">
        <div class="card">
          <div class="card-title">🏨 ${esc(t('nav.hotels', lang))}</div>
          <div class="card-text">Filters, calls, WhatsApp links — ready.</div>
        </div>
        <div class="card">
          <div class="card-title">⛰️ ${esc(t('nav.sights', lang))}</div>
          <div class="card-text">Waterfall, Gndevank, viewpoints & routes.</div>
        </div>
        <div class="card">
          <div class="card-title">🚕 ${esc(t('nav.services', lang))}</div>
          <div class="card-text">Taxi, guides, off-road tours, rentals.</div>
        </div>
      </div>
    </section>
  `;
}

function viewHotels(lang){
  const q = state.q.trim().toLowerCase();
  const items = state.hotels
    .filter(h => !q || h.name.toLowerCase().includes(q) || (h.tags||[]).join(' ').toLowerCase().includes(q))
    .sort((a,b) => (b.rating||0) - (a.rating||0))
    .map(h => {
      const tags = (h.tags||[]).slice(0,4).map(x => `<span class="tag">${esc(x)}</span>`).join('');
      return `
        <div class="item">
          <div class="thumb">JT</div>
          <div class="grow">
            <h3 class="item-title">${esc(h.name)}</h3>
            <p class="item-meta">⭐ ${esc(h.rating ?? '')} • ${esc(h.address ?? '')}<br>
              <span class="muted">${esc(t('common.from', lang))} ${formatAMD(h.priceFrom)} ${esc(h.currency||'AMD')}</span>
            </p>
            <div class="row">${tags}</div>
            <div class="actions" style="margin-top:10px">
              <a class="btn secondary" href="#/hotels/${esc(h.id)}">${esc(t('common.details', lang))}</a>
              <a class="btn" href="tel:${esc(h.phone||'')}">${esc(t('common.call', lang))}</a>
            </div>
          </div>
        </div>
      `;
    }).join('');

  return `
    <section class="section">
      <div class="section-head">
        <h2 class="h2">${esc(t('hotels.title', lang))}</h2>
        <p class="lead">${esc(t('hotels.lead', lang))}</p>
      </div>
      <div class="toolbar">
        <input id="search" class="input" placeholder="${esc(t('common.search', lang))}" value="${esc(state.q)}" />
      </div>
      <div class="list">${items || `<div class="card"><div class="card-text">No results.</div></div>`}</div>
    </section>
  `;
}

function viewHotelDetail(lang, id){
  const h = state.hotels.find(x => x.id === id);
  if (!h) return `<section class="section"><div class="card"><div class="card-title">Not found</div></div></section>`;
  const tags = (h.tags||[]).map(x => `<span class="tag">${esc(x)}</span>`).join('');
  return `
    <section class="section">
      <div class="card">
        <div class="card-title">${esc(h.name)}</div>
        <div class="card-text">⭐ ${esc(h.rating ?? '')} • ${esc(h.address ?? '')}</div>
        <div class="row" style="margin-top:10px">${tags}</div>
        <div class="card" style="margin-top:12px;background:rgba(255,255,255,.02)">
          <div class="card-text">${esc(h.desc ?? '')}</div>
          <div class="card-text" style="margin-top:10px">
            <strong>${esc(t('common.from', lang))}:</strong> ${formatAMD(h.priceFrom)} ${esc(h.currency||'AMD')}
          </div>
        </div>
        <div class="actions" style="margin-top:14px">
          <button class="btn secondary" id="backHotels">← ${esc(t('nav.hotels', lang))}</button>
          <a class="btn" href="tel:${esc(h.phone||'')}">${esc(t('common.call', lang))}</a>
        </div>
      </div>
    </section>
  `;
}

function viewPlaceholder(lang, key, emoji){
  return `
    <section class="section">
      <div class="card">
        <div class="card-title">${emoji} ${esc(t(key, lang))}</div>
        <div class="card-text">Coming next: data-driven cards, filters, maps and contacts.</div>
      </div>
    </section>
  `;
}

function viewAbout(lang){
  return `
    <section class="section">
      <div class="card">
        <div class="card-title">${esc(t('about.title', lang))}</div>
        <div class="card-text">${esc(t('about.lead', lang))}</div>
        <div class="card-text" style="margin-top:10px">Version: Vanilla v1</div>
      </div>
    </section>
  `;
}

async function render(){
  const lang = getLang();
  applyI18n(lang);
  setActiveNav();

  const r = getRoute();
  const view = el('view');
  if (!view) return;

  try{
    if (r.path === '/hotels'){
      await ensureHotels();
      if (r.parts.length === 2){
        view.innerHTML = viewHotelDetail(lang, r.parts[1]);
      }else{
        view.innerHTML = viewHotels(lang);
      }
    }else if (r.path === '/sights'){
      view.innerHTML = viewPlaceholder(lang, 'nav.sights', '⛰️');
    }else if (r.path === '/services'){
      view.innerHTML = viewPlaceholder(lang, 'nav.services', '🚕');
    }else if (r.path === '/about'){
      view.innerHTML = viewAbout(lang);
    }else{
      view.innerHTML = viewHome(lang);
    }
  }catch(err){
    view.innerHTML = `<section class="section"><div class="card"><div class="card-title">Error</div><div class="card-text">${esc(err.message)}</div></div></section>`;
  }

  // bind view events
  const goHotels = el('goHotels');
  if (goHotels) goHotels.onclick = () => navTo('/hotels');

  const search = el('search');
  if (search){
    search.oninput = (e) => { state.q = e.target.value; render(); };
    search.focus();
  }

  const backHotels = el('backHotels');
  if (backHotels) backHotels.onclick = () => navTo('/hotels');
}

function bindShell(){
  // sidebar
  el('btnMenu')?.addEventListener('click', () => openSidebar(true));
  el('btnCloseSidebar')?.addEventListener('click', () => openSidebar(false));
  el('backdrop')?.addEventListener('click', () => openSidebar(false));

  // language
  el('btnLang')?.addEventListener('click', () => openLangModal(true));
  el('langClose')?.addEventListener('click', () => openLangModal(false));
  el('langModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'langModal') openLangModal(false);
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.addEventListener('click', () => {
      setLang(b.getAttribute('data-lang'));
      openLangModal(false);
      render();
    });
  });
}

async function init(){
  bindShell();
  applyI18n(getLang());
  onRouteChange(render);

  // register service worker (optional)
  if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

init();
