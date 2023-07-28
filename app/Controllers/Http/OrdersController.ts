import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Order from "App/Models/Order";
import {OrderStoreValidator, OrderUpdateValidator} from "App/Validators/OrderValidator";

export default class OrdersController {
    public async index({response}: HttpContextContract) {
        // @ts-ignore
        const orders = await Order.query().preload('offers')

        return response.status(200).json({
            message: "Orders fetched.",
            orders: orders
        })
    }

    public async store({request, response}: HttpContextContract) {
        const data = await request.validate(OrderStoreValidator)
        // @ts-ignore
        const order = await Order.create(data)

        return response.status(200).json({
            message: "Order created !",
            order: order
        });
    }

    public async show({params, response}: HttpContextContract) {
        // @ts-ignore
        const order = await Order.query().where('id', params.id).first()

        return response.status(200).json({
            message: "Order fetched.",
            order: order
        });
    }

    public async update({params, request, response}: HttpContextContract) {
        const data = await request.validate(OrderUpdateValidator)
        const order = await Order.query().where('id', params.id).first()

        // @ts-ignore
        await order?.merge(data).save()

        return response.status(200).json({
            message: "Order updated !",
            order: order
        });
    }

    public async destroy({params, response}: HttpContextContract) {
        // @ts-ignore
        const order = await Order.query().where('id', params.id).first()

        await order?.merge({
            isClosed: true
        }).save()

        return response.status(200).json({
            message: "Order deleted !"
        });
    }
}
