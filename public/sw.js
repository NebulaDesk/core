const CACHE = 'dashboard-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/storage.js'
];
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', (e)=>{
  const { request } = e;
  // Cache-first for same-origin GET requests
  if (request.method==='GET' && new URL(request.url).origin===location.origin){
    e.respondWith((async()=>{
      const cached = await caches.match(request);
      if(cached) return cached;
      const fresh = await fetch(request);
      const cache = await caches.open(CACHE);
      cache.put(request, fresh.clone());
      return fresh;
    })());
  }
});
