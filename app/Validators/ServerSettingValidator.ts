import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServerSettingValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    maintenanceMode: schema.enum(['staff', 'op', 'none'] as const),
    maintenanceMessage: schema.string({ trim: true }),
  })

  public messages: CustomMessages = {}
}

export class EmergencyRequestValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({

  })

  public messages: CustomMessages = {}
}
