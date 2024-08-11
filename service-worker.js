const CACHE_VERSION_KEY = 'flashcards-cache-v5';
const BASE_PATH = '/FlashCards-PWA'; // if running locally, update to empty

self.addEventListener('install', event => {
    event.waitUntil(installStaticAssets());
});

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request));
});

self.addEventListener('activate', (event) => {
    event.waitUntil(cacheCleanup());
    return self.clients.claim(); // claim all tabs
});

async function installStaticAssets() {
    return caches
        .open(CACHE_VERSION_KEY)
        .then((cache) =>
            cache.addAll([
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm',
                BASE_PATH + '/',
                BASE_PATH + '/favicon.ico',
                BASE_PATH + '/index.html',
                BASE_PATH + '/styles.css',
                BASE_PATH + '/app.js',
                BASE_PATH + '/manifest.json',
                BASE_PATH + '/icons/icon-192x192.png',
                BASE_PATH + '/icons/icon-512x512.png',
            ])
        );
}

async function cacheFirst(request) {
    const cache = await caches.open(CACHE_VERSION_KEY);
    const response = await cache.match(request);
    console.log(request);
    if (response) {
        return response;
    }
    console.log('URL not in the cache: ', request.url);
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (error) {
        return new Response(`Network error happened: ${error}`, {
            status: 408,
            headers: { 'Content-Type': 'text/plain' },
        });
    }
}

async function cacheCleanup() {
    const cacheKeys = await caches.keys();
    const outdatedCache = (cacheKey) => cacheKey !== CACHE_VERSION_KEY;
    const purge = (cacheKey) => caches.delete(cacheKey);
    cacheKeys.filter(outdatedCache).forEach(purge);
    return true;
}