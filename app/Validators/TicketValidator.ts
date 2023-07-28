import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TicketStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id: schema.string(),
    type: schema.string(),
    userId: schema.string(),
    firstMessageId: schema.string()
  })

  public messages: CustomMessages = {}
}
