import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class JobValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    jobs: schema.object().members({
      miner: schema.object().members({
        level: schema.number(),
        xp: schema.number()
      }),
      woodcutter: schema.object().members({
        level: schema.number(),
        xp: schema.number()
      }),
      farmer: schema.object().members({
        level: schema.number(),
        xp: schema.number()
      }),
      hunter: schema.object().members({
        level: schema.number(),
        xp: schema.number()
      }),
      builder: schema.object().members({
        level: schema.number(),
        xp: schema.number()
      })
    }),
    playerId: schema.string(),
    playerName: schema.string()
  })

  public messages: CustomMessages = {}
}
