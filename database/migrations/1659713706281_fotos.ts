import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Fotos extends BaseSchema {
  protected tableName = 'fotos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')
      table.string('name')
      table.string('description',255).nullable
      table.string('filename').nullable()

      table.timestamp('deleted_at',{useTz:true}).nullable()

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
