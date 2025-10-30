const VERSION = '4';
const CACHE = `dashboard-v${VERSION}`;
const ASSETS = [
  'index.html',
  'manifest.webmanifest',
  'storage.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(ASSETS.map(u =>
      cache.add(new Request(u, { cache: 'reload' }))
    ));
    self.skipWaiting(); // activate immediately
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim(); // control open pages
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // Only same-origin GET
  if (req.method !== 'GET' || url.origin !== location.origin) return;

  // Network-first for index.html to get latest shell on each visit
  const isIndex = url.pathname.endsWith('/') || url.pathname.endsWith('index.html');
  if (isIndex) {
    e.respondWith((async () => {
      try {
        const fresh = await fetch(new Request('index.html', { cache: 'reload' }));
        const cache = await caches.open(CACHE);
        cache.put('index.html', fresh.clone());
        return fresh;
      } catch {
        const cached = await caches.match('index.html');
        return cached || new Response('Offline', { status: 503 });
      }
    })());
    return;
  }

  // Cache-first for other same-origin GETs
  e.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    const fresh = await fetch(req);
    const cache = await caches.open(CACHE);
    cache.put(req, fresh.clone());
    return fresh;
  })());
});

// Optional: allow page to tell SW to skip waiting
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
