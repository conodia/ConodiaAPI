import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {InviteModifyValidator, InviteStoreValidator} from "App/Validators/InviteValidator";
import Invite from "App/Models/Invite";
import InvitedUser from "App/Models/InvitedUser";

export default class InvitesController {

    public async index({ response }: HttpContextContract) {
        const invites = await Invite.query().preload('invitedUsers')

        return response.status(200).json({
            message: "Invites fetched.",
            invites: invites
        })
    }

    public async store({request, response}: HttpContextContract) {
        // @ts-ignore
        const data = request.validate(InviteStoreValidator)

        const invite = await Invite.create({
            ...data,
            userId: request.input("user_id"),
        })

        return response.status(200).json({
            message: "Invite created.",
            invite: invite
        })
    }

    public async addInvite({request, response, params}: HttpContextContract) {
        // @ts-ignore
        let invite = await Invite.query().where('userId', params.id).first()

        if (!invite) {
            return response.status(305).json({
                "message": "Invite not found."
            })
        }

        const user = await InvitedUser.query().where('userId', request.input('userId')).first()

        if (user == null) {
            await invite.related('invitedUsers').create({
                userId: request.input('userId'),
                inviteId: invite.id,
            })
        }

        invite.actual++
        invite.total++
        await invite.save()

        return response.status(200).json({
            message: "Invite edited.",
            invite: invite
        })
    }

    public async removeInvite({ response, params }: HttpContextContract) {
        // @ts-ignore
        let invite = await Invite.query().where('userId', params.id).first()

        if (!invite) {
            return response.status(305).json({
                "message": "Invite not found."
            })
        }

        const users = invite.related('invitedUsers').query()
        const user = await users.where('userId', params.userId).first()

        await user?.delete()
        await invite.merge({
            actual: invite.actual - 1,
            leaves: invite.leaves + 1,
        }).save()

        return response.status(200).json({
            message: "Invite edited.",
            invite: invite
        })
    }

    public async edit({ params, request, response }: HttpContextContract){
        // @ts-ignore
        let invite = await Invite.query().where('userId', params.id).first()

        if (!invite) {
            return response.status(305).json({
                "message": "Invite not found."
            })
        }

        const data = await request.validate(InviteModifyValidator)
        invite = await invite.merge(data).save()

        return response.status(200).json({
            message: "Invite edited.",
            invite: invite
        })
    }

    public async reset({ response }: HttpContextContract) {
        await Invite.query().delete()

        return response.status(200).json({
            message: "Invites reseted."
        })
    }
}