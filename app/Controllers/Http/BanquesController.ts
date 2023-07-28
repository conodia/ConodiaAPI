import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {BanqueStoreValidator, BanqueUpdateValidator} from "App/Validators/BanqueValidator";
import Banque from "App/Models/Banque";

export default class BanquesController {
    public async index({ response }: HttpContextContract) {
        const banques = await Banque.query()

        return response.status(200).json({
            message: "Banque users found",
            banques: banques
        })
    }
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(BanqueStoreValidator)
        const banque = await Banque.create({
            ...data,
            moneyTotal: data.money
        })

        return response.status(200).json({
            message: "Banque user created successfully",
            banque: banque
        })
    }

    public async show({ params, response }: HttpContextContract) {
        const banque = await Banque.query().where('userId', params.id).firstOrFail()

        return response.status(200).json({
            message: "Banque user found",
            banque: banque
        })
    }

    public async add({ params, request, response }: HttpContextContract) {
        const data = await request.validate(BanqueUpdateValidator)
        const banque = await Banque.query().where('userId', params.id).firstOrFail()
        banque.money = data.money
        banque.moneyTotal += data.money
        await banque.save()

        return response.status(200).json({
            message: "Banque user updated successfully",
            banque: banque
        })
    }

    public async remove({ params, request, response }: HttpContextContract) {
        const data = await request.validate(BanqueUpdateValidator)
        const banque = await Banque.query().where('userId', params.id).firstOrFail()
        banque.money = data.money
        await banque.save()

        return response.status(200).json({
            message: "Banque user updated successfully",
            banque: banque
        })
    }
}
