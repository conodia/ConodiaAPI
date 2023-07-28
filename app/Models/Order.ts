import {DateTime} from 'luxon'
import {BaseModel, beforeCreate, column, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Offer from "App/Models/Offer";

export default class Order extends BaseModel {
    @column({isPrimary: true})
    public id: string

    @column()
    public channelId: string

    @column()
    public precisedType: string

    @column()
    public userId: string

    @column()
    public firstMessageId: string

    @column()
    public offerMessageId: string

    @column()
    public offerMessageFreelancerId: string

    @column()
    public transcript: string // todo remove this to transcript and do an beautiful transcript

    @column()
    public isClosed: boolean

    @column()
    public budget: string

    @column()
    public price: number

    @column()
    public deadline: string

    @column()
    public description: string

    @column()
    public isStarted: boolean // si le ticket est commencé ou non (si un freelancer a accepté la commande)

    @column()
    public busies: string // les id des freelancers qui sont occupés sur cette commande

    @manyToMany(() => Offer)
    public offers: ManyToMany<typeof Offer>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime

    @beforeCreate()
    public static async generateId(order: Order) {
        // transform id to 0001, 0002, etc.
        let lastOrder = await Order.query().orderBy('id', 'desc').first()
        if (lastOrder) {
            let lastId = parseInt(lastOrder.id)
            order.id = (lastId + 1).toString().padStart(4, '0')
        } else {
            order.id = '0001'
        }
    }
}
