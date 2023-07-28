import {CustomMessages, rules, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class GiveawayStoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        id: schema.string([rules.unique({table: 'giveaways', column: 'id'})]),
        name: schema.string(),
        description: schema.string(),
        lot: schema.string(),
        timestampStart: schema.number(),
        timestampEnd: schema.number(),
        maxWinner: schema.number(),
        channelId: schema.string(),
        messageId: schema.string(),
        members: schema.string.optional(),
        isActive: schema.boolean(),
        buttonId: schema.string()
    })

    public messages: CustomMessages = {}
}

export class GiveawayUpdateValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        name: schema.string.optional(),
        members: schema.string.optional( { escape: true }),
        isActive: schema.boolean.optional(),
    })

    public messages: CustomMessages = {}
}
