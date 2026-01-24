const CACHE = 'jermuk-static-story-202601231410';
const CORE = [
  './',
  './index.html',
  './assets/css/style.css',
  './assets/js/app.js',
  './assets/js/boot.js',
  './assets/js/icons.js',
  './data/hotels.json',
  './data/food.json',
  './data/travel.json',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE ? caches.delete(k) : Promise.resolve())));
    await self.clients.claim();
  })());
});


self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  const respond = (async () => {
    // same-origin: cache-first with network update
    if (url.origin === location.origin) {
      const cached = await caches.match(req);
      if (cached) return cached;

      try {
        const net = await fetch(req);
        try {
          const c = await caches.open(CACHE);
          c.put(req, net.clone());
        } catch {}
        return net;
      } catch {
        const shell = await caches.match('./index.html');
        return shell || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } });
      }
    }

    // external: network-first, fallback to cache, then empty response
    try {
      return await fetch(req);
    } catch {
      const cached = await caches.match(req);
      return cached || new Response('', { status: 504 });
    }
  })();

  e.respondWith(respond);
});
