import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class BlacklistStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    serverId: schema.string(),
    attemps: schema.number.optional(),
  })

  public messages: CustomMessages = {}
}
