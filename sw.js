const CACHE_NAME = 'soccer-friday-v3';
const ASSETS = [
  '/index.html',
  '/manifest.json',
  '/icon.png',
  '/icon-192.png',
  '/icon-512.png'
];

// The install banner HTML+CSS+JS to inject into every HTML page
const INSTALL_BANNER = `
<style>
  #pwa-install-banner {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99999;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
    direction: rtl;
    animation: slideUp 0.4s ease-out;
  }
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  #pwa-install-banner .banner-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    flex-shrink: 0;
    object-fit: cover;
  }
  #pwa-install-banner .banner-text {
    flex: 1;
  }
  #pwa-install-banner .banner-text strong {
    display: block;
    font-size: 1rem;
    margin-bottom: 2px;
  }
  #pwa-install-banner .banner-text span {
    font-size: 0.82rem;
    opacity: 0.85;
  }
  #pwa-install-banner .banner-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
  }
  #pwa-install-btn {
    background: #2ecc71;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    white-space: nowrap;
  }
  #pwa-install-btn:hover  { background: #27ae60; }
  #pwa-install-btn:active { transform: scale(0.95); }
  #pwa-dismiss-btn {
    background: transparent;
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.3);
    padding: 10px 14px;
    border-radius: 25px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  #pwa-dismiss-btn:hover { background: rgba(255,255,255,0.1); color: white; }
</style>
<div id="pwa-install-banner" style="display:none">
  <img class="banner-icon" src="icon.png" alt="אפליקציה" onerror="this.style.display='none'">
  <div class="banner-text">
    <strong>📲 התקן את האפליקציה</strong>
    <span>שישי כדורגל — גישה מהירה ממסך הבית</span>
  </div>
  <div class="banner-actions">
    <button id="pwa-dismiss-btn">אחר כך</button>
    <button id="pwa-install-btn">התקן</button>
  </div>
</div>
<script>
(function() {
  var deferredPrompt = null;
  var banner = document.getElementById('pwa-install-banner');

  // Listen for the browser's install event
  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    // Show banner after a short delay so the page loads first
    setTimeout(function() {
      banner.style.display = 'flex';
    }, 1500);
  });

  // Install button clicked
  document.getElementById('pwa-install-btn').addEventListener('click', function() {
    if (!deferredPrompt) return;
    banner.style.display = 'none';
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(result) {
      console.log('PWA install choice:', result.outcome);
      deferredPrompt = null;
    });
  });

  // Dismiss button
  document.getElementById('pwa-dismiss-btn').addEventListener('click', function() {
    banner.style.display = 'none';
    // Don't show again for 7 days
    localStorage.setItem('pwa_dismissed', Date.now());
  });

  // If dismissed recently, don't show
  var dismissed = localStorage.getItem('pwa_dismissed');
  if (dismissed && (Date.now() - Number(dismissed)) < 7 * 24 * 60 * 60 * 1000) {
    window.addEventListener('beforeinstallprompt', function(e) { e.preventDefault(); });
  }

  // Hide banner once installed
  window.addEventListener('appinstalled', function() {
    banner.style.display = 'none';
    console.log('PWA installed successfully');
  });
})();
</script>
`;

// Install: cache all files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: intercept HTML requests and inject the install banner
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Only inject into HTML navigation requests
  const isHTML = event.request.mode === 'navigate' ||
    (event.request.method === 'GET' &&
     event.request.headers.get('accept') &&
     event.request.headers.get('accept').includes('text/html'));

  if (isHTML) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        const networkFetch = fetch(event.request).catch(() => cached);
        return (cached || networkFetch).then(response => {
          if (!response) return new Response('Offline', { status: 503 });
          return response.text().then(html => {
            // Inject banner just before </body>
            const injected = html.replace('</body>', INSTALL_BANNER + '\n</body>');
            return new Response(injected, {
              status: response.status,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          });
        });
      })
    );
    return;
  }

  // For non-HTML: serve from cache, fallback to network
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
