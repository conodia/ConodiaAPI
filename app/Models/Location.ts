import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public x: number

  @column()
  public y: number

  @column()
  public z: number

  @column()
  public world: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
