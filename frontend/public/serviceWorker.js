// public/serviceWorker.js
const CACHE_NAME = 'image-cache-v1';
const CACHE_URLS = ['/api/placeholder'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Don't try to cache URLs on install - do it on demand instead
        return Promise.resolve();
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/placeholder/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached response if found
          if (response) {
            return response;
          }

          // Clone the request because it can only be used once
          const fetchRequest = event.request.clone();

          // Make network request and cache the response
          return fetch(fetchRequest).then(
            (response) => {
              if(!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            }
          );
        })
    );
  }
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});