if(!location.hash){ location.hash = '#/home'; }
const icons = (window.JTP_ICONS || window.icons || {});
const DEFAULT_IMG = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=60";

const state = {
  route: { path: '/', params:{} },
  hotels: [],
  food: [],
  travel: {},
  heroIndex: 0,
  heroImgIndex: 0,
  timers: { hero: null, heroImg: null },
};


/* V3 i18n (HY/EN/RU) */
const I18N = {
  hy: {
    home_title: "Jermuk Travel",
    home_sub: "${t('home_sub')}",
    cta_explore: "Տեսնել ինչ կա քաղաքում",
    cta_map: "Բացել քարտեզը",
    quick: "Արագ մուտք",
    hotels: "Հյուրանոցներ",
    food: "Սնունդ",
    tourism: "Տուրիզմ",
    taxi: "Տաքսի",
    sights: "Տեսարժան վայրեր",
    hotels_desc: "${t('hotels_desc')}",
    food_desc: "${t('food_desc')}",
    tourism_desc: "${t('tourism_desc')}",
    taxi_desc: "${t('taxi_desc')}",
    explore_title: "Քաղաքում ինչ կա",
    explore_sub: "${t('explore_sub')}",
    map_title: "Քարտեզ",
    map_sub: "${t('map_sub')}",
    map_btn: "${t('map_btn')}",
    list_sub: "${t('list_sub')}",
    back: "Վերադառնալ",
    amenities: "Հարմարություններ",
    call: "Զանգել",
    open_map: "Քարտեզ",
    book: "Պատվիրել"
  },
  en: {
    home_title: "Jermuk Travel",
    home_sub: "Your local Jermuk guide — right on your phone.",
    cta_explore: "See what’s in the city",
    cta_map: "Open the map",
    quick: "Quick access",
    hotels: "Hotels",
    food: "Food",
    tourism: "Tourism",
    taxi: "Taxi",
    sights: "Sights",
    hotels_desc: "Find & contact fast",
    food_desc: "Restaurants & cafés",
    tourism_desc: "Nature & routes",
    taxi_desc: "Contact in one tap",
    explore_title: "What’s in the city",
    explore_sub: "Pick a section to view and contact instantly.",
    map_title: "Map",
    map_sub: "Open the map and go to your chosen place.",
    map_btn: "Open Jermuk in Maps",
    list_sub: "Skeleton view — content will be added in next phases.",
    back: "Back",
    amenities: "Amenities",
    call: "Call",
    open_map: "Map",
    book: "Book"
  },
  ru: {
    home_title: "Jermuk Travel",
    home_sub: "Локальный гид по Джермуку — прямо в телефоне.",
    cta_explore: "Что есть в городе",
    cta_map: "Открыть карту",
    quick: "Быстрый доступ",
    hotels: "Отели",
    food: "Еда",
    tourism: "Туризм",
    taxi: "Такси",
    sights: "Достопримечательности",
    hotels_desc: "Быстро найти и связаться",
    food_desc: "Рестораны и кафе",
    tourism_desc: "Природа и маршруты",
    taxi_desc: "Связь в один тап",
    explore_title: "Что есть в городе",
    explore_sub: "Выбери раздел, чтобы посмотреть и сразу связаться.",
    map_title: "Карта",
    map_sub: "Открой карту и иди к выбранному месту.",
    map_btn: "Открыть Джермук в картах",
    list_sub: "Скелет — данные добавим на следующих этапах.",
    back: "Назад",
    amenities: "Удобства",
    call: "Позвонить",
    open_map: "Карта",
    book: "Бронировать"
  }
};

function detectLangAuto(){
  const saved = localStorage.getItem('jt_lang');
  if(saved && I18N[saved]) return saved;
  const l = (navigator.language || 'hy').toLowerCase();
  if(l.startsWith('ru')) return 'ru';
  if(l.startsWith('en')) return 'en';
  return 'hy';
}
let LANG = detectLangAuto();
function t(key){
  return (I18N[LANG] && I18N[LANG][key]) || (I18N.hy[key] || key);
}
function setLang(next){
  if(!I18N[next]) return;
  LANG = next;
  localStorage.setItem('jt_lang', next);
  render();
}

const FLAG_SVGS = {
  hy: `<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#D90012"/><rect y="5.33" width="24" height="5.33" fill="#0033A0"/><rect y="10.66" width="24" height="5.34" fill="#F2A800"/></svg>`,
  en: `<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#012169"/><path d="M0 0l24 16M24 0L0 16" stroke="#fff" stroke-width="3.2"/><path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" stroke-width="1.6"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5.2"/><path d="M12 0v16M0 8h24" stroke="#C8102E" stroke-width="3"/></svg>`,
  ru: `<svg viewBox="0 0 24 16" aria-hidden="true"><rect width="24" height="16" fill="#fff"/><rect y="5.33" width="24" height="5.33" fill="#0039A6"/><rect y="10.66" width="24" height="5.34" fill="#D52B1E"/></svg>`
};

