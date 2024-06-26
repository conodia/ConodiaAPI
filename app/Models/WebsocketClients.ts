import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class WebsocketClients extends BaseModel {
    @column({isPrimary: true})
    public id: string

    @column()
    public name: string

    @column()
    public secret: string

    @column()
    public type: 'discord' | 'minecraft'

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
