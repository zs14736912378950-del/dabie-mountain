// 大别山生态密码 — Service Worker (#9 PWA离线支持)
const CACHE_NAME = 'dabie-mountain-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/home-bg.jpeg',
  '/images/species/pinus.jpg',
  '/images/species/rhododendron.jpg',
  '/images/species/ginkgo.jpg',
  '/images/species/dendrobium.jpg',
  '/images/species/goldenpheasant.jpg',
  '/images/species/salamander.jpg',
  '/images/species/pheasant.jpg',
  '/images/species/eagle.webp',
  '/images/species/muskdeer.jpg',
  '/images/species/pangolin.webp',
  '/images/species/butterfly.webp',
  '/images/species/tianinv.jpg',
  '/images/species/lingzhi.jpg',
  '/images/species/huamei.jpg',
  '/images/species/bailu.jpg',
  '/images/species/mihou.jpg',
  '/images/species/zhonghua_mifeng.jpg',
  '/images/species/chilianshe.jpg',
  '/images/species/dabie-mountain-peak.jpg'
];

// 安装：预缓存关键静态资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// 请求拦截：缓存优先策略
self.addEventListener('fetch', event => {
  // 跳过非GET请求和跨域请求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // 只缓存同源请求
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // 缓存新资源
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // 离线时返回离线页面（如果请求的是HTML）
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
