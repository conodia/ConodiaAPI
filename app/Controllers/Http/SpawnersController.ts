import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SpawnerValidator from "App/Validators/SpawnerValidator";
import Spawner from "App/Models/Spawner";
import Player from "App/Models/Player";
import Location from "App/Models/Location";

export default class SpawnersController {
    public async create({ request, response, params }: HttpContextContract) {
        const data = await request.validate(SpawnerValidator);
        const player = await Player.query().where('minecraftUuid', params.id).firstOrFail();
        const spawner = await player.related("spawners").create({
            ...data,
            playerId: player.id,
        });

        return response.status(200).json({
            message: "Spawner created.",
            spawner: spawner
        })
    }

    public async update({ params, request, response }: HttpContextContract) {
        const spawner = await Spawner.query().where('id', params.id).preload("location").firstOrFail();
        const data = await request.validate(SpawnerValidator)

        if(data.location === undefined || data.location === null) {
            await spawner.location.delete()
        } else {
            if(spawner.location !== null) {
                await spawner.location.merge({
                    ...data.location,
                }).save()
            } else {
                const location = await Location.create({
                    ...data.location,
                })

                await spawner.related("location").associate(location)
            }
        }


        await spawner.merge({
            ...data,
        }).save()

        return response.status(200).json({
            message: "Spawner updated.",
            spawner: spawner
        })
    }

    public async delete({ params, response }: HttpContextContract) {
        const spawner = await Spawner.query().where('id', params.id).firstOrFail();

        await spawner.delete()

        return response.status(200).json({
            message: "Spawner deleted.",
            spawner: spawner
        })
    }

    public async show({ params, response }: HttpContextContract) {
        const spawner = await Spawner.query().where('id', params.id).firstOrFail();

        return response.status(200).json({
            message: "Spawner found.",
            spawner: spawner
        })
    }

    public async showByCoords({ params, response }: HttpContextContract) {
        // url: /api/spawners/coords/:x/:y/:z/:world
        const spawner = await Spawner.query().whereHas("location", (query) => {
            query.where("x", params.x).where("y", params.y).where("z", params.z).where("world", params.world)
        }).first()

        if (!spawner) {
            return response.status(404).json({
                message: "Spawner not found."
            })
        }

        return response.status(200).json({
            message: "Spawner found.",
            spawner: spawner
        })
    }
}
