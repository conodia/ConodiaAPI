import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class BanqueStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    money: schema.number(),
  })

  public messages: CustomMessages = {}
}

export class BanqueUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    money: schema.number(),
  })

  public messages: CustomMessages = {}
}