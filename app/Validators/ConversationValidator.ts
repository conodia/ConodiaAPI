import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class ConversationAnswerValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
            content: schema.string(),
            userId: schema.string()
    })
    public messages: CustomMessages = {}
}
