import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import SanctionValidator from "App/Validators/SanctionValidator";
import Sanction from "App/Models/Sanction";
import Player from "App/Models/Player";
import WebsocketManager, {ToType} from "App/Services/WebsocketManager";
import {OpCodes} from "App/Codes/OpCodes";

export default class SanctionsController {
  public async index({response}: HttpContextContract) {
    const sanctions = await Sanction.query().where('isActive', true)
    return response.ok({
      sanctions: sanctions
    })
  }

  public async showHistory({ response, params }: HttpContextContract) {
    const sanctions = await Sanction.query().where('playerName', params.id)
    return response.ok({
      sanctions: sanctions
    })
  }

  public async create({request, response}: HttpContextContract) {
    const data = await request.validate(SanctionValidator)
    // @ts-ignore
    const sanction = await Sanction.create(data)
    const player = await Player.query().where('minecraftPlayername', data.playerName).first()

    if (player) {
      await WebsocketManager.send(ToType.DISCORD, JSON.stringify({
        type: OpCodes.SANCTION_CREATED,
        data: {
          player: player,
          sanction: sanction
        }
      }))
    }

    return response.created({
      message: 'Sanction created',
      sanction: sanction
    })
  }

  public async delete({params, response}: HttpContextContract) {
    const sanction = await Sanction.query().where('id', params.id).andWhere('type', params.type).andWhere('isActive', true).firstOrFail()
    await sanction.merge({
      isActive: false,
    }).save()

    return response.ok({
      message: 'Sanction deleted'
    })
  }
}
