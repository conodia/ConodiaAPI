import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {SanctionType} from "App/Models/Sanction";

export default class SanctionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.enum(Object.values(SanctionType)),
    playerName: schema.string(),
    authorName: schema.string(),
    reason: schema.string.optional(),
    endTime: schema.number.optional(),
    startTime: schema.number.optional(),
    ip: schema.string.optional(),
    isActive: schema.boolean.optional(),
    isPermanent: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
