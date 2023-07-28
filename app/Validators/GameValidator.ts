import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class GameValidator {
    constructor(protected ctx: HttpContextContract) {
    }

    public schema = schema.create({
        name: schema.string({trim: true}),
        teams: schema.array().members(
            schema.object().members({
                name: schema.string({trim: true}),
                players: schema.array().members(schema.object().members({
                    name: schema.string({trim: true}),
                    uuid: schema.string({trim: true}),
                })),
            }),
        )
    })

    public messages: CustomMessages = {}
}

export class GameAddChannelValidator {
    constructor(protected ctx: HttpContextContract) {
    }

    public schema = schema.create({
        channels: schema.array().members(schema.string()), // ['channel1', 'channel2']
    })

    public messages: CustomMessages = {}
}

export class GameWinnersValidator {
    constructor(protected ctx: HttpContextContract) {
    }

    public schema = schema.create({
        teams: schema.array().members(
            schema.object().members({
                name: schema.string({trim: true}),
                isWinner: schema.boolean(),
                players: schema.array().members(schema.object().members({
                    name: schema.string({trim: true}),
                    uuid: schema.string({trim: true}),
                })),
            }),
        )
    })

    public messages: CustomMessages = {}
}



