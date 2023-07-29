import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'invites'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.string('user_id').notNullable()
            table.string('guild_id').notNullable()
            table.integer('total').defaultTo(0)
            table.integer('actual').defaultTo(0)
            table.integer("leaves").defaultTo(0)
            table.integer("bonus").defaultTo(0)

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
