import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ticket from "App/Models/Ticket";
import TicketStoreValidator from "App/Validators/TicketValidator";

export default class TicketsController {
    public async index({response}: HttpContextContract) {
        // @ts-ignore
        const tickets = await Ticket.query()

        return response.status(200).json({
            message: "Tickets fetched.",
            tickets: tickets
        })
    }

    public async store({request, response}: HttpContextContract) {
        const data = await request.validate(TicketStoreValidator)
        const ticket = await Ticket.create(data)

        return response.status(200).json({
            message: "Ticket created !",
            ticket: ticket
        });
    }

    public async destroy({ params, response }: HttpContextContract) {
        const ticket = await Ticket.query().where('id', params.id).first()

        await ticket?.delete()
        return response.status(200).json({
            message: "Ticket deleted !",
            ticket: ticket
        });
    }
}
