// Bump VERSION whenever you want every installed phone to drop its old cache.
const VERSION='mallang-v2';
const CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
const put=(req,res)=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(VERSION).then(c=>c.put(req,cp))}return res};
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  // The game page itself: network first so a new deploy shows up on the next open, cache when offline.
  if(req.mode==='navigate'){
    e.respondWith(fetch(req).then(r=>put('index.html',r)).catch(()=>caches.match('index.html',{ignoreSearch:true})));
    return;
  }
  // Everything else (icons, fonts): cache first, refresh in the background.
  e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>{
    const net=fetch(req).then(r=>put(req,r)).catch(()=>hit);
    return hit||net;
  }));
});
