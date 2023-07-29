import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Invite from "App/Models/Invite";

export default class InvitedUser extends BaseModel {
    @column({isPrimary: true})
    public id: string

    @column()
    public userId: string

    @column()
    public inviteId: number

    @belongsTo(() => Invite)
    public invite: BelongsTo<typeof Invite>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}
