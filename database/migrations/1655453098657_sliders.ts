import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Sliders extends BaseSchema {
  protected tableName = 'sliders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.string('title')
      table.string('subtitle').nullable()
      table.string('content').nullable()
      table.string('path')
      table.boolean('status').defaultTo(false)


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('deleted_at',{useTz:true})
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
