import {WebSocket} from 'ws'
import WebsocketClients from "App/Models/WebsocketClients";
import {OpCodes} from "App/Codes/OpCodes";

export default class Heartbeat {

    public static async execute(socket: WebSocket): Promise<void> {
        let heartbeat_active = true

        setInterval(() => {
            if(!heartbeat_active) {
                socket.send(JSON.stringify({
                    type: OpCodes.HEARTBEAT,
                    status: 401,
                    message: 'HEARTBEAT_FAILED: No heartbeat received'
                }))
                socket.close()
            } else {
                heartbeat_active = false
            }
        }, 45000)

        socket.on("HEARTBEAT", async (message) => {        
            const app = await WebsocketClients.find(message.app_token)

            if (!app) {
                socket.send(JSON.stringify({
                    type: 'HEARTBEAT_DISALLOWED',
                    status: 401,
                    message: 'AUTH_FAILED: Invalid token'
                }))

                return socket.close()
            }

            socket.send(JSON.stringify({
                code: OpCodes.HEARTBEAT_ACK,
                status: 200,
                message: 'PONG'
            }))

            heartbeat_active = true
        })
    }
}