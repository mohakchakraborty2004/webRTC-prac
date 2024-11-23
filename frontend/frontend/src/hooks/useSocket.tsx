import { useEffect, useState } from "react";

const useSocket = () => {

const [socket, setSocket] = useState<WebSocket | null>(null)

useEffect(()=> {
 
   
const ws = new WebSocket("ws://localhost:8000")

ws.onopen = () => {
    setSocket(ws)
    console.log("socket connected");
}

ws.onclose = () => {
    setSocket(null)
}


},[])

return socket;


}

export default useSocket;