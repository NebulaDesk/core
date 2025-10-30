const CACHE = 'dashboard-v3';
const ASSETS = [
  'index.html',
  'manifest.webmanifest',
  'storage.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Use individual adds so one 404 doesn’t kill the whole install
    await Promise.all(
      ASSETS.map(u => cache.add(new Request(u, { cache: 'reload' })))
    );
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method === 'GET' && new URL(request.url).origin === location.origin) {
    e.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const fresh = await fetch(request);
      const cache = await caches.open(CACHE);
      cache.put(request, fresh.clone());
      return fresh;
    })());
  }
});
