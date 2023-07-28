import {WebSocket} from 'ws'
import {inject} from '@adonisjs/fold';
import Token from "App/Models/Token";
import {OpCodes} from "App/Codes/OpCodes";

@inject()
export default class Auth {

    @inject()
    public static async execute(socket: WebSocket): Promise<void> {
        socket.on("AUTH", async (message) => {
            if(!message.token) {
                 await socket.send(JSON.stringify({
                    code: OpCodes.AUTH,
                    status: 401,
                    message: 'Unknow token'
                }))
                return socket.close(401, 'Unknow token')
            }

            const app = await Token.query().where('token', message.token).first()

            if(!app) {
                await socket.send(JSON.stringify({
                    code: OpCodes.AUTH.valueOf(),
                    status: 401,
                    message: 'Unknow token'
                }))

                return socket.close(401, 'Unknow token')
            }

            // @ts-ignore
            socket.app = app

            socket.send(JSON.stringify({
                type: OpCodes.AUTH,
                status: 200,
                message: 'Success !'
            }))
        })
    }
}