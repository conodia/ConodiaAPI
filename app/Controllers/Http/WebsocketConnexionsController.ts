import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import WsConnexionValidator from "App/Validators/WsConnexionValidator";
import WebsocketClients from "App/Models/WebsocketClients";
import Token from "App/Models/Token";
import Env from "@ioc:Adonis/Core/Env";

export default class WebsocketConnexionsController {
    public async connect({request, response}: HttpContextContract) {
        const data = await request.validate(WsConnexionValidator);

        const app = await WebsocketClients.query().where('secret', data.secret).firstOrFail();

        if (!app) {
            return response.status(401).send({
                error: 'Invalid secret'
            });
        }

        const token = await Token.create(data);

        return response.status(200).send({
            message: 'Welcome on the api and websocket !',
            token: token.token,
            WsUrl: Env.get('WEBSOCKET_URL', "ws://localhost:3334")
        });
    }
}
