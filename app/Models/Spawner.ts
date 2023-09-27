import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Player from "App/Models/Player";
import Location from './Location';

export default class Spawner extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public type: string

  @column()
  public level: number

  @belongsTo(() => Location)
  public location: BelongsTo<typeof Location>

  @column()
  public locationId: number

  @column()
  public isPremium: boolean

  @belongsTo(() => Player)
  public player: BelongsTo<typeof Player>

  @column()
  public playerId: string

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime
}
