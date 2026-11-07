const CACHE_NAME = 'nexo-cursos-v5';
const APP_SHELL = [
  '/', '/index.html', '/manifest.webmanifest', '/marca.svg',
  '/python-course/index.html',
  '/python-course/course.css',
  '/python-course/course.js',
  '/python-course/vendor/tailwind.css',
  '/python-course/vendor/chart.umd.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    const indexResponse = await fetch('/index.html', { cache: 'reload' });
    if (!indexResponse.ok) throw new Error('Não foi possível preparar a tela inicial para uso offline.');
    const html = await indexResponse.clone().text();
    const appAssets = Array.from(html.matchAll(/(?:src|href)=["'](\/assets\/[^"']+)["']/g), (match) => match[1]);
    await cache.addAll([...APP_SHELL, ...appAssets]);
  })());
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
  ));
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    const pythonCoursePage = url.pathname.startsWith('/python-course/');
    const cacheKey = pythonCoursePage ? new Request(`${url.origin}${url.pathname}`) : '/index.html';
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        void caches.open(CACHE_NAME).then((cache) => cache.put(cacheKey, copy));
      }
      return response;
    }).catch(async () => {
      const cached = pythonCoursePage
        ? await caches.match(cacheKey, { ignoreSearch: true })
        : await caches.match('/index.html');
      return cached || new Response('Abra o aplicativo conectado uma vez para preparar o acesso offline.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }));
    return;
  }

  event.respondWith(caches.match(request).then((cached) => {
    if (cached) return cached;
    return fetch(request).then((response) => {
      if (response.ok && response.type === 'basic') {
        const copy = response.clone();
        void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    }).catch(async () => {
      if (/^\/assets\/.*\.js$/.test(url.pathname)) {
        const recoveryScript = `const root = document.getElementById('root'); if (root) root.innerHTML = '<main style="max-width:680px;margin:10vh auto;padding:28px;font:16px/1.6 system-ui;color:#22243a;background:#fff;border:1px solid #e4e6ef;border-radius:18px"><h1 style="margin-top:0">O Nexo Cursos não conseguiu carregar</h1><p>Os arquivos principais desta instalação ainda não foram armazenados para uso offline.</p><p>Conecte-se ao servidor local do projeto, abra novamente o aplicativo e atualize a página. Depois disso, a próxima abertura offline poderá usar os arquivos salvos.</p></main>';`;
        return new Response(recoveryScript, { status: 200, headers: { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'no-store' } });
      }
      return new Response('', { status: 504, statusText: 'Offline' });
    });
  }));
});
