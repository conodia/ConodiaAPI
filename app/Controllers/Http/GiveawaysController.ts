import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {GiveawayStoreValidator, GiveawayUpdateValidator} from "App/Validators/GiveawayValidator";
import Giveaway from "../../Models/Giveaway";

export default class GiveawaysController {
    public async index({ response }: HttpContextContract) {
        const giveaways = await Giveaway.query()

        return response.status(200).json({
            message: "Giveaways fetched.",
            giveaways: giveaways
        })
    }

    public async show({params, response}: HttpContextContract) {
        const giveaway = await Giveaway.query().where('id', params.id).firstOrFail()

        return response.status(200).json({
            message: "Giveaway fetch.",
            giveaway: giveaway
        })
    }

    public async store({request, response}: HttpContextContract) {
        const data = await request.validate(GiveawayStoreValidator)
        // @ts-ignore
        const giveaway = await Giveaway.create(data)

        return response.status(200).json({
            message: "Giveaway created !",
            giveaway: giveaway
        });
    }

    public async update({params, request, response}: HttpContextContract) {
        // @ts-ignore
        const giveaway = await Giveaway.query().where('id', params.id).first()

        if (!giveaway || !giveaway.isActive) {
            return response.status(305).json({
                message: "Giveaway not found."
            })
        }

        const data = await request.validate(GiveawayUpdateValidator)
        // @ts-ignore
        await giveaway.merge(data).save()

        return response.status(200).json({
            message: "Giveaway updated !",
            giveaway: giveaway
        })
    }

    public async addMember({params, request, response}: HttpContextContract) {
        // @ts-ignore
        const giveaway = await Giveaway.query().where('id', params.id).first()

        if (!giveaway || !giveaway.isActive) {
            return response.status(305).json({
                message: "Giveaway not found."
            })
        }

        let members = giveaway.members ? JSON.parse(giveaway.members.toString().replace("{", "[").replace("}", "]")) : []
        const member = request.body().memberId

        if (members.includes(member)) {
            return response.status(305).json({
                message: "Member already in giveaway."
            })
        }

        members.push(member)
        await giveaway.merge({members: members}).save()

        return response.status(200).json({
            message: "Member added !",
            giveaway: giveaway
        })
    }

    public async destroy({params, response}: HttpContextContract) {
        // @ts-ignore
        const giveaway = await Giveaway.query().where('id', params.id).first()

        if (!giveaway || !giveaway.isActive) {
            return response.status(305).json({
                message: "Giveaway not found."
            })
        }

        await giveaway.merge({
            isActive: false
        }).save()

        return response.status(200).json({
            message: "Giveaway deleted !",
            giveaway: giveaway
        })
    }
}
