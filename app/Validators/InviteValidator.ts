import {schema, CustomMessages} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class InviteStoreValidator {
    constructor(protected ctx: HttpContextContract) {
    }

    public schema = schema.create({
       // user_id: schema.string(),
        actual: schema.number.optional(),
        total: schema.number.optional(),
        bonus: schema.number.optional(),
        leaves: schema.number.optional(),
        users: schema.string.optional(),
        userId: schema.string(),
    })

    public messages: CustomMessages = {}
}

export class InviteModifyValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        actual: schema.number.optional(),
        total: schema.number.optional(),
        bonus: schema.number.optional(),
        leaves: schema.number.optional(),
        users: schema.string.optional(),
    })

    public messages: CustomMessages = {}
}

