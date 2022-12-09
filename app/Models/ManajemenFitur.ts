import { DateTime } from 'luxon'
import {v4 as uuid}from "uuid"
import { BaseModel, column, beforeCreate, belongsTo , BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class ManajemenFitur extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public title:string

  @column()
  public content:string

  @column.dateTime({autoCreate:true})
  public dateRequest:DateTime

  @column()
  public dateProgress:DateTime

  @column()
  public progress:number

  @column()
  public userId: string

  @column()
  public status:string

  @column()
  public deletedAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(manajemenFitur : ManajemenFitur){
    manajemenFitur.uuid = uuid()
  }

  @belongsTo(()=> User)
  public user: BelongsTo<typeof User>


}
