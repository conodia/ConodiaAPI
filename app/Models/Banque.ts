import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Banque extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public userId: string

    @column()
    public money: number

    @column()
    public moneyTotal: number

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
