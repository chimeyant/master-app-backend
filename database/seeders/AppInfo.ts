import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AppInfo from 'App/Models/AppInfo'

export default class AppInfoSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await AppInfo.createMany([
      {
        app_name:"Ant Apps Templates",
        app_ver:" Ver. 5",
        app_desc:"Aplikasi Templating",
        app_theme: "dark",
        app_color:"purple",
        app_logo:"logo.png",
        app_background: "bg.png",
        app_url: "http://localhost",
        app_company:"Antsoft Media",
        app_slogan: "Made With Love",
        app_address:"Tangerang, Indonesia",
      }
    ])
  }
}
