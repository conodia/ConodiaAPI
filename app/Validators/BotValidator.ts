import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class BotStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string(),
    serverId: schema.string(),
    licence: schema.string(),
    id: schema.string()
  })

  public messages: CustomMessages = {}
}

export class BotUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string.optional(),
    serverId: schema.string.optional(),
    licence: schema.string.optional(),
    id: schema.string.optional()
  })

  public messages: CustomMessages = {}
}

