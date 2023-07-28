import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Order from "App/Models/Order";
import OfferStoreValidator from "App/Validators/OfferValidator";
import Offer from "App/Models/Offer";
import {schema} from "@ioc:Adonis/Core/Validator";

export default class OffersController {

    public async index({ response, params }: HttpContextContract) {
        const order = await Order.query().where('id', params.id).orWhere('channelId', params.id).first()
        const offers = await order?.related('offers').query()

        return response.status(200).json({
            message: "The offers has been found.",
            order: order,
            offers: offers,
        })
    }
    /// Create an offer
    /// {params} id: The order id (or channel id)
    public async store({ request, response, params }: HttpContextContract) {
        const data = await request.validate(OfferStoreValidator);

        const order = await Order.query().where('id', params.id).orWhere('channelId', params.id).first()

        if (!order) {
            return response.status(404).json({
                message: "The order in params doesn't exist yet.",
            })
        }

        const offer = await order.related('offers').create({
            ...data,
            orderId: order.id,
        })

        return response.status(200).json({
            message: "The offer has been created.",
            offer: offer,
        })
    }

    public async show({ response, params }: HttpContextContract) {
        const offer = await Offer.query().where('id', params.id).firstOrFail()
        const order= await offer.related('order').query().firstOrFail()

        return response.status(200).json({
            message: "The offer has been found.",
            offer: offer,
            order: order,
        })
    }

    public async accept({ response, params }: HttpContextContract) {
        const offer = await Offer.query().where('id', params.id).firstOrFail()
        const order = await offer.related('order').query().firstOrFail()

        if (order.isStarted) {
            return response.status(400).json({
                message: "The order is started.",
            })
        }

        await order.merge({
            isStarted: true,
        }).save()

        return response.status(200).json({
            message: "The offer has been accepted.",
            offer: offer,
            order: order,
        })
    }

    public async busy({ response, params, request }: HttpContextContract) {
        const data = await request.validate({
            schema: schema.create({
                userId: schema.string(),
            })
        });
        const order = await Order.query().where('id', params.id).orWhere('channelId', params.id).firstOrFail()

        if (order.isStarted) {
            return response.status(400).json({
                message: "The order is started.",
            })
        }

        const busieds = JSON.parse(order.busies)
        if (!busieds.includes(data.userId)) {
            busieds.push(data.userId)
            await order.merge({
                busies: JSON.stringify(busieds),
            }).save()
        }

        return response.status(200).json({
            message: "The user has been busied.",
            order: order,
            offers: await order.related('offers').query(),
        })
    }

    public async isBusied({ response, params }: HttpContextContract) {
        const order = await Order.query().where('id', params.id).orWhere('channelId', params.id).firstOrFail()
        const busieds = JSON.parse(order.busies)

        return response.status(200).json({
            message: "The user has been busied.",
            isBusied: busieds.includes(params.userId),
        })
    }

    public async destroy({ response, params }: HttpContextContract) {
        const offer = await Offer.query().where('id', params.id).firstOrFail()
        const order= await offer.related('order').query().firstOrFail()

        if (order.isStarted) {
            return response.status(400).json({
                message: "The order is started.",
            })
        }

        await offer.delete()

        return response.status(200).json({
            message: "The offer has been deleted.",
            offer: offer,
            order: order,
        })
    }

    /*
    *
    * [params] id: The order id (or channel id), userId: The user id ex: /orders/1/offers/as-offer/1
    *
    * */
    public async asOfferer({ response, params }: HttpContextContract) {
        const order = await Order.query().where('id', params.id).orWhere('channelId', params.id).firstOrFail()
        const isOfferer = await order.related('offers').query().where('userId', params.userId).first()

        if (!isOfferer) {
            return response.status(200).json({
                asOffer: false,
                message: "You are not an offerer.",
            })
        } else {
            return response.status(200).json({
                asOffer: true,
                message: "You are an offerer.",
            })
        }
    }
}
