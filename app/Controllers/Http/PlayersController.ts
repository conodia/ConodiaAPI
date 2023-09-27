import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Player from "App/Models/Player";
import {PlayerUpdateValidator} from "App/Validators/PlayerValidator";

export default class PlayersController {
    public async index({response}: HttpContextContract) {
        const players = await Player.query().preload('spawners')
        return response.status(200).json({
            message: "Players fetched.",
            players: players
        })
    }

    public async create({request, response}: HttpContextContract) {
        const data = await request.validate(PlayerUpdateValidator)
        const player = await Player.create(data)
        return response.status(200).json({
            message: "Player created.",
            player: player
        })
    }

    public async show({params, response}: HttpContextContract) {
        let player = await Player.query().where('id', params.id).orWhere('minecraftUuid', params.id).orWhere('discordUserId', params.id).preload("spawners").first()
        if(!player) {
            return response.status(404).json({
                message: "Player not found.",
                exists: false
            })
        }
        // @ts-ignore
        player.spawners = await player.related("spawners").query().preload("location")

        return response.status(200).json({
            message: "Player fetched.",
            exists: true,
            player: player,
        })
    }

    public async update({params, request, response}: HttpContextContract) {
        const player = await Player.query().where('id', params.id).orWhere('minecraftUuid', params.id).orWhere('discordUserId', params.id).first()

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
        const player = await Player.query().where('id', params.id).orWhere('minecraftUuid', params.id).orWhere('discordUserId', params.id).first()

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
