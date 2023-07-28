import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'orders'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('id').notNullable().primary()
            table.string('channel_id').notNullable()
            table.string('precised_type').notNullable()
            table.string('user_id').notNullable()
            table.string('first_message_id').notNullable()
            table.string('offer_message_id').notNullable()
            table.string('offer_message_freelancer_id').notNullable()
            table.text('messages').notNullable().defaultTo('[]')
            table.boolean('is_closed').notNullable().defaultTo(false)
            table.boolean('is_started').notNullable().defaultTo(false)
            table.integer('price').notNullable().defaultTo(0)
            table.string('budget').defaultTo("No budget provided.")
            table.string('deadline').notNullable().defaultTo('No deadline provided.')
            table.string('description').notNullable().defaultTo('No description provided.')
            table.text('busies').notNullable().defaultTo('[]')

            /**
             * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
             */
            table.timestamp('created_at', {useTz: true})
            table.timestamp('updated_at', {useTz: true})
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
