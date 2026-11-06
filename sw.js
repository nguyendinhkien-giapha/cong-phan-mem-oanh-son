
const CACHE = "oanhson-portal-pro-v2";

const LOGO = "./Bi%E1%BB%83u%20t%C6%B0%E1%BB%A3ng%20Ph%E1%BA%A7n%20M%E1%BB%81m%20Oanh%20S%C6%A1n.png";

const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./apps.js",
  "./app.js",
  "./manifest.webmanifest",
  LOGO
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (
    event.request.method === "GET" &&
    new URL(event.request.url).origin === location.origin
  ) {
    event.respondWith(
      caches.match(event.request).then(
        response => response || fetch(event.request)
      )
    );
  }
});
