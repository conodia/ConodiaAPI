import {DateTime} from 'luxon'
import {BaseModel, beforeCreate, belongsTo, BelongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import * as crypto from "crypto";
import Order from "App/Models/Order";

export default class Offer extends BaseModel {
    @column({isPrimary: true})
    public id: string

    @column()
    public offer: string // L'offre (le prix proposé)

    @column()
    public comment: string // Le commentaire de l'utilisateur qui a proposé l'offre

    @column()
    public userId: string // L'ID de l'utilisateur qui a proposé l'offre

    @column()
    public isAccepted: boolean // Si l'offre a été acceptée ou non

    @column()
    public orderId: string

    @belongsTo(() => Order)
    public order: BelongsTo<typeof Order>

    @column.dateTime({autoCreate: true})
    public createdAt: DateTime

    @column.dateTime({autoCreate: true, autoUpdate: true})
    public updatedAt: DateTime

    @beforeCreate()
    public static async generateUuid(offer: Offer) {
        offer.id = crypto.randomBytes(6).toString('hex')
    }
}
