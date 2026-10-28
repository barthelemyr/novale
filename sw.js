// Novale service worker: keeps the app available offline.
// It only caches Novale's own files. It never sends your ideas anywhere.
const CACHE = "novale-1.0.0";
const FILES = ["./", "index.html", "manifest.webmanifest", "vendor/jszip.min.js",
  "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const save = res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return res; };
  if (req.mode === "navigate") {
    // The page itself: try the network first so updates arrive, fall back to the cached copy offline.
    e.respondWith(fetch(req).then(save).catch(() => caches.match(req).then(hit => hit || caches.match("index.html"))));
    return;
  }
  // Everything else (icons, vendor script): cache first.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(save)));
});
