import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Job extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public jobs: JobsType

    @column()
    public playerId: string // minecraft uuid

    @column()
    public playerName: string // minecraft name

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}

type JobType = {
    level: number,
    xp: number,
}

type JobsType = {
    miner: JobType,
    woodcutter: JobType,
    farmer: JobType,
    hunter: JobType,
    builder: JobType,
}
