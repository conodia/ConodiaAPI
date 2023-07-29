import {DateTime} from 'luxon'
import {BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import InvitedUser from "App/Models/InvitedUser";

export default class Invite extends BaseModel {

    @column({isPrimary: true})
    public id: number

    @column()
    public userId: string

    @column()
    public guildId: string

    @column()
    public total: number

    @column()
    public actual: number

    @column()
    public leaves: number

    @column()
    public bonus: number

    @manyToMany(() => InvitedUser)
    public invitedUsers: ManyToMany<typeof InvitedUser>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
