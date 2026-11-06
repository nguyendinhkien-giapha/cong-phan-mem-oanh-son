const CACHE="oanhson-portal-v29";
const FILES=["./","./index.html","./style.css?v=29","./apps.js","./app.js","./manifest.webmanifest?v=29","./logo-oanh-son.png?v=29","./assets/oanh-son-logo.png","./assets/icon-192.png","./assets/icon-512.png","./assets/apple-touch-icon.png","./assets/favicon-32.png","./assets/favicon-64.png"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",event=>{
 const request=event.request;
 if(request.method!=="GET"||new URL(request.url).origin!==self.location.origin)return;
 if(request.mode==="navigate"||request.destination==="document"){
  event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put("./index.html",copy));return response;}).catch(()=>caches.match("./index.html")));
  return;
 }
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));}return response;})));
});