function renderLangPicker(){
  const label = LANG.toUpperCase();
  return `
    <div class="langFab" id="langFab">
      <button class="langBtn" id="langBtn" type="button" aria-label="Language">
        <span class="flag">${FLAG_SVGS[LANG]}</span>
        <span class="langCode">${label}</span>
      </button>
      <div class="langMenu" id="langMenu" hidden>
        ${renderLangOption('hy','Հայերեն')}
        ${renderLangOption('en','English')}
        ${renderLangOption('ru','Русский')}
      </div>
    </div>
  `;
}
function renderLangOption(code,name){
  const active = code===LANG ? 'active' : '';
  return `<button class="langItem ${active}" type="button" data-lang="${code}"><span class="flag">${FLAG_SVGS[code]}</span><span class="langName">${name}</span></button>`;
}
function wireLangPicker(){
  const btn = document.getElementById('langBtn');
  const menu = document.getElementById('langMenu');
  if(!btn || !menu) return;
  btn.onclick = () => { menu.hidden = !menu.hidden; };
  menu.querySelectorAll('[data-lang]').forEach(b=>{
    b.onclick = ()=>{ setLang(b.dataset.lang); menu.hidden = true; };
  });
  document.addEventListener('click', (e)=>{
    const fab = document.getElementById('langFab');
    if(!fab) return;
    if(!fab.contains(e.target)) menu.hidden = true;
  });
}



