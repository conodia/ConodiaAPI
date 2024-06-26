import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('email', 255).notNullable().unique()
      table.boolean('email_verified').defaultTo(false)
      table.string('password', 180).notNullable()
      table.string('username', 255).notNullable().unique()
      table.string('role').defaultTo('member')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
   this.schema.dropTable(this.tableName)
  }
}
