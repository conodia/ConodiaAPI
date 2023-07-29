import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Player from "App/Models/Player";

export default class StaffConnexion extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public playerId: string

    @belongsTo(() => Player)
    public player: BelongsTo<typeof Player>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
