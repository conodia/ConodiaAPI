import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Player from "App/Models/Player";
import {PlayerUpdateValidator} from "App/Validators/PlayerValidator";

export default class PlayersController {
    public async index({response}: HttpContextContract) {
        const players = await Player.query()
        return response.status(200).json({
            message: "Players fetched.",
            players: players
        })
    }

    public async show({params, response}: HttpContextContract) {
        const player = await Player.query().where('id', params.id).orWhere('uuid', params.id).orWhere('discordUserId', params.id).first()

        if(!player) {
            return response.status(404).json({
                message: "Player not found."
            })
        }

        return response.status(200).json({
            message: "Player fetched.",
            player: player
        })
    }

    public async update({params, request, response}: HttpContextContract) {
        const player = await Player.query().where('id', params.id).orWhere('uuid', params.id).orWhere('discordUserId', params.id).first()

        if(!player) {
            return response.status(404).json({
                message: "Player not found."
            })
        }

        const data = await request.validate(PlayerUpdateValidator)

        await player.merge({
            ...data,
        }).save()

        return response.status(200).json({
            message: "Player updated.",
            player: player
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        const player = await Player.query().where('id', params.id).orWhere('uuid', params.id).orWhere('discordUserId', params.id).first()

        if(!player) {
            return response.status(404).json({
                message: "Player not found."
            })
        }

        await player.delete();
        return response.status(200).json({
            message: "Player deleted.",
        })
    }
}
