import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FactionLevel from 'App/Models/FactionLevel'
import FactionLevelValidator from 'App/Validators/FactionLevelValidator'

export default class FactionLevelsController {
  public async index({ response }: HttpContextContract) {
    const factionLevels = await FactionLevel.all()

    return response.json({
      factions: factionLevels
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const factionLevel = await FactionLevel.findOrFail(params.id)

    return response.json(factionLevel)
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(FactionLevelValidator)
    const factionLevel = await FactionLevel.create(data)

    return response.json(factionLevel)
  }

  
  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(FactionLevelValidator)
    const factionLevel = await FactionLevel.findOrFail(params.id)
    await factionLevel.merge(data).save()

    return response.json(factionLevel)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const factionLevel = await FactionLevel.findOrFail(params.id)
    await factionLevel.delete()

    return response.json({ message: "Faction level deleted" })
  }
}
