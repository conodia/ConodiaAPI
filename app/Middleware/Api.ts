import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Token from "App/Models/Token";

export default class Api {
    public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {
        const token = request.header('Authorization')
        if (!token) {
            return response.status(401).send({message: 'Unauthorized'})
        }

        const client = await Token.findBy('token', token)

        if (!client) {
            return response.status(401).send({message: 'Unauthorized'})
        }

        await next()
    }
}
