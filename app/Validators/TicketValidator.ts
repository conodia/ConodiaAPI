import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class TicketStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    channelId: schema.string(),
    type: schema.string(),
    userId: schema.string(),
    firstMessageId: schema.string(),
    isClosed: schema.boolean(),
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
