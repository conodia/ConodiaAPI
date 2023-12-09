import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'server_settings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // limit to 0 - 1
      table.enum('maintenance_mode', ['staff', 'op', 'none']).defaultTo('op')
      table.string('maintenance_message', 255).defaultTo('§cLe serveur est en maintenance.')
      table.boolean('requested_emergency').defaultTo(false)
      table.boolean('is_emergency').defaultTo(false)


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
