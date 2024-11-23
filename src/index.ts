import { WebSocketServer, WebSocket } from "ws";


const port = 8000;

const wss = new WebSocketServer({port : port})

//browser 1 creates offer which goes to browser2 , "offer" which contains the sdp of browser 1.
//browser2 on recieving "offer", sends an answer to browser 1, "answer" which contains sdp of browser 2.

let SenderWS : null | WebSocket = null
let RecieverWS : null | WebSocket = null

wss.on("connection", (ws) => {
    
    
    ws.on("message", (RawMessage)=> {
                  
        const parsedMessage = JSON.parse(RawMessage.toString())

        if (parsedMessage.type == "sender"){
            SenderWS = ws
        }
        else if(parsedMessage.type == "reciever"){
            RecieverWS = ws
        }
        else if(parsedMessage.type == "createOffer"){
            if(ws = SenderWS!){
                RecieverWS?.send(JSON.stringify(RawMessage));
            }
            else {
                console.log("no sender socket")
                return;
            }
        }
        else if(parsedMessage.type == "createAnswer"){
            if (ws = RecieverWS!){
                SenderWS?.send(JSON.stringify(RawMessage))
            }
        }
        else if (parsedMessage.type == "iceCandidate"){
            if(ws == SenderWS!){
                RecieverWS?.send(JSON.stringify(RawMessage));
            } else if (ws == RecieverWS!){
                SenderWS?.send(JSON.stringify(RawMessage))
            }
        }
    })
})
