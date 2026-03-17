let roomId
let isHost=false

const video=document.getElementById("video")

const channel=new BroadcastChannel("watchparty")

function createRoom(){
roomId=Math.random().toString(36).substring(2,8)
isHost=true
startRoom()
}

function joinRoom(){
roomId=document.getElementById("roomInput").value
startRoom()
}

function startRoom(){
document.getElementById("home").classList.add("hidden")
document.getElementById("room").classList.remove("hidden")
document.getElementById("roomId").innerText="Salle : "+roomId
initVoice()
}

function copyLink(){
navigator.clipboard.writeText(location.origin+"?room="+roomId)
alert("Lien copié")
}

function loadVideo(){
let file=document.getElementById("fileInput").files[0]
let url=document.getElementById("videoUrl").value

if(file){
video.src=URL.createObjectURL(file)
broadcast({type:"video",src:video.src})
}

if(url){
video.src=url
broadcast({type:"video",src:url})
}
}

function broadcast(data){
data.room=roomId
channel.postMessage(data)
}

channel.onmessage=e=>{
let data=e.data
if(data.room!==roomId)return

if(data.type==="video"){
video.src=data.src
}

if(data.type==="play"){
video.play()
}

if(data.type==="pause"){
video.pause()
}

if(data.type==="chat"){
addChat(data.user,data.text)
}
}

video.onplay=()=>{
if(isHost)broadcast({type:"play"})
}

video.onpause=()=>{
if(isHost)broadcast({type:"pause"})
}

function sendMessage(){
let input=document.getElementById("message")
let text=input.value
addChat("Moi",text)
broadcast({type:"chat",user:"User",text})
input.value=""
}

function addChat(user,text){
let chat=document.getElementById("chat")
chat.innerHTML+=`<p><b>${user}:</b> ${text}</p>`
chat.scrollTop=chat.scrollHeight
}

if("serviceWorker" in navigator){
navigator.serviceWorker.register("service-worker.js")
}