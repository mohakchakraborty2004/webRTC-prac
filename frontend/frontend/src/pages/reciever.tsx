import { useEffect, useRef, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function Reciever() {

    

    const {socket, connected  } = useSocket();
    const [pc , setPC] = useState<RTCPeerConnection | null>()
     

    useEffect(() => {
        if(!socket || !connected) return;

        const Pc = new RTCPeerConnection();
        setPC(Pc)
        
        socket.send(JSON.stringify({type: "reciever"}));
        
    }, [connected])

    // const HandleSocket = async (Socket : WebSocket) => {

    //     const pc = new RTCPeerConnection();

      
    // }

    // if(socket) {
    //     HandleSocket(socket);
    // }

    if(socket && pc){

      

        socket.onmessage = async(event) => {
            const message =  JSON.parse(event.data);
  
            console.log("this is parsed msg on reciever side:" , message)

            pc.onicecandidate = (event) => {
                console.log("these are ice cands reciever side : ", event.candidate);
                socket.send(JSON.stringify({type : "iceCandidate", candidate : event.candidate}))
            }

            pc.ontrack = (event) => {
              //console.log(event)
              const video = document.createElement('video');
              document.body.appendChild(video);

              video.srcObject = new MediaStream([event.track]);
              video.play();
            }
      

            if (message.type == "offer") {
            
           // console.log("reciever.tsx 333333333333333333333")
            await pc.setRemoteDescription(message);

            const answer = await pc.createAnswer()
          //  console.log(answer)
            await pc.setLocalDescription(answer)
         
            socket.send(JSON.stringify({
                type : "createAnswer", 
                sdp : answer
            }))
            console.log("444444444444444444444")
            }
            else if(message.type === "iceCandidate"){
                await pc.addIceCandidate(message.candidate);
                console.log("ice candidate added on reciever")
            }
           
            
        }
    }

   
    

    return <>
    <h1>reciever</h1>

    

    </>

}

