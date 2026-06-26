// Service Worker — Cartera Pablo v7
const CACHE = 'cartera-v7';
const ASSETS = [
  './cartera_pablo_movil.html',
  './cartera_pablo_desktop.html',
  './manifest.json',
  './manifest-pc.json',
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
  // Todo lo que no sea mismo origen → siempre red, nunca caché
  // Esto incluye: yahoo, corsproxy, allorigins, fonts, cualquier API externa
  if (!e.request.url.startsWith(self.location.origin)) {
    e.respondWith(
      fetch(e.request).catch(() => new Response('', {status: 503}))
    );
    return;
  }
  // Assets locales: cache primero, red como fallback
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
