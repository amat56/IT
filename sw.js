const CACHE='avia-web-v8';
const SHELL=['./','./index.html','./manifest.webmanifest','./offline.html','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname.endsWith('.supabase.co'))return;if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{if(x&&x.ok){const c=x.clone();caches.open(CACHE).then(k=>k.put('./index.html',c));}return x;}).catch(()=>caches.match('./index.html').then(x=>x||caches.match('./offline.html'))));return;}e.respondWith(caches.match(r).then(cached=>cached||fetch(r).then(x=>{if(x&&x.ok&&u.origin===self.location.origin){const c=x.clone();caches.open(CACHE).then(k=>k.put(r,c));}return x;})));});
