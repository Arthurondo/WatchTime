const CACHE="watchparty-v1"

const ASSETS=[
"/",
"index.html",
"style.css",
"app.js",
"webrtc.js",
"tv.js"
]

self.addEventListener("install",e=>{
e.waitUntil(
caches.open(CACHE).then(cache=>cache.addAll(ASSETS))
)
})

self.addEventListener("fetch",e=>{
e.respondWith(
caches.match(e.request).then(res=>res||fetch(e.request))
)
})