import { useEffect } from "react";
import useSocket from "../hooks/useSocket"

const Sender = () => {
   
    const socket = useSocket();

    useEffect(()=> {
   
        if(!socket) {
            return
        }

        socket.send(JSON.stringify({type : "sender"})); 

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if(message.type === "createAnswer"){

            }
        }

    }, [])

    const HandleMessage = () => {
        socket?.send("")
    }

    return <>
    
    <h1>sender</h1>
    <br></br>
    <button onClick={HandleMessage}>SEND VIDEO</button>
    
    </>


}