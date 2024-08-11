const CACHE_VERSION_KEY = 'flashcards-cache-v2';

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
                './images/zipcode.jpg',
                './images/favicon-16x16.png',
                './images/favicon-32x32.png',
                '/',
                './index.html',
                './styles.css',
                './app.js'
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