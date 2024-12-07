const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.png',
  '/assets/index.css',
  '/assets/index.js',
  '/images/factory-automation.jpg',
  '/images/erp-integration.jpg',
  '/images/cbm-system.jpg',
  '/images/nlp-pipeline.jpg',
  '/images/sentiment-analysis.jpg',
  '/images/recommendation-engine.jpg',
  '/images/image-classification.jpg',
  '/images/anomaly-detection.jpg',
  '/images/time-series.jpg',
  '/images/bike-sharing.jpg',
  '/images/customer-segmentation.jpg',
  '/images/quality.jpg',
  '/images/stock-forecast.jpg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      }),
      self.clients.claim()
    ])
  );
});

// Fetch event - network first, falling back to cache
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If we got a valid response, clone it and update the cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });
        }
        return response;
      })
      .catch(() => {
        // If network request fails, try to get it from cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // If it's a navigation request, return the offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
      })
  );
});
