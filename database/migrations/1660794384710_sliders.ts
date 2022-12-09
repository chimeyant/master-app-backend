import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Name extends BaseSchema {
  protected tableName = 'sliders'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('content',500).alter()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
    })
  }
}
