import {websocket} from "../../start/socket";

export enum ToType {
    DISCORD = "discord",
    MINECRAFT = "minecraft"
}

export default class WebsocketManager {
    public static async send(type: ToType, data) {
        websocket.io.clients.forEach((client) => {
            // @ts-ignore
            if (client.app.type == type) {
                client.send(data)
            }
        })
    }
}