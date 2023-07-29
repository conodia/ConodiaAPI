import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'giveaways'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('name')
      table.string('description')
      table.string('lot')
      table.bigint('timestamp_start')
      table.bigint('timestamp_end')
      table.integer('max_winner')
      table.string('channel_id')
      table.string('message_id')
      table.text('members')
      table.boolean('is_active').defaultTo(true)
      table.string('button_id')

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
