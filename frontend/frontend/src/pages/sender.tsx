import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket"

const Sender = () => {
   
    const socket = useSocket();
    const [pc , setPc] = useState<RTCPeerConnection | null>(null)

    useEffect(()=> {
   
        if(!socket) {
            return
        }

        socket.send(JSON.stringify({type : "sender"})); 



    }, [])

    const HandleMessage = async () => {
        if (!socket){
            return;
        }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if(message.type === "createAnswer"){
           await pc?.setRemoteDescription(message.sdp)
            }
        }

        const PC = new RTCPeerConnection();
        setPc(PC);


         PC.onnegotiationneeded = async() => {
            const offer =  await PC.createOffer();
            await PC.setLocalDescription(offer)
            socket.send(JSON.stringify({
                type : "createOffer",
                sdp : PC.localDescription
            }))
         }
        
    }

    return <>
    
    <h1>sender</h1>
    <br></br>
    <button onClick={HandleMessage}>SEND VIDEO</button>
    
    </>


}