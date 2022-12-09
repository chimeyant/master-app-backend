import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ManajemenFiturs extends BaseSchema {
  protected tableName = 'manajemen_fiturs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.string('title')
      table.string('content')
      table.timestamp('date_request').nullable()
      table.timestamp('date_progress').nullable()
      table.integer('progress').nullable()
      table.uuid('user_id').nullable()
      table.string('status').defaultTo("1")

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("deleted_at",{useTz:true})
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
