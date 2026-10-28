const CACHE = 'tykhe-mistse-v5'
const STATIC_ASSETS = ['/manifest.webmanifest', '/icon.svg']
self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(STATIC_ASSETS)))
})
self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith('tykhe-mistse-') && key !== CACHE).map((key) => caches.delete(key))))
  ]))
})
self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return
  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  event.respondWith(fetch(request, { cache: 'no-cache' }).then((response) => {
    if (response.ok) {
      const copy = response.clone()
      caches.open(CACHE).then((cache) => cache.put(request, copy))
    }
    return response
  }).catch(async () => (await caches.match(request)) || (request.mode === 'navigate' ? (await caches.match('/index.html')) || Response.error() : Response.error())))
})
