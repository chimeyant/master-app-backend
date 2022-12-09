import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {v4 as uuid} from "uuid"
import { column, beforeSave,beforeCreate, BaseModel, scope } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public uuid:string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public authent:string

  @column()
  public phone:string

  @column()
  public avatar:string

  @column()
  public status:boolean

  @column()
  public loUuid: string



  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async createUUID(user:User){
    user.id = uuid()
  }

  public static filterOn = scope((query, request)=>{
    const {search, sortBy, sortDesc} = request.only(['search','sortBy', 'sortDesc'])
    //const {search : string ,sortBy, sortDesc}= request.all();
    const qsortBy = sortBy? sortBy : 'name'
    const qsortDesc = sortDesc? 'desc': 'asc'

    query.select('id','name','email').whereNot("authent",'superadmin')



    if(search){
      query.whereRaw('lower(name) like ?',['%'+ search.toLowerCase()+'%'] );
    }

    query.orderBy(qsortBy,qsortDesc)

    return query;
  })


}
