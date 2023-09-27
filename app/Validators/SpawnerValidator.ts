import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpawnerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string(),
    level: schema.number(),
    isPremium: schema.boolean(),
    location: schema.object.optional().members({
      x: schema.number(),
      y: schema.number(),
      z: schema.number(),
      world: schema.string(),
    }),
  })

  public messages: CustomMessages = {}
}
