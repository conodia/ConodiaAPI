import {DateTime} from 'luxon'
import {BaseModel, column, BelongsTo, belongsTo, beforeCreate, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Job from "App/Models/Job";
import Spawner from "App/Models/Spawner";

export default class Player extends BaseModel {
    @column({isPrimary: true})
    public id: string

    @column()
    public discordUserId: string | null

    @column()
    public discordUsername: string | null

    @column()
    public minecraftPlayername: string

    @column()
    public minecraftUuid: string

    @column()
    public verified: boolean

    @column()
    public ip: string | null

    @belongsTo(() => Job)
    public job: BelongsTo<typeof Job>

    @manyToMany(() => Spawner)
    public spawners: ManyToMany<typeof Spawner>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime

    @beforeCreate()
    public static async generateId(player: Player) {
        const patern = 'xxxxxxxx-xxxx-conodia-yxxx-xxxxxxxxxxxx';
        player.id = patern.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
