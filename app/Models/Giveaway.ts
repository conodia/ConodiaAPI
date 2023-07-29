import { DateTime } from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Giveaway extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public lot: string

  @column()
  public timestampStart: bigint

  @column()
  public timestampEnd: bigint

  @column()
  public maxWinner: number

  @column()
  public channelId: string

  @column()
  public messageId: string

  @column()
  public members: string[]

  @column()
  public isActive: boolean

  @column()
  public buttonId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
