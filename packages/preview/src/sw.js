// Placeholder comment for the injected manifest
const PRECACHE_MANIFEST = self.__WB_MANIFEST;

// Cache name
const CACHE_NAME = 'preview-cache-v1';

// Install event handler - precache all assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets:', PRECACHE_MANIFEST);
      const urlsToPrecache = PRECACHE_MANIFEST.map(item => item.url);
      return cache.addAll(urlsToPrecache);
    }).then(() => {
      self.skipWaiting();
    })
  );
});

// Activate event handler
self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          return cacheName.startsWith('preview-cache-') && cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event handler
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Message event handler
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});