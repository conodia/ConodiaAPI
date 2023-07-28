import {WebSocket} from "ws"
import {inject} from '@adonisjs/fold';

@inject()
export default class Message {
    @inject()
    public static async execute(socket: WebSocket): Promise<void> {
        socket.on("message", (message) => {
            const msg = JSON.parse(message.toString())

            switch (msg.code) {
                case 0:
                    socket.emit("AUTH", {
                        type: 'AUTH',
                        token: msg.data.token,
                    })
                    break;
                case 1:
                    socket.emit("HEARTBEAT", {
                        type: 'HEARTBEAT',
                        licence: msg.licence,
                        bot_id: msg.bot_id
                    })
                    break;
            }
        })
    }
}