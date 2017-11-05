var cacheName = 'soundboardcache-v1';
var filesToCache = [
     'index.html',
     'soundboard-final.html',
     'tagtest.html',
     'assets/css/main.css',
     'assets/css/homepageLIGHT.css',
     'assets/css/homepageDARK.css',
     'assets/js/sbfinal.js',
     'data/soundboard1.json',
     'data/soundboard2.json',
     
     'images/portal_2_wallpaper.jpg',
     'images/rick_and_morty_wp.jpg',
     
    'data/imgs/soundboard1/aperture.jpg',
    'data/imgs/soundboard1/cavejohnson.jpg',
    'data/imgs/soundboard1/friedpotato.jpg',
    'data/imgs/soundboard1/glados.jpg',
    'data/imgs/soundboard1/goodlife.jpg',
    'data/imgs/soundboard1/killyou.jpg',
    'data/imgs/soundboard1/lunatic.jpg',
    'data/imgs/soundboard1/mantismen.jpg',
    'data/imgs/soundboard1/monster.jpg',
    'data/imgs/soundboard1/potato.jpg',
    'data/imgs/soundboard1/turret.jpg',
    'data/imgs/soundboard1/wheatley.jpg',
      
    'data/imgs/soundboard2/aids.jpg',
    'data/imgs/soundboard2/antsjohnson.jpg',
    'data/imgs/soundboard2/birdman.jpg',
    'data/imgs/soundboard2/butthole.jpg',
    'data/imgs/soundboard2/concentrate.jpg',
    'data/imgs/soundboard2/cromulon.jpg',
    'data/imgs/soundboard2/meseeks.jpg',
    'data/imgs/soundboard2/owee.jpg',
    'data/imgs/soundboard2/schwifty.jpg',
    'data/imgs/soundboard2/tinyrick.jpg',
    'data/imgs/soundboard2/watchtv.jpg',
    'data/imgs/soundboard2/wubaluba.jpg',
     
    'data/audio/soundboard1/aperture.mp3',  
    'data/audio/soundboard1/cavejohnson.mp3',
    'data/audio/soundboard1/friedpotato.mp3',
    'data/audio/soundboard1/glados.mp3',
    'data/audio/soundboard1/goodlife.mp3',
    'data/audio/soundboard1/killyou.mp3',
    'data/audio/soundboard1/lunatic.mp3',
    'data/audio/soundboard1/mantismen.mp3',
    'data/audio/soundboard1/monster.mp3',
    'data/audio/soundboard1/potato.mp3',
    'data/audio/soundboard1/turret.mp3',
    'data/audio/soundboard1/wheatley.mp3',
    
    'data/audio/soundboard2/AIDS!.mp3',
    'data/audio/soundboard2/antsjohnson.mp3',
    'data/audio/soundboard2/birdman.mp3',
    'data/audio/soundboard2/butthole.mp3',
    'data/audio/soundboard2/concentrate.mp3',
    'data/audio/soundboard2/Good_Job!.mp3',
    'data/audio/soundboard2/meseeks.mp3',
    'data/audio/soundboard2/owee.mp3',
    'data/audio/soundboard2/schwifty.mp3',
    'data/audio/soundboard2/tinyrick.mp3',
    'data/audio/soundboard2/watchtv.mp3',
    'data/audio/soundboard2/wubbalubba.mp3',
    
    'data/imgs/play_circle_outline.svg',
    'data/imgs/pause_circle_outline.svg'
    ];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});