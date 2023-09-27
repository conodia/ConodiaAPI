import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Job from "App/Models/Job";
import JobValidator from "App/Validators/JobValidator";
import Player from "App/Models/Player";

export default class JobsController {
    public async index({response}: HttpContextContract) {
      const jobs = await Job.query()

      return response.status(200).json({
        message: "Jobs fetched.",
        jobs: jobs
      })
    }

    public async create({request, response}: HttpContextContract) {
      const data = await request.validate(JobValidator)
      const job = await Job.firstOrCreate({
        playerId: data.playerId
      }, data)

      return response.status(200).json({
        message: "Job created.",
        job: job
      })
    }

    public async show({params, response}: HttpContextContract) {
      const player = await Player.query().where('discord_user_id', params.id).first()
      let job;

      if (player) {
        job = await Job.query().where('player_id', player.minecraftUuid).firstOrFail()
      } else {
        job = await Job.query().where('id', params.id).firstOrFail()
      }

      return response.status(200).json({
        message: "Job fetched.",
        job: job
      })
    }

    public async update({request, response, params}: HttpContextContract) {
      const job = await Job.query().where('id', params.id).firstOrFail()
      const data = await request.validate(JobValidator)

      await job.merge(data).save()

      return response.status(200).json({
        message: "Job updated.",
        job: job
      })
    }
}
