const CACHE_NAME = "noorly-v1.1";

const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./privacy.html",
  "./Icons/icon-192-1.png",
  "./Icons/icon-512-1.png"
];

// Install
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch (Cache First, then Network)
self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {

        if (cached) {
          return cached;
        }

        return fetch(event.request)
          .then(response => {

            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, copy));

            return response;

          })
          .catch(() => caches.match("./index.html"));

      })
  );

});
