import {DateTime} from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Player from "App/Models/Player";

export default class Sanction extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public type: SanctionType

    @column()
    public reason: string | null

    @column()
    public duration: DateTime | null

    @column()
    public ip: string | null

    @column()
    public isRevoked: boolean // Si la sanction est terminée ou non (par default false)

    @column()
    public authorId: string

    @belongsTo(() => Player)
    public author: BelongsTo<typeof Player>

    @column()
    public playerId: string

    @belongsTo(() => Player)
    public player: BelongsTo<typeof Player>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime
}

export enum SanctionType {
    BAN = 'ban',
    IP_BAN = 'ip_ban',
    MUTE = 'mute',
    IP_MUTE = 'ip_mute',
    KICK = 'kick',
    WARN = 'warn',
}