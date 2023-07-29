import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import StaffConnexionValidator from "App/Validators/StaffConnexionValidator";
import Player from "App/Models/Player";
import StaffConnexion from "App/Models/StaffConnexion";
import WebsocketManager, {ToType} from "App/Services/WebsocketManager";
import {OpCodes} from "App/Codes/OpCodes";

export default class StaffConnexionsController {
    public async create({ request, response }: HttpContextContract) {
        const data = await request.validate(StaffConnexionValidator)
        const player = await Player.query().where('minecraftUuid', data.playerId).orWhere('discordUserId', data.playerId).firstOrFail()

        const staffConnexion = await StaffConnexion.create({
            playerId: player.id
        })

        await WebsocketManager.send(ToType.DISCORD, JSON.stringify({
            type: OpCodes.STAFF_CONNEXION_CREATED,
            data: {
                player: player
            }
        }))

        setTimeout(async () => {
            await staffConnexion.delete()
        })

        return response.status(200).json({
            message: 'Staff connexion created',
            staffConnexion: staffConnexion
        })
    }

    public async delete({ params, response }: HttpContextContract) {
        const player = await Player.query().where('minecraftUuid', params.id).orWhere('discordUserId', params.id).firstOrFail()
        const staffConnexion = await StaffConnexion.query().where('playerId', player.id).firstOrFail()

        await WebsocketManager.send(ToType.MINECRAFT, JSON.stringify({
            type: OpCodes.STAFF_CONNEXION_SUCCESS,
            data: {
                player: player
            }
        }))

        await staffConnexion.delete()

        return response.status(200).json({
            message: 'Staff connexion deleted'
        })
    }
}
