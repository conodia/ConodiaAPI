import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sanctions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
        table.increments('id')
        table.enum('type', ['ban', 'ip_ban', 'mute', 'ip_mute', 'kick', 'warn']).notNullable()
        table.string('reason').nullable()
        table.bigint('end_time').nullable()
        table.bigint('start_time').notNullable()
        table.string('ip').nullable()
        table.boolean('is_active').defaultTo(false)
        table.boolean('is_permanent').defaultTo(false)
        table.string('author_name')
        table.string('player_name')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
