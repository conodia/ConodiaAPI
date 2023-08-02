import {DateTime} from 'luxon'
import {BaseModel, column} from '@ioc:Adonis/Lucid/Orm'

export default class Sanction extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public type: SanctionType

    @column()
    public reason: string | null

    @column()
    public endTime: bigint | null

    @column()
    public startTime: bigint

    @column()
    public ip: string | null

    @column()
    public isActive: boolean // Si la sanction est terminée ou non (par default false)

    @column()
    public isPermanent: boolean // Si la sanction est permanente ou non (par default false)

    @column()
    public authorName: string

    @column()
    public playerName: string // player minecraft uuid

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