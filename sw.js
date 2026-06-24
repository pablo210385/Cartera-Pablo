// Service Worker — Cartera Pablo v3
const CACHE = 'cartera-v3';
const ASSETS = [
  './cartera_pablo_movil.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Precios en tiempo real: siempre red
  if (e.request.url.includes('yahoo') || e.request.url.includes('corsproxy') || e.request.url.includes('fonts.googleapis')) {
    e.respondWith(fetch(e.request).catch(() => new Response('', {status: 503})));
    return;
  }
  // Assets locales: cache primero
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
