import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AppInfo from "App/Models/AppInfo"
import AppInfoValidator from 'App/Validators/MasterData/AppInfoValidator'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"


export default class AppInfosController {
  public async index({}: HttpContextContract) {

    const appinfo = await AppInfo.query().first()
    const data = {}
    data['id']= appinfo?.id
    data['app_name']= appinfo?.app_name
    data['app_ver']= appinfo?.app_ver
    data['app_desc']= appinfo?.app_desc
    data['app_logo']= appinfo?.app_logo
    data['app_logo_path']= Env.get("NODE_ENV")=='development' ? Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps/" + appinfo?.app_logo) : Env.get("BASE_URL")+ await Drive.getSignedUrl('images/apps/'+ appinfo?.app_logo)
    data['app_theme']= appinfo?.app_theme
    data['app_color']=appinfo?.app_color
    data['app_background']= appinfo?.app_background
    data['app_background_path']= Env.get("NODE_ENV")== 'development'?  Env.get("BASE_URL") + await Drive.getSignedUrl("/images/apps/"+ appinfo?.app_background) : Env.get("BASE_URL") + await Drive.getUrl("images/apps/"+ appinfo?.app_background)
    data['app_nav']= appinfo?.app_nav
    data['app_nav_path']= Env.get("NODE_ENV")=='development'?  Env.get("BASE_URL") + await Drive.getSignedUrl( "/images/apps/"+  appinfo?.app_nav) : Env.get("BASE_URL")+ await Drive.getSignedUrl("images/apps"+ appinfo?.app_nav)
    data['app_url']= appinfo?.app_url
    data['app_company']= appinfo?.app_company
    data['app_slogan']= appinfo?.app_slogan
    data['app_address']= appinfo?.app_address
    data['app_wa']= appinfo?.app_wa

    return data;
  }

  public async create({

  }: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request,response}: HttpContextContract) {
    const {id}= params

    const data = request.only(['app_name','app_ver','app_desc',"app_theme","app_color","app_url","app_company","app_slogan","app_address","app_logo","app_nav","app_background","app_wa"])

    await request.validate(AppInfoValidator);

    try {
      const appinfo = await AppInfo.findBy("id",id)
      appinfo?.merge(data)
      await appinfo?.save()

      return response.json({
        status:true,
        message:"Proses ubah data berhasil"
      })

    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjdi kesalahan "+ error
      })
    }



  }

  public async destroy({}: HttpContextContract) {}
}
