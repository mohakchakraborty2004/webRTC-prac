import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

export default function Reciever() {

    const socket = useSocket();
    

    useEffect(() => {
        if(!socket) return;
        
        socket.send(JSON.stringify({type: "reciever"}));
        
        HandleSocket(socket);
   
    }, [])

    const HandleSocket = async (Socket : WebSocket) => {

        const pc = new RTCPeerConnection();

        Socket.onmessage = async(event) => {
            const message =  JSON.parse(event.data);
            if (message.type === "createOffer") {
            await pc.setRemoteDescription(message.sdp);
            const answer = await pc.createAnswer()
            await pc.setLocalDescription(answer)
            Socket.send(JSON.stringify({
                type : "createAnswer", 
                sdp : answer
            }))
            }
        }
    }

}