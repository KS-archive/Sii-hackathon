self.addEventListener('install', function(e) {
  console.log('Installing service worker');
});

self.addEventListener('activate', function(e) {
  console.log('Activating service worker');
  return self.clients.claim();
});
