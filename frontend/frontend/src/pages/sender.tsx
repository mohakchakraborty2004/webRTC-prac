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
        if (!socket){
            console.log("return");
            return;
        }

        console.log("clicked")
       
        const offer =  await pc?.createOffer();
        console.log("created offer")

        await pc?.setLocalDescription(offer)
        const type = pc?.localDescription?.type
        const sdp = pc?.localDescription?.sdp

        socket.send(JSON.stringify({
            type,
            sdp
        }))

        console.log("11111111111111111")

        // pc!.onnegotiationneeded = async() => {
        //     console.log("created offer")
        //     const offer =  await PC.createOffer();
        //     await pc!.setLocalDescription(offer)
        //     socket.send(JSON.stringify({
        //         type : "createOffer",
        //         sdp : pc!.localDescription
        //     }))
        //     console.log("11111111111111111")
        //  }

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if(message.type === "createAnswer"){
                console.log("22222222222222222")
           await pc?.setRemoteDescription(message.sdp)
            }
        }

    }

    return <>
    
    <h1>sender</h1>
    <br></br>
    <button onClick={HandleMessage}>SEND VIDEO</button>
    
    </>


}

export default Sender;