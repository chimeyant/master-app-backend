import { DateTime } from 'luxon'
import { BaseModel,beforeCreate, column,computed} from '@ioc:Adonis/Lucid/Orm'
import {v4 as uuid} from "uuid"
let i =0;

export default class AppInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public app_name : string

  @column({serializeAs: "versi"})
  public app_ver:   string


  @column()
  public app_desc: string

  @column()
  public app_logo: string

  @column()
  public app_theme: string

  @column()
  public app_color: string

  @column()
  public app_background: string

  @column()
  public app_nav:string

  @column()
  public app_url:string

  @column()
  public app_company: string

  @column()
  public app_slogan : string

  @column()
  public app_address: string

  @column()
  public app_wa: string

  @column()
  public app_fb : string

  @column()
  public app_tw: string

  @column()
  public app_ig: string

  @column()
  public app_wa_service : string

  @column()
  public  app_wa_client_id: string

  @column()
  public app_wa_client_secret: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static createUUID(appinfo : AppInfo){
    appinfo.id = uuid()
  }

  @computed()
  public get nomor(){
    return i++ +1
  }


}
