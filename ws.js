#!/usr/bin/env node
const WebSocketClient = require('websocket').client;

const client = new WebSocketClient();
const token = "mybottoken"

client.on('connectFailed', function (error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function (connection) {
    console.log('WebSocket Client Connected');

    connection.send('{"type": "AUTH", "token": "mybottoken", "bot_id": "854441624724308029"}')

    connection.on('message', function (msg) {
        console.log("Received: '" + msg.utf8Data + "'");
    })

    connection.on('close', function () {
        console.log('echo-protocol Connection Closed');
    })

    setInterval(() => {
        connection.send(JSON.stringify({
            type: "HEARTBEAT",
            token: token,
        }))
    }, 40000)
});


client.connect('ws://localhost:3334/', 'echo-protocol');