import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Ticket extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public type: string

    @column()
    public userId: string

    @column()
    public firstMessageId: string

    @column()
    public channelId: string

    @column()
    public messages: string

    @column()
    public isClosed: boolean

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
