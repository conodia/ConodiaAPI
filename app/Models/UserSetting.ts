import {DateTime} from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Review from "App/Models/Review";

export default class UserSetting extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public userId: string

    @column()
    public portofolio: string | null

    @column()
    public paypal: string | null

    @column()
    public timezone: string | null

    @manyToMany(() => Review)
    public reviews: ManyToMany<typeof Review>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
