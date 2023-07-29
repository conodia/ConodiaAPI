import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StaffConnexionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    playerId: schema.string(), // minecraft uuid
  })

  public messages: CustomMessages = {}
}
