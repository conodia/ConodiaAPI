import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'websocket_clients'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('id').primary()
            table.string('name')
            table.string('secret')
            table.string('type')


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