function loadOverride(key, kind){
  try{
    const raw = localStorage.getItem(key);
    if(!raw) return null;
    const val = JSON.parse(raw);
    if(kind==='array') return Array.isArray(val)?val:null;
    if(kind==='object') return (val && typeof val==='object' && !Array.isArray(val))?val:null;
    return val;
  }catch(e){ return null; }
}
function saveOverride(key, val){
  localStorage.setItem(key, JSON.stringify(val));
}
function cleanImages(arr){
  const ok = (u)=> typeof u==='string' && (
    u.startsWith('data:') ||
    u.startsWith('./') || u.startsWith('/') ||
    /\.(jpg|jpeg|png|webp|gif)(\?|#|$)/i.test(u) ||
    u.includes('images.unsplash.com')
  );
  return (Array.isArray(arr)?arr:[]).filter(ok);
}


function qs(sel, el=document){ return el.querySelector(sel); }
function qsa(sel, el=document){ return [...el.querySelectorAll(sel)]; }
function safe(s){ return (s??'').toString(); }

async function loadData(){
  const [hotels, food, travel] = await Promise.all([
    fetch('./data/hotels.json').then(r=>r.json()),
    fetch('./data/food.json').then(r=>r.json()),
    fetch('./data/travel.json').then(r=>r.json()),
  ]);
  const oHotels = loadOverride('jt_override_hotels','array');
  state.hotels = Array.isArray(oHotels)?oHotels:(Array.isArray(hotels)?hotels:[]);
  state.hotels.forEach(h=>{ h.images = cleanImages(h.images); });
  const oFood = loadOverride('jt_override_food','array');
  const rawFood = Array.isArray(oFood)?oFood:(Array.isArray(food)?food:[]);
  rawFood.forEach(f=>{ f.images = cleanImages(f.images); });
  const oTravel = loadOverride('jt_override_travel','object');
  state.travel = (oTravel && typeof oTravel==='object') ? oTravel : ((travel && typeof travel==='object') ? travel : {});

  // Food: keep only food-related items. Entertainment/cinema/mafia/games go to Travel.
  const moved = [];
  const kept = [];
  for(const p of rawFood){
    const t = (p.food_type || p.type || '').toString().toLowerCase();
    const kws = (p.menu_keywords || []).join(' ').toLowerCase();
    const isEntertainment = t.includes('entertainment') || kws.includes('mafia') || kws.includes('cinema') || kws.includes('game');
    if(isEntertainment) moved.push(p); else kept.push(p);
  }
  state.food = kept;

  if(moved.length){
    const arr = Array.isArray(state.travel.entertainment) ? state.travel.entertainment : [];
    // Normalize minimal fields
    const norm = moved.map(p=>({
      ...p,
      id: p.id || p.slug || ('ent_'+Math.random().toString(36).slice(2,9)),
      name: p.name || p.title || 'Ժամանց',
      address: p.address || p.location || '',
      tags: (p.tags || []).length ? p.tags : ['entertainment'],
      _meta: { ...(p._meta||{}), source:'food_moved' }
    }));
    state.travel.entertainment = [...arr, ...norm];
  }
}

function imgOf(p){
  const imgs = p?.images || [];
  return imgs[0] || p?.cover || DEFAULT_IMG;
}
function imgsOf(p){
  const imgs = p?.images || [];
  const out = imgs.filter(Boolean);
  return out.length?out:[imgOf(p)];
}

function ratingOf(p){
  const r = Number(p?.rating ?? p?._meta?.rating ?? 0);
  return isFinite(r) ? Math.max(0, Math.min(5, r)) : 0;
}

function amenitiesOf(p){
  const a = p?.amenities || p?._meta?.amenities || [];
  if (Array.isArray(a)) return a.slice(0,6);
  if (typeof a === 'string') return a.split(',').map(s=>s.trim()).filter(Boolean).slice(0,6);
  return [];
}

function nav(){
  const path = location.hash.replace('#','') || '/';
  const parts = path.split('/').filter(Boolean);
  // routes:
  // /, /list/hotels, /list/food, /list/travel, /place/hotels/<id>, /place/food/<id>, /place/travel/<cat>/<id>
  if (parts.length===0) return {path:'/'};
  if (parts[0]==='home') return {path:'/'};
  if (parts[0]==='explore') return {path:'/explore'};
  if (parts[0]==='list') return {path:'/list', params:{type:parts[1]||'hotels'}};
  if (parts[0]==='map') return {path:'/map'};
    if (parts[0]==='place'){
    return {path:'/place', params:{type:parts[1], cat:parts[2], id:parts[3]||parts[2]}};
  }
  return {path:'/'};
}

function setActiveTab(type){
  qsa('.tab').forEach(t=>{
    const k=t.getAttribute('data-tab');
    t.classList.toggle('active', k===type);
  });
}

function renderTopbar(){
  const top = document.createElement('div');
  top.className='topbar';
  top.innerHTML = `
    <div class="topbar-inner">
      <div class="brand" role="banner">
        <div class="brand-dot"></div>
        <div class="brand-text">
          <div class="brand-title">Jermuk Travel</div>
          <div class="brand-sub">Ջերմուկ — մեկ տեղում ամբողջ ինֆոն</div>
        </div>
      </div>
    </div>`;
  return top;
}

function heroCard(items, onOpen){
  const idx = Math.min(state.heroIndex, Math.max(0, items.length-1));
  const item = items[idx];
  const imgs = imgsOf(item);
  const img = imgs[state.heroImgIndex % imgs.length] || imgs[0] || DEFAULT_IMG;

  const el = document.createElement('div');
  el.className='hero';
  el.innerHTML = `
    <div class="hero-bg" style="background-image:url('${escapeHtml(img)}')"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-title">${escapeHtml(item?.name || item?.title || 'Արագ ընտրություն')}</div>
      <div class="hero-desc">${escapeHtml(item?.address || item?.short || 'Տեսնել մանրամասները, զանգել կամ գնալ քարտեզով')}</div>
      <div class="pills">
        <span class="pill active">20 վրկ / ավտո</span>
        <span class="pill">${Math.round(ratingOf(item)*10)/10} ★</span>
        <span class="pill">${imgs.length} նկար</span>
      </div>
      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
        <button class="btn primary" id="heroView">Դիտել <span class="arrow">→</span></button>
        <button class="btn btn-direction" id="heroNext">Հաջորդը <span class="arrow">→</span></button>
      </div>
    </div>
  `;
  el.querySelector('#heroView').addEventListener('click', ()=>onOpen(item));
  el.querySelector('#heroNext').addEventListener('click', ()=>{
    state.heroIndex = (state.heroIndex + 1) % Math.max(1, items.length);
    state.heroImgIndex = 0;
    render();
  });
  return el;
}

function cardPlace(p, onOpen){
  const el=document.createElement('div');
  el.className='card';
  const img = imgOf(p);
  const r = ratingOf(p);
  const am = amenitiesOf(p);
  el.innerHTML = `
    <div class="card-inner">
      <div class="thumb"><img src="${escapeHtml(img)}" alt="" loading="lazy"></div>
      <div class="meta">
        <div class="name">${escapeHtml(p.name||p.title||'')}</div>
        <div class="addr">${escapeHtml(p.address||'')}</div>
        <div class="row">
          <div class="stars">${starsHtml(r)}</div>
          <button class="btn small btn-direction" data-open>Դիտել <span class="arrow">→</span></button>
        </div>
        ${am.length ? `<div class="badges">${am.slice(0,4).map(a=>`<span class="badge">${escapeHtml(a)}</span>`).join('')}</div>`:''}
      </div>
    </div>
  `;
  const imgEl = el.querySelector('img');
  imgEl.addEventListener('error', ()=>{ imgEl.src = DEFAULT_IMG; });
  el.querySelector('[data-open]').addEventListener('click', ()=>onOpen(p));
  el.addEventListener('click', (e)=>{ if(e.target.closest('button')) return; onOpen(p); });
  return el;
}

function detailView(p, type, extra={}){
  const imgs = imgsOf(p);
  const r=ratingOf(p);
  const phone = p.phone || p?._meta?.phone || '';
  const whatsapp = (p.whatsapp || p?.social?.whatsapp || '').toString().trim();
  const map = (p.map || p?.location?.google || p?.location?.maps || '').toString().trim();
  const am = amenitiesOf(p);

  const el=document.createElement('div');
  el.className='card';
  el.innerHTML = `
    <div class="detail">
      <div class="detail-head">
        <div>
          <div class="detail-title">${escapeHtml(p.name||p.title||'')}</div>
          <div class="detail-sub">${escapeHtml(p.address||p.short||'')}</div>
        </div>
        <div class="stars">${starsHtml(r)}</div>
      </div>

      <div class="gallery">
        ${imgs.slice(0,8).map(u=>`<div class="gimg"><img src="${escapeHtml(u)}" alt="" loading="lazy"></div>`).join('')}
      </div>

      <div class="btns" style="margin-top:12px">
        ${phone? `<a class="btn primary" href="tel:${encodeURIComponent(phone)}">📞 ${t('call')}</a>`:''}
        ${whatsapp? `<a class="btn" href="${escapeHtml(whatsapp)}" target="_blank" rel="noreferrer">💬 WhatsApp</a>`:''}
        ${map? `<a class="btn btn-direction" href="${escapeHtml(map)}" target="_blank" rel="noreferrer">🗺️ Դեպի քարտեզ <span class="arrow">→</span></a>`:''}
        <a class="btn ghost" href="#/list/${escapeHtml(type)}">← Վերադառնալ</a>
      </div>

      ${am.length ? `<div class="section" style="margin-top:14px">
        <div class="section-head">
          <div class="section-title">${t('amenities')}</div>
          <div class="section-note">${am.length} հատ</div>
        </div>
        <div class="badges" style="margin-top:10px">${am.map(a=>`<span class="badge primary">${escapeHtml(a)}</span>`).join('')}</div>
      </div>`:''}

      ${extra.note ? `<div class="section">
        <div class="section-title">Նկարագրություն</div>
        <div class="detail-sub" style="margin-top:8px">${escapeHtml(extra.note)}</div>
      </div>`:''}

      <div class="kv">
        <div class="kvitem"><div class="k">Տեսակը</div><div class="v">${escapeHtml(typeLabel(type, extra))}</div></div>
        <div class="kvitem"><div class="k">Քաղաք</div><div class="v">Ջերմուկ</div></div>
      </div>
    </div>
  `;
  qsa('img', el).forEach(im=>im.addEventListener('error', ()=>{ im.src=DEFAULT_IMG; }));
  return el;
}

function typeLabel(type, extra){
  if(type==='hotels') return 'Հյուրանոց';
  if(type==='food') return 'Սնունդ';
  if(type==='travel') return extra.catLabel || 'Տուրիզմ';
  return 'Տեղ';
}

function starsHtml(r){
  const full = Math.round(r); // display as rounded
  let out='';
  for(let i=1;i<=5;i++){
    out += icons.star(i<=full);
  }
  return out;
}

function escapeHtml(s){
  return String(s??'').replace(/[&<>"']/g, m=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));
}

function foodCategories(){
  // derive categories
  const cats = new Set();
  for(const p of state.food){
    const t = (p.food_type || p.type || '').toString().toLowerCase();
    if(t.includes('cafe')) cats.add('Սրճարան');
    if(t.includes('restaurant')) cats.add('Ռեստորան');
    if(t.includes('loft')) cats.add('Լոֆթ');
    // keywords
    const kws = (p.menu_keywords || []).join(' ').toLowerCase();
  }
  // baseline
  ['Ռեստորան','Սրճարան','Լոֆթ'].forEach(c=>cats.add(c));
  return [...cats];
}

function filterFood(p, cat){
  if(!cat) return true;
  const t = (p.food_type || p.type || '').toString().toLowerCase();
  if(cat==='Ռեստորան') return t.includes('restaurant');
  if(cat==='Սրճարան') return t.includes('cafe');
  if(cat==='Լոֆթ') return t.includes('loft');
  return true;
}

function render(){
  const app = document.getElementById('app');
  let langRoot = document.getElementById('langRoot');
  if(!langRoot){
    langRoot = document.createElement('div');
    langRoot.id = 'langRoot';
    document.body.appendChild(langRoot);
  }
  langRoot.innerHTML = renderLangPicker();
  wireLangPicker();
  app.innerHTML='';
  const r = state.route;

  if(r.path==='/'){
    setActiveTab('home');
    app.innerHTML = renderHome();
    return;
  }

  if(r.path==='/explore'){
    setActiveTab('explore');
    app.innerHTML = renderExplore();
    return;
  }

  if(r.path==='/map'){
    setActiveTab('map');
    app.innerHTML = renderMap();
    return;
  }

  if(r.path==='/list'){
    const type=r.params.type||'hotels';
    setActiveTab(type);
    const sec=document.createElement('div');
    sec.className='section';
    const title = type==='hotels'?'Հյուրանոցներ': type==='food'?'Սնունդ': 'Տուրիզմ';
    const count = type==='hotels'?state.hotels.length : type==='food'?state.food.length : Object.values(state.travel).reduce((a,v)=>a+(Array.isArray(v)?v.length:0),0);
    sec.innerHTML = `
      <div class="section-head">
        <div>
          <div class="section-title">${title}</div>
          <div class="section-note">${count} արդյունք</div>
        </div>
      </div>
      ${type==='food' ? `<div class="pills" id="foodCats"></div>`:''}
      ${type==='travel' ? `<div class="pills" id="travelCats"></div>`:''}
      <div class="grid" id="listGrid"></div>
    `;
    app.appendChild(sec);
    const grid=sec.querySelector('#listGrid');

    if(type==='hotels'){
      state.hotels.forEach(p=>grid.appendChild(cardPlace(p, (pp)=>location.hash=`#/place/hotels/${encodeURIComponent(pp.id)}`)));
    } else if(type==='food'){
      const cats = foodCategories();
      let active = '';
      const catsEl = sec.querySelector('#foodCats');
      const rerender = ()=>{
        grid.innerHTML='';
        state.food.filter(p=>filterFood(p, active)).forEach(p=>grid.appendChild(cardPlace(p, (pp)=>location.hash=`#/place/food/${encodeURIComponent(pp.id)}`)));
      };
      catsEl.innerHTML = `<span class="pill ${!active?'active':''}" data-cat="">Բոլորը</span>` + cats.map(c=>`<span class="pill" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</span>`).join('');
      catsEl.addEventListener('click', (e)=>{
        const t=e.target.closest('[data-cat]'); if(!t) return;
        active = t.getAttribute('data-cat') || '';
        qsa('.pill', catsEl).forEach(p=>p.classList.toggle('active', (p.getAttribute('data-cat')||'')===active));
        rerender();
      });
      rerender();
    } else {
      // travel
      const catsEl = sec.querySelector('#travelCats');
      const keys = Object.keys(state.travel||{});
      let active = keys[0] || '';
      const labelOf = (k)=>({
        attractions:'Տեսարժան վայրեր',
        taxi_services:'Տաքսի',
        offroad_rentals:'Offroad / 4x4',
        rental_houses:'Վարձու տներ',
        entertainment:'Ժամանց / Խաղեր',
      }[k] || k);
      const rerender = ()=>{
        grid.innerHTML='';
        const arr = (state.travel[active]||[]);
        arr.forEach(p=>grid.appendChild(cardPlace(p, (pp)=>location.hash=`#/place/travel/${encodeURIComponent(active)}/${encodeURIComponent(pp.id)}`)));
      };
      catsEl.innerHTML = keys.map(k=>`<span class="pill ${k===active?'active':''}" data-cat="${escapeHtml(k)}">${escapeHtml(labelOf(k))}</span>`).join('');
      catsEl.addEventListener('click', (e)=>{
        const t=e.target.closest('[data-cat]'); if(!t) return;
        active=t.getAttribute('data-cat')||active;
        qsa('.pill', catsEl).forEach(p=>p.classList.toggle('active', p.getAttribute('data-cat')===active));
        rerender();
      });
      rerender();
    }
  }


  if(r.path==='/map'){
    setActiveTab('map');
    const sec=document.createElement('div');
    sec.className='section';
    sec.innerHTML = `
      <div class="section-head">
        <div>
          <div class="section-title">Քարտեզ</div>
          <div class="section-note">Ջերմուկի կենտրոն — բացել Google Maps-ում կամ տեսնել քարտեզը ներքևում</div>
        </div>
      </div>
      <div class="card" style="padding:14px;">
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
          <a class="btn btn-dir" target="_blank" rel="noopener" href="https://www.google.com/maps?q=Jermuk">Դեպի Ջերմուկ →</a>
          <a class="btn btn-ghost" target="_blank" rel="noopener" href="https://www.openstreetmap.org/#map=14/39.8402/45.6731">Բացել OSM</a>
        </div>
        <iframe title="Jermuk Map" class="mapframe"
          src="https://www.openstreetmap.org/export/embed.html?bbox=45.633%2C39.815%2C45.712%2C39.867&layer=mapnik"
          loading="lazy"></iframe>
      </div>
    `;
    app.appendChild(sec);
    return;
  }

  if(r.path==='/place'){
    const type=r.params.type;
    if(type==='hotels'){ setActiveTab('hotels'); }
    if(type==='food'){ setActiveTab('food'); }
    if(type==='travel'){ setActiveTab('travel'); }
    let p=null;
    let extra={};
    if(type==='hotels'){
      p=state.hotels.find(x=>String(x.id)===String(r.params.id));
    }else if(type==='food'){
      p=state.food.find(x=>String(x.id)===String(r.params.id));
    }else if(type==='travel'){
      const cat=r.params.cat;
      const arr=(state.travel[cat]||[]);
      p=arr.find(x=>String(x.id)===String(r.params.id));
      extra.catLabel = ({
        attractions:'Տեսարժան վայր',
        taxi_services:'Տաքսի ծառայություն',
        offroad_rentals:'Offroad / 4x4',
        rental_houses:'Վարձու տուն',
      }[cat] || 'Տուրիզմ');
    }
    if(!p){
      const msg=document.createElement('div');
      msg.className='section';
      msg.innerHTML = `<div class="section-title">Չգտնվեց</div><div class="section-note">Տվյալը բացակայում է։</div><a class="btn ghost" href="#/">← Home</a>`;
      app.appendChild(msg);
    } else {
      app.appendChild(detailView(p, type, extra));
    }
  }

  startHeroAutoplay();
}

function startHeroAutoplay(){
  clearInterval(state.timers.hero);
  clearInterval(state.timers.heroImg);
  const items = state.hotels.length?state.hotels:state.food;
  if(!items.length) return;

  // image rotate inside same hotel: every 5s
  state.timers.heroImg = setInterval(()=>{
    state.heroImgIndex = (state.heroImgIndex + 1) % 8;
    // only rerender hero (simple: rerender full for now)
    if(state.route.path==='/') render();
  }, 5000);

  // hotel rotate: every 20s
  state.timers.hero = setInterval(()=>{
    state.heroIndex = (state.heroIndex + 1) % items.length;
    state.heroImgIndex = 0;
    if(state.route.path==='/') render();
  }, 20000);
}

function renderBottomNav(){
  const nav=document.createElement('div');
  nav.className='bottomnav';
  nav.innerHTML = `
    <div class="bottomnav-inner">
      <a class="tab" data-tab="home" href="#/">
        ${icons.home}<div class="lbl">Գլխավոր</div>
      </a>
      <a class="tab" data-tab="hotels" href="#/list/hotels">
        ${icons.hotel}<div class="lbl">Հյուրանոց</div>
      </a>
      <a class="tab" data-tab="food" href="#/list/food">
        ${icons.food}<div class="lbl">Սնունդ</div>
      </a>
      <a class="tab" data-tab="travel" href="#/list/travel">
        ${icons.travel}<div class="lbl">Տուրիզմ</div>
      </a>
      <a class="tab" data-tab="map" href="#/map">
        ${icons.map}<div class="lbl">Քարտեզ</div>
      </a>
    </div>
  `;
  return nav;
}


function adminPanel(){
  const wrap = document.createElement('div');
  wrap.className = 'section';

  // Simple Login (static MVP)
  const userKey='jt_admin_user';
  const passKey='jt_admin_pass';
  const sessKey='jt_admin_ok';

  const defaultUser='admin';
  const defaultPass='5888';

  function isAuthed(){ return sessionStorage.getItem(sessKey)==='1'; }
  function setAuthed(v){ if(v) sessionStorage.setItem(sessKey,'1'); else sessionStorage.removeItem(sessKey); }

  const storedUser = (localStorage.getItem(userKey) || defaultUser).trim();
  const storedPass = (localStorage.getItem(passKey) || defaultPass);

  if(!isAuthed()){

    wrap.innerHTML = `
      <div class="card glass">
        <h2 style="margin:0 0 8px 0;">Admin Login</h2>
        <p class="muted" style="margin:0 0 14px 0;">Մուտք գործիր՝ տվյալները խմբագրելու համար։</p>
        <div class="row">
          <input class="input" type="text" placeholder="Login" id="uIn" style="flex:1; min-width:140px;">
          <input class="input" type="password" placeholder="Password" id="pIn" style="flex:1; min-width:140px;">
        </div>
        <div class="row" style="margin-top:10px;">
          <button class="btn primary" id="loginBtn" style="flex:1;">Մուտք →</button>
          <a class="btn ghost" href="#/" style="flex:0;">Վերադառնալ</a>
        </div>
        <p class="muted" style="margin-top:10px;">Default: <b>admin / 5888</b> (կարող ես փոխել Կարգավորումներ tab-ում)</p>
      </div>`;
    const uEl = wrap.querySelector('#uIn');
    const pEl = wrap.querySelector('#pIn');
    uEl.value = storedUser || 'admin';
    wrap.querySelector('#loginBtn').onclick = ()=>{
      const u = (uEl.value||'').trim();
      const p = (pEl.value||'');
      if(u === storedUser && p === storedPass){
        setAuthed(true);
        location.hash = '#/admin';
      }else{
        toast('Սխալ Login / Password');
      }
    };
    pEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter') wrap.querySelector('#loginBtn').click(); });
    return wrap;
  }

  const tabs = [
    {k:'hotels', t:'Հյուրանոցներ'},
    {k:'food', t:'Սնունդ'},
    {k:'travel', t:'Տուրիզմ'},
    {k:'settings', t:'Կարգավորումներ'},
  ];
  let active='hotels';

  const header = document.createElement('div');
  header.className='card glass';
  header.innerHTML = `
    <div class="row" style="justify-content:space-between; gap:12px; flex-wrap:wrap;">
      <div>
        <h2 style="margin:0;">Admin Panel</h2>
        <div class="muted">Փոփոխությունները պահվում են այս սարքի մեջ (localStorage)։ Կարող ես Export անել JSON-ով։</div>
      </div>
      <button class="btn ghost" id="logoutBtn">Դուրս գալ</button>
    </div>
    <div class="chips" style="margin-top:12px;">
      ${tabs.map(x=>`<button class="chip ${x.k===active?'active':''}" data-tab="${x.k}">${x.t}</button>`).join('')}
    </div>
  `;
  wrap.appendChild(header);

  const body = document.createElement('div');
  wrap.appendChild(body);

  header.querySelector('#logoutBtn').onclick = ()=>{ setAuthed(false); location.hash='#/'; };

  function renderTab(){
    body.innerHTML='';
    if(active==='hotels') body.appendChild(editorList('jt_override_hotels', state.hotels, hotelTemplate()));
    if(active==='food') body.appendChild(editorList('jt_override_food', state.food, foodTemplate()));
    if(active==='travel') body.appendChild(travelEditor());
    if(active==='settings') body.appendChild(settingsPanel());
  }

  header.querySelectorAll('[data-tab]').forEach(btn=>{
    btn.onclick=()=>{
      active = btn.getAttribute('data-tab');
      header.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('active', b.getAttribute('data-tab')===active));
      renderTab();
    };
  });

  renderTab();
  return wrap;

  function settingsPanel(){
    const c=document.createElement('div');
    c.className='card glass';
    c.innerHTML = `
      <h3 style="margin-top:0;">Admin Login</h3>
      <div class="row">
        <input class="input" id="newUser" placeholder="Login (օր. admin)" style="flex:1; min-width:160px;">
        <input class="input" id="newPass" placeholder="Password" type="password" style="flex:1; min-width:160px;">
      </div>
      <div class="row" style="margin-top:10px;">
        <button class="btn primary" id="saveCred">Պահել</button>
        <button class="btn ghost" id="resetCred">Reset default</button>
      </div>
      <p class="muted" style="margin-top:10px;">
        Նշում․ սա static MVP է, password-ը պահվում է localStorage-ում այս սարքի վրա։
      </p>
      <p class="muted">Եթե մոռանաս՝ localStorage-ից ջնջիր <code>jt_admin_user</code> և <code>jt_admin_pass</code key-ը։</p>
    `;
    c.querySelector('#newUser').value = (localStorage.getItem(userKey) || defaultUser);
    c.querySelector('#newPass').value = (localStorage.getItem(passKey) || defaultPass);

    c.querySelector('#saveCred').onclick=()=>{
      const nu=(c.querySelector('#newUser').value||'').trim() || defaultUser;
      const np=(c.querySelector('#newPass').value||'') || defaultPass;
      localStorage.setItem(userKey, nu);
      localStorage.setItem(passKey, np);
      toast('Պահվեց');
    };
    c.querySelector('#resetCred').onclick=()=>{
      localStorage.removeItem(userKey);
      localStorage.removeItem(passKey);
      toast('Reset արեց');
      c.querySelector('#newUser').value = defaultUser;
      c.querySelector('#newPass').value = defaultPass;
    };
    return c;
  }

  function travelEditor(){
    const c=document.createElement('div');
    c.className='card glass';
    const base = loadOverride('jt_override_travel','object') || state.travel || {};
    c.innerHTML = `
      <h3 style="margin-top:0;">Տուրիզմ (travel.json)</h3>
      <p class="muted">Սա խմբագրում է ամբողջ travel object-ը։ Կարող ես ուղղել attractions/taxi/offroad/rental_houses և ավելացնել “entertainment” բաժին։</p>
      <textarea class="textarea" id="travelJson" spellcheck="false"></textarea>
      <div class="row" style="margin-top:12px; flex-wrap:wrap;">
        <button class="btn primary" id="saveTravel">Պահել</button>
        <button class="btn ghost" id="exportTravel">Export</button>
        <label class="btn ghost" style="cursor:pointer;">
          Import <input type="file" id="importTravel" accept="application/json" style="display:none;">
        </label>
      </div>
    `;
    const ta=c.querySelector('#travelJson');
    ta.value = JSON.stringify(base, null, 2);
    c.querySelector('#saveTravel').onclick=()=>{
      try{
        const obj=JSON.parse(ta.value);
        saveOverride('jt_override_travel', obj);
        state.travel=obj;
        toast('Պահվեց');
      }catch(e){ toast('JSON սխալ է'); }
    };
    c.querySelector('#exportTravel').onclick=()=>downloadJson('travel.json', JSON.parse(ta.value||'{}'));
    c.querySelector('#importTravel').onchange=(ev)=>{
      const f=ev.target.files && ev.target.files[0]; if(!f) return;
      f.text().then(t=>{ ta.value=t; toast('Ներմուծվեց, սեղմիր Պահել'); });
    };
    return c;
  }

  function editorList(storageKey, list, tmpl){
    const c=document.createElement('div');
    c.className='card glass';
    const base = loadOverride(storageKey,'array') || list || [];
    let currentIndex = 0;

    c.innerHTML = `
      <div class="row" style="justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <h3 style="margin:0;">Խմբագրում</h3>
        <div class="row" style="gap:8px; flex-wrap:wrap;">
          <button class="btn ghost" id="addBtn">+ Add</button>
          <button class="btn ghost" id="delBtn">Delete</button>
          <button class="btn ghost" id="exportBtn">Export</button>
          <label class="btn ghost" style="cursor:pointer;">Import <input type="file" id="importBtn" accept="application/json" style="display:none;"></label>
        </div>
      </div>

      <div class="row" style="margin-top:12px; gap:12px; flex-wrap:wrap;">
        <select class="input" id="sel" style="flex:1; min-width:220px;"></select>
        <button class="btn primary" id="saveBtn">Պահել</button>
      </div>

      <div id="form" style="margin-top:14px;"></div>
    `;

    const sel=c.querySelector('#sel');
    function refreshSelect(){
      sel.innerHTML = base.map((x,i)=>`<option value="${i}">${x.name||x.title||x.id||('item '+(i+1))}</option>`).join('');
      sel.value = String(currentIndex);
    }
    refreshSelect();

    const form=c.querySelector('#form');

    function renderForm(){
      const item = base[currentIndex] || {};
      form.innerHTML = tmpl(item);
      // wire
      form.querySelectorAll('[data-field]').forEach(inp=>{
        inp.oninput = ()=>{
          const f=inp.getAttribute('data-field');
          if(f==='images' || f==='amenities' || f==='food_type'){
            base[currentIndex][f]=inp.value.split(',').map(s=>s.trim()).filter(Boolean);
          }else if(f==='rating'){
            base[currentIndex][f]=Number(inp.value)||0;
          }else{
            base[currentIndex][f]=inp.value;
          }
        };
      });
    }

    sel.onchange=()=>{ currentIndex=Number(sel.value)||0; renderForm(); };
    renderForm();

    c.querySelector('#saveBtn').onclick=()=>{
      saveOverride(storageKey, base);
      if(storageKey==='jt_override_hotels'){ state.hotels=base; }
      if(storageKey==='jt_override_food'){ state.food=base; }
      toast('Պահվեց');
      refreshSelect();
    };

    c.querySelector('#addBtn').onclick=()=>{
      const id = `new_${Date.now()}`;
      base.unshift({id, name:'New Item', images:[]});
      currentIndex=0;
      refreshSelect();
      renderForm();
    };

    c.querySelector('#delBtn').onclick=()=>{
      if(base.length<=1){ toast('Չի կարելի դատարկել'); return; }
      base.splice(currentIndex,1);
      currentIndex=Math.max(0,currentIndex-1);
      refreshSelect();
      renderForm();
    };

    c.querySelector('#exportBtn').onclick=()=>downloadJson(storageKey.replace('jt_override_','')+'.json', base);

    c.querySelector('#importBtn').onchange=(ev)=>{
      const f=ev.target.files && ev.target.files[0]; if(!f) return;
      f.text().then(t=>{
        try{
          const arr=JSON.parse(t);
          if(!Array.isArray(arr)) throw new Error();
          saveOverride(storageKey, arr);
          if(storageKey==='jt_override_hotels'){ state.hotels=arr; }
          if(storageKey==='jt_override_food'){ state.food=arr; }
          toast('Ներմուծվեց');
          // refresh local base
          base.length=0; base.push(...arr);
          currentIndex=0;
          refreshSelect(); renderForm();
        }catch(e){ toast('Import JSON սխալ է'); }
      });
    };

    return c;
  }

  function hotelTemplate(){
    return (item)=>`
      <div class="grid2">
        <div>
          <label class="lbl">Անուն</label>
          <input class="input" data-field="name" value="${safe(item.name)}">
        </div>
        <div>
          <label class="lbl">Հասցե</label>
          <input class="input" data-field="address" value="${safe(item.address)}">
        </div>
        <div>
          <label class="lbl">Հեռախոս</label>
          <input class="input" data-field="phone" value="${safe(item.phone)}">
        </div>
        <div>
          <label class="lbl">Rating</label>
          <input class="input" data-field="rating" value="${safe(item.rating)}">
        </div>
        <div style="grid-column:1/-1;">
          <label class="lbl">Amenities (comma)</label>
          <input class="input" data-field="amenities" value="${(item.amenities||[]).join(', ')}">
        </div>
        <div style="grid-column:1/-1;">
          <label class="lbl">Images (direct jpg/png/webp links, comma)</label>
          <textarea class="textarea" data-field="images">${(item.images||[]).join(', ')}</textarea>
          <div class="muted" style="margin-top:6px;">FB/IG/Tripadvisor link-երը հաճախ արգելվում են (403/400)։ Ավելի լավ է՝ նկարները պահել ձեր hosting-ում ու տալ direct .jpg URL։</div>
        </div>
        <div style="grid-column:1/-1;">
          <label class="lbl">Նկարագրություն</label>
          <textarea class="textarea" data-field="description">${safe(item.description)}</textarea>
        </div>
      </div>`;
  }

  function foodTemplate(){
    return (item)=>`
      <div class="grid2">
        <div>
          <label class="lbl">Անուն</label>
          <input class="input" data-field="name" value="${safe(item.name)}">
        </div>
        <div>
          <label class="lbl">Տեսակ (restaurant/cafe/loft)</label>
          <input class="input" data-field="type" value="${safe(item.type)}">
        </div>
        <div>
          <label class="lbl">Հասցե</label>
          <input class="input" data-field="address" value="${safe(item.address)}">
        </div>
        <div>
          <label class="lbl">Հեռախոս</label>
          <input class="input" data-field="phone" value="${safe(item.phone)}">
        </div>
        <div style="grid-column:1/-1;">
          <label class="lbl">Food type (comma)</label>
          <input class="input" data-field="food_type" value="${(item.food_type||[]).join(', ')}">
        </div>
        <div style="grid-column:1/-1;">
          <label class="lbl">Images (direct links, comma)</label>
          <textarea class="textarea" data-field="images">${(item.images||[]).join(', ')}</textarea>
        </div>
        <div style="grid-column:1/-1;">
          <label class="lbl">Նկարագրություն</label>
          <textarea class="textarea" data-field="description">${safe(item.description)}</textarea>
        </div>
      </div>`;
  }

  function downloadJson(filename, obj){
    const blob=new Blob([JSON.stringify(obj,null,2)], {type:'application/json'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download=filename;
    a.click();
    setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
  }
}


async function init(){
  document.body.prepend(renderTopbar());
    await loadData();
  state.route = nav();
  render();
  window.addEventListener('hashchange', ()=>{
    state.route = nav();
    render();
  });

  // register service worker (optional)
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js').catch(()=>{});
  }
}


function updateActiveTab(){
  const hash = location.hash || '#/home';
  const key = hash.split('/')[1] || 'home';
  document.querySelectorAll('.bottom-nav .tab').forEach(a=>{
    a.classList.toggle('active', a.dataset.tab === key);
  });
}
window.addEventListener('hashchange', updateActiveTab);
window.addEventListener('load', updateActiveTab);
function typeTitle(type){ return t(type) || type; }
function renderListSkeleton(type){
  const title = typeTitle(type);
  const items = Array.from({length:8}).map((_,i)=>`
    <a class="v3-skelCard" href="#/place/${type}/demo-${i}">
      <div class="v3-skelImg shimmer"></div>
      <div class="v3-skelBody">
        <div class="v3-skelLine shimmer" style="width:70%"></div>
        <div class="v3-skelLine shimmer" style="width:48%"></div>
        <div class="v3-skelTags">
          <span class="v3-tag shimmer"></span>
          <span class="v3-tag shimmer"></span>
          <span class="v3-tag shimmer"></span>
        </div>
      </div>
    </a>
  `).join('');
  return `
    <section class="v3-section v3-section--top">
      <h1 class="v3-h1">${title}</h1>
      <p class="v3-sub2">${t('list_sub')}</p>
      <div class="v3-skelGrid">${items}</div>
    </section>
  `;
}
function renderPlaceSkeleton(type,id){
  const title = typeTitle(type);
  return `
    <section class="v3-section v3-section--top">
      <a class="v3-back" href="#/list/${type}">‹ ${t('back')}</a>
      <div class="v3-placeHero">
        <div class="v3-placeBg shimmer"></div>
        <div class="v3-placeOverlay">
          <div class="v3-placeTitle shimmer" style="width:60%"></div>
          <div class="v3-placeSub shimmer" style="width:44%"></div>
        </div>
      </div>

      <div class="v3-placeActions">
        <a class="btn btn-primary disabled" href="javascript:void(0)">📞 ${t('call')}</a>
        <a class="btn btn-ghost disabled" href="javascript:void(0)">🗺️ ${t('open_map')}</a>
        <a class="btn btn-ghost disabled" href="javascript:void(0)">🛎️ ${t('book')}</a>
      </div>

      <div class="v3-placeBlock">
        <div class="v3-skelLine shimmer" style="width:85%"></div>
        <div class="v3-skelLine shimmer" style="width:78%"></div>
        <div class="v3-skelLine shimmer" style="width:62%"></div>
      </div>

      <div class="v3-placeBlock">
        <h2 class="v3-h2">${t('amenities')}</h2>
        <div class="v3-amenGrid">
          <div class="v3-amen shimmer"></div><div class="v3-amen shimmer"></div><div class="v3-amen shimmer"></div><div class="v3-amen shimmer"></div>
          <div class="v3-amen shimmer"></div><div class="v3-amen shimmer"></div><div class="v3-amen shimmer"></div><div class="v3-amen shimmer"></div>
        </div>
      </div>
    </section>
  `;
}


window.JTP = window.JTP || {};
window.JTP.init = init;
