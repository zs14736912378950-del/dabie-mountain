// 大别山生态密码 — Service Worker (#9 PWA离线支持)
const CACHE_NAME = 'dabie-mountain-v1';
const STATIC_ASSETS = [
  '/dabie-mountain/',
  '/dabie-mountain/index.html',
  '/dabie-mountain/manifest.json',
  '/dabie-mountain/images/home-bg.jpeg',
  '/dabie-mountain/images/species/pinus.jpg',
  '/dabie-mountain/images/species/rhododendron.jpg',
  '/dabie-mountain/images/species/ginkgo.jpg',
  '/dabie-mountain/images/species/dendrobium.jpg',
  '/dabie-mountain/images/species/goldenpheasant.jpg',
  '/dabie-mountain/images/species/salamander.jpg',
  '/dabie-mountain/images/species/pheasant.jpg',
  '/dabie-mountain/images/species/eagle.webp',
  '/dabie-mountain/images/species/muskdeer.jpg',
  '/dabie-mountain/images/species/pangolin.webp',
  '/dabie-mountain/images/species/butterfly.webp',
  '/dabie-mountain/images/species/tianinv.jpg',
  '/dabie-mountain/images/species/lingzhi.jpg',
  '/dabie-mountain/images/species/huamei.jpg',
  '/dabie-mountain/images/species/bailu.jpg',
  '/dabie-mountain/images/species/mihou.jpg',
  '/dabie-mountain/images/species/zhonghua_mifeng.jpg',
  '/dabie-mountain/images/species/chilianshe.jpg',
  '/dabie-mountain/images/species/dabie-mountain-peak.jpg'
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
          return caches.match('/dabie-mountain/index.html');
        }
      });
    })
  );
});
