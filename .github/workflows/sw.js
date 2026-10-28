const CACHE = 'tykhe-mistse-v4'
const STATIC_ASSETS = ['/manifest.webmanifest', '/icon.svg']

self.addEventListener('install', (event) => {
  // Activate the new worker immediately so users receive the current app.
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((keys) =>
        Promise.all(
          keys.filter((key) => key.startsWith('tykhe-mistse-') && key !== CACHE)
            .map((key) => caches.delete(key))
        )
      )
    ])
  )
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  // HTML, JS and CSS must be network-first; otherwise the old bundle can
  // remain visible indefinitely after a deployment.
  const isAppShell = request.mode === 'navigate' ||
    url.pathname === '/' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.includes('/assets/')

  if (isAppShell) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE).then((cache) => cache.put(request, copy))
          }
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          if (cached) return cached
          if (request.mode === 'navigate') {
            return (await caches.match('/index.html')) || Response.error()
          }
          return Response.error()
        })
    )
    return
  }

  // Cache small static assets, but always fall back to the network first.
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(request, copy))
        }
        return response
      })
      .catch(() => caches.match(request).then((cached) => cached || Response.error()))
  )
})
