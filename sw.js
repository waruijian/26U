const CACHE_NAME = 'pwa-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 安裝 Service Worker 並快取基本檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 攔截請求以實現離線運作
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});