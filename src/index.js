"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var port = 8000;
var wss = new ws_1.WebSocketServer({ port: port });
//browser 1 creates offer which goes to browser2 , "offer" which contains the sdp of browser 1.
//browser2 on recieving "offer", sends an answer to browser 1, "answer" which contains sdp of browser 2.
var SenderWS = null;
var RecieverWS = null;
wss.on("connection", function (ws) {
    ws.on("message", function (RawMessage) {
        var parsedMessage = JSON.parse(RawMessage.toString());
        console.log(RawMessage);
        console.log(parsedMessage);
        if (parsedMessage.type == "sender") {
            console.log("sender connected");
            SenderWS = ws;
            if (SenderWS) {
                console.log("true for sender");
            }
        }
        else if (parsedMessage.type == "reciever") {
            console.log("reciever connected");
            RecieverWS = ws;
            if (RecieverWS) {
                console.log("true for reciever");
            }
        }
        else if (parsedMessage.type == "offer") {
            if (ws == SenderWS) {
                RecieverWS === null || RecieverWS === void 0 ? void 0 : RecieverWS.send(JSON.stringify({ type: parsedMessage.type, sdp: parsedMessage.sdp }));
                console.log("offer sent to reciever", RawMessage);
            }
            else {
                console.log("no sender socket");
                return;
            }
        }
        else if (parsedMessage.type == "createAnswer") {
            if (ws == RecieverWS) {
                SenderWS === null || SenderWS === void 0 ? void 0 : SenderWS.send(JSON.stringify({ type: parsedMessage.type, sdp: parsedMessage.sdp }));
                console.log("answer sent to sender");
            }
        }
        else if (parsedMessage.type == "iceCandidate") {
            if (ws == SenderWS) {
                RecieverWS === null || RecieverWS === void 0 ? void 0 : RecieverWS.send(JSON.stringify({ type: parsedMessage.type, candidate: parsedMessage.candidate }));
            }
            else if (ws == RecieverWS) {
                SenderWS === null || SenderWS === void 0 ? void 0 : SenderWS.send(JSON.stringify({ type: parsedMessage.type, candidate: parsedMessage.candidate }));
            }
        }
    });
});
