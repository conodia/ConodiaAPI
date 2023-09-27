import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
    protected tableName = 'players'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.string('id').primary()
            table.string('discord_user_id')
            table.string('discord_username')
            table.string('minecraft_playername')
            table.string('minecraft_uuid')
            table.boolean('verified').defaultTo(false)
            table.string('ip').nullable()

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
