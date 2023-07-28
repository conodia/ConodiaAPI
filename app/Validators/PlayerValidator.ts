import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class PlayerUpdateValidator {
    constructor(protected ctx: HttpContextContract) {
    }

    public schema = schema.create({
        discordUserId: schema.string.optional(),
        discordUsername: schema.string.optional(),
        minecraftPlayername: schema.string.optional(),
        minecraftUuid: schema.string.optional(),
        verified: schema.boolean.optional(),
        stats: schema.object.optional().members({
            elo: schema.number.optional(),
            wins: schema.number.optional(),
            loses: schema.number.optional(),
            kills: schema.number.optional(),
            deaths: schema.number.optional(),
            games: schema.number.optional(),
        }),
    })

    public messages: CustomMessages = {}
}

