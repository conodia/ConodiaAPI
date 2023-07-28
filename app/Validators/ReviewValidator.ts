import {CustomMessages, schema} from '@ioc:Adonis/Core/Validator'
import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export default class ReviewValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    stars: schema.number(),
    comment: schema.string.optional()
  })

  public messages: CustomMessages = {}
}
