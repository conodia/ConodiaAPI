import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import UserSetting from "App/Models/UserSetting";
import {UserSettingStoreValidator, UserSettingUpdateValidator} from "App/Validators/UserSettingValidator";

export default class UserSettingsController {
    public async index({ response }: HttpContextContract) {
        const users = await UserSetting.query().preload('reviews')

        return response.json({
            message: "Find all users",
            users: users
        })
    }
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(UserSettingStoreValidator)
        const user = await UserSetting.create(data)

        return response.status(200).json({
            message: "User created",
            user: user
        })
    }
    public async update({ params, response, request }: HttpContextContract) {
        const data = await request.validate(UserSettingUpdateValidator)
        const user = await UserSetting.query().where('userId', params.id).firstOrFail()

        await user.merge(data).save()

        return response.status(200).json({
            message: "User updated",
            user: user
        })
    }
}
