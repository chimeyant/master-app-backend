import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AppInfos extends BaseSchema {
  protected tableName = 'app_infos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string("app_name",255).notNullable()
      table.string("app_ver").nullable()
      table.string("app_desc").nullable()
      table.string("app_logo").nullable()
      table.string("app_theme").nullable()
      table.string("app_color").nullable()
      table.string("app_background").nullable()
      table.string("app_nav").nullable()
      table.string("app_url").nullable()
      table.string("app_company",255).nullable()
      table.string("app_slogan",255).nullable()
      table.string("app_address",255).nullable()
      table.string("app_wa",255).nullable()
      table.string("app_fb",255).nullable()
      table.string("app_tw",255).nullable()
      table.string("app_ig",255).nullable()
      table.string("app_wa_service",255).nullable()
      table.string("app_wa_client_id").nullable()
      table.string("app_wa_client_secret").nullable()
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
