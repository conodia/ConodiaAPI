import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class OfferStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    offer: schema.string({trim: true}),
    comment: schema.string({trim: true}),
    userId: schema.string({trim: true}),
    isAccepted: schema.boolean.optional(),
  })

  public messages: CustomMessages = {}
}
