const filesToCache = [
  '/',
  'index.html',
  'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.css',
  'https://unpkg.com/material-components-web@v4.0.0/dist/material-components-web.min.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://unpkg.com/dexie@latest/dist/dexie.js',
  'https://www.gstatic.com/charts/loader.js'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      //return cache.addAll(filesToCache);
      cache.addAll(filesToCache.map((url) => {
           return new Request(url, { mode: 'no-cors' });
        }));
    })
  );
});


self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

    }).catch(error => {


    })
  );
});