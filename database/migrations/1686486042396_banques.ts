import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'banques'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.string("user_id").notNullable()
            table.integer("money").notNullable()
            table.integer("money_total").notNullable()

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
