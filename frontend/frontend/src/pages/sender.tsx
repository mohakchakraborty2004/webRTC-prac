import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket"

const Sender = () => {
   console.log("2");
    const {socket , connected }= useSocket();
    const [pc , setPc] = useState<RTCPeerConnection | null>(null)

    useEffect(()=> {
   
        if(!socket || !connected) {
            console.log("------")
            return
        }

        const PC = new RTCPeerConnection();
        setPc(PC);

        socket.send(JSON.stringify({type : "sender"})); 
            console.log(" sender tsx send socket --------------")



    }, [connected])

    const HandleMessage = async () => {
        if (!socket || !pc){
            console.log("return");
            return;
        }

      //  console.log("clicked")
       
      

        pc.onnegotiationneeded = async() => {
            console.log("on negotitation needed")
           
            const offer =  await pc?.createOffer();
            console.log("created offer")
         
            await pc.setLocalDescription(offer)
            const type = pc.localDescription?.type
            const sdp = pc.localDescription?.sdp

            socket.send(JSON.stringify({
                type,
                sdp
            }))
        }

     
        pc.onicecandidate = (event) => {
            console.log("these are cands : ",event.candidate);
            socket.send(JSON.stringify({type : "iceCandidate", candidate : event.candidate}))
        }

      //  console.log("11111111111111111")


        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if(message.type === "createAnswer"){
                //console.log("22222222222222222")
           await pc.setRemoteDescription(message.sdp)
            }
            else if(message.type === "iceCandidate"){
                await pc.addIceCandidate(message.candidate);
                console.log("added ice candidate on sender side.")
            }
        }

        const stream = await navigator.mediaDevices.getUserMedia({video : true , audio: false});
        pc.addTrack(stream.getVideoTracks()[0]);

    }

    return <>
    
    <h1>sender</h1>
    <br></br>
    <button onClick={HandleMessage}>SEND VIDEO</button>
    
    </>


}

export default Sender;