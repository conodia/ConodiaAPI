import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServerSetting from "App/Models/ServerSetting";
import ServerSettingValidator from "App/Validators/ServerSettingValidator";
import WebsocketManager, { ToType } from 'App/Services/WebsocketManager'
import { OpCodes } from 'App/Codes/OpCodes'
const execSync = require('child_process').execSync;

export default class ServerSettingsController {
  public async index({ response }: HttpContextContract) {
    const settings = await ServerSetting.firstOrFail()
    return response.json(settings)
  }

  public async update({ request, response }: HttpContextContract) {
    const settings = await ServerSetting.firstOrFail()
    const data = await request.validate(ServerSettingValidator)
    await settings.merge(data).save()
    return response.json(settings)
  }

  public async requestEmergencyMc({ response }: HttpContextContract) {
    const settings = await ServerSetting.firstOrFail()
    await settings.merge({
      requestedEmergency: true
    }).save()

    await WebsocketManager.send(ToType.DISCORD, JSON.stringify({
      type: OpCodes.REQUEST_EMERGENCY,
      data: {}
    }))

    setTimeout(async () => {
      if (settings.requestedEmergency && !settings.isEmergency) {
        await settings.merge({
          requestedEmergency: false
        }).save()
      }
    }, 300000) // 5 minutes

    return response.json(settings)
  }

  public async requestEmergencyDiscord({ response, params }: HttpContextContract) {
    const settings = await ServerSetting.firstOrFail()

    await settings.merge({
      isEmergency: params.id === 'true',
      requestedEmergency: false
    }).save()

    await WebsocketManager.send(ToType.MINECRAFT, JSON.stringify({
      type: OpCodes.EMERGENCY,
      data: {
        isEmergency: params.id === 'true',
        message: 'Le serveur est en état d\'urgence, merci de ne pas le rejoindre pour le moment.'
      }
    }))

    if (params.shutdown) {
      const output = execSync('shutdown -h now', { encoding: 'utf-8' });  // the default is 'buffer'
      console.log('Output was:\n', output);
    }

    return response.json(settings)
  }
}
