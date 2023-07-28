import type {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {websocket} from '../../../start/socket'
import {VerificationValidator, VerificationVerifValidator} from "App/Validators/VerificationValidator";
import Verification from "App/Models/Verification";
import Player from "App/Models/Player";
import {OpCodes} from "App/Codes/OpCodes";

export default class VerificationsController {

    public async create({request, response}: HttpContextContract) {
        const data = await request.validate(VerificationValidator)
        const verif = await Verification.query().where('discordUserId', data.discordUserId).first()

        if (verif) {
            return response.status(200).json({
                message: 'Verification code created, waiting for user to verify',
                verification: verif
            })
        }

        const code = this.makeCode(6)

        const verification = await Verification.create({
            code: code,
            discordUserId: data.discordUserId,
            discordUsername: data.discordUsername,
        })

        return response.status(200).json({
            message: 'Verification code created, waiting for user to verify',
            verification: verification
        })
    }

    public async isLink({response, params}: HttpContextContract) {
        const player = await Player.query().where('minecraftUuid', params.id).orWhere('discordUserId', params.id).first()
        if (!player) {
            return response.status(200).json({
                message: 'No player found',
                linked: false
            })
        }

        return response.status(200).json({
            message: 'Player found',
            linked: true,
            player: player
        })
    }

    public async verify({response, params, request}: HttpContextContract) {
        const verification = await Verification.query().where('code', params.id).first()
        const data = await request.validate(VerificationVerifValidator)

        if (!verification) {
            return response.status(401).json({
                message: 'Invalid verification code'
            })
        }

        websocket.io.clients.forEach((client) => {
            // @ts-ignore
            if (client.app.type == 'discord') {
                client.send(JSON.stringify({
                    type: OpCodes.VERIFIED_USER,
                    userId: verification.discordUserId,
                    playername: data.playername,
                    uuid: data.uuid
                }))
            }
        })

        const player = await Player.create({
            discordUserId: verification.discordUserId,
            discordUsername: verification.discordUsername,
            minecraftPlayername: data.playername,
            minecraftUuid: data.uuid,
            verified: true
        })

        await verification.delete()

        return response.status(200).json({
            message: 'User verified',
            player: player
        })
    }

    public async unlink({ response, params }: HttpContextContract) {
        const player = await Player.query().where('minecraftUuid', params.id).orWhere('discordUserId', params.id).first()

        if (!player) {
            return response.status(305).json({
                message: 'No player found'
            })
        }

        await player.delete();

        return response.status(200).json({
            message: 'Player unlinked'
        })
    }

    public makeCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
}