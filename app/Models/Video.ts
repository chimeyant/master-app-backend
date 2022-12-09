import { DateTime } from 'luxon'
import {v4 as uuid} from "uuid"
import { BaseModel, column, beforeCreate, computed } from '@ioc:Adonis/Lucid/Orm'

export default class Video extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uuid:string

  @column()
  public name:string

  @column()
  public description:string

  @column()
  public videoUrl:string

  @column()
  public deletedAt:DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(video: Video){
    video.uuid = uuid()
  }

  @computed()
  public get dataview(){
    return {
      id:this.uuid,
      name:this.name,
      video:this.videoUrl,
      video_url:this.videoUrl,
      description: this.description
    }
  }



}
