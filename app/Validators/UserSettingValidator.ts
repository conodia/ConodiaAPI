import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class UserSettingStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    portofolio: schema.string.optional(),
    paypal: schema.string.optional(),
    timezone: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}

export class UserSettingUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    portofolio: schema.string.optional(),
    paypal: schema.string.optional(),
    timezone: schema.string.optional(),
  })

  public messages: CustomMessages = {}
}
