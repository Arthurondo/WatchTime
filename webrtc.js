let peer
let localStream

function initVoice(){
peer=new Peer()

navigator.mediaDevices.getUserMedia({audio:true})
.then(stream=>{
localStream=stream

peer.on("call",call=>{
call.answer(stream)
call.on("stream",audioStream=>{
playAudio(audioStream)
})
})
})
}

function callUser(id){
let call=peer.call(id,localStream)
call.on("stream",stream=>{
playAudio(stream)
})
}

function playAudio(stream){
let audio=document.createElement("audio")
audio.srcObject=stream
audio.play()
}

function toggleMic(){
localStream.getAudioTracks()[0].enabled=!localStream.getAudioTracks()[0].enabled
}