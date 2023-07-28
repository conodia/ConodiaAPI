import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Review extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public userId: string

    @column()
    public stars: number // 1-5

    @column()
    public comment: string | null // comment is optional

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
