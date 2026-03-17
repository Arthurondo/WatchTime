async function openTV(){

const res=await fetch("channels/iptv.m3u")
const text=await res.text()

let lines=text.split("\n")

let list=document.getElementById("tvList")
list.innerHTML=""

for(let i=0;i<lines.length;i++){

if(lines[i].includes("#EXTINF")){

let name=lines[i].split(",")[1]
let url=lines[i+1]

let btn=document.createElement("button")

btn.innerText=name

btn.onclick=()=>{
playTV(url)
}

list.appendChild(btn)

}

}

list.classList.toggle("hidden")

}

function playTV(url){

const video=document.getElementById("video")

if(Hls.isSupported()){

const hls=new Hls()

hls.loadSource(url)

hls.attachMedia(video)

}else{

video.src=url

}

}