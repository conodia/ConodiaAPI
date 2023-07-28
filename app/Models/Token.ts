import {DateTime} from 'luxon'
import {BaseModel, beforeCreate, column} from '@ioc:Adonis/Lucid/Orm'

export default class Token extends BaseModel {
    @column({isPrimary: true})
    public id: number

    @column()
    public type: string

    @column()
    public appId: string

    @column()
    public secret: string

    @column()
    public token: string

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime

    @beforeCreate()
    public static async generateToken(token: Token) {
        const patern = 'Bearer xxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
        token.token = patern.replace(/x/g, () => (Math.random() * 36 | 0).toString(36));
    }
}
