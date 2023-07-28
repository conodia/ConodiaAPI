import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class OrderStoreValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        precisedType: schema.string(),
        channelId: schema.string(),
        userId: schema.string(),
        firstMessageId: schema.string(),
        offerMessageId: schema.string(),
        offerMessageFreelancerId: schema.string(),
        budget: schema.string.optional(),
        isClosed: schema.boolean.optional(),
        price: schema.number.optional(),
        deadline: schema.string.optional(),
        description: schema.string.optional(),
        isStarted: schema.boolean.optional(),
        messages: schema.array.optional().members(
            schema.object().members({
                id: schema.string(),
                content: schema.string(),
                userId: schema.string(),
                username: schema.string(),
            })
        )
    })

    public messages: CustomMessages = {}
}

export class OrderUpdateValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        id: schema.string(),
        globalType: schema.string.optional(),
        precisedType: schema.string.optional(),
        isClosed: schema.boolean.optional(),
        price: schema.number.optional(),
        deadline: schema.string.optional(),
        description: schema.string.optional(),
        isStarted: schema.boolean.optional(),
        messages: schema.array.optional().members(
            schema.object().members({
                id: schema.string(),
                content: schema.string(),
                userId: schema.string(),
                username: schema.string(),
            })
        )
    })

    public messages: CustomMessages = {}
}