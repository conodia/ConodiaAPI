import {schema, CustomMessages} from '@ioc:Adonis/Core/Validator'
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
    })

    public messages: CustomMessages = {}
}

