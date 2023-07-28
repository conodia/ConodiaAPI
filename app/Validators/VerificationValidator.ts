import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class VerificationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    discordUserId: schema.string(),
    discordUsername: schema.string(),
  })

  public messages: CustomMessages = {
    "discordUserId.required": "You must provide a discord user id"
  }
}

export class VerificationVerifValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    uuid: schema.string(),
    playername: schema.string(),
    stats: schema.object.optional().members({
        elo: schema.number.optional(),
        wins: schema.number.optional(),
        losses: schema.number.optional(),
        kills: schema.number.optional(),
        deaths: schema.number.optional(),
        assists: schema.number.optional(),
        games: schema.number.optional(),
        kd: schema.number.optional(),
    })
  })

  public messages: CustomMessages = {
    "discordUserId.required": "You must provide a discord user id"
  }
}
