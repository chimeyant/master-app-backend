import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string("name",255).notNullable()
      table.string('email', 255).notNullable()
      table.string("authent", 100).nullable()
      table.string("avatar").nullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()
      table.uuid("google_id").nullable()
      table.string('phone').nullable()
      table.boolean('status')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("deleted_at",{useTz:true}).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
