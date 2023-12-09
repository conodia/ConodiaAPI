import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FactionLevelValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    factionName: schema.string(),
    xp: schema.number(),
    points: schema.number(),
  })

  public messages: CustomMessages = {}
}
