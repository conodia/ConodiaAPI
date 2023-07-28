import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'offers'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('id').primary()
            table.string("offer")
            table.string("comment")
            table.string("user_id") // the discord user id
            table.boolean("is_accepted").defaultTo(false)
            table.string("order_id")
            table.foreign("order_id").references("id").inTable("orders").onDelete("CASCADE")


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
