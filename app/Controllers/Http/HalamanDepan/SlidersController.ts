import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Slider from "App/Models/Slider"
import SliderValidator from 'App/Validators/HalamanDepan/SliderValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class SlidersController {
  public async index({}: HttpContextContract) {
    const sliders = await Slider.query().select('uuid','title','status').orderBy('id','desc')

    const datas:{}[]=[]
    sliders.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['title']= element.title
      row['status']= element.status
      datas.push(row)
    });

    return datas
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const {title, subtitle, content, path,  status} = request.all()

    await request.validate(SliderValidator)

    try {
      const slider = new Slider()
      slider.title = title
      slider.subtitle = subtitle
      slider.content = content
      slider.path = path
      slider.status = status
      await slider.save()

      return response.status(200).json({
        succes:true,
        code:200,
        response:{
          message:"Proses tambah data berhasil",
          data: slider.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{},
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params
    const slider = await Slider.findBy('uuid',id)

    const data = {
      id: slider?.id,
      title: slider?.title,
      subtitle: slider?.subtitle,
      content: slider?.content,
      path:slider?.path,
      path_url: Env.get("BASE_URL")+ await Drive.getSignedUrl( "/images/sliders/"+ slider?.path),
      status: slider?.status,
    }

    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const {id} = params
    const {title, subtitle, content,path, status}= request.all()
    await request.validate(SliderValidator)

    try {
      const slider = await Slider.findBy('id',id)
      slider?.merge({title:title, subtitle:subtitle, content:content, path:path, status:status})
      await slider?.save()

      return response.json({
        success:true,
        code:200,
        response:{
          message:"Proses ubah data berhasil..!",
          data: slider?.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{},
        errors:error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const slider = await Slider.findBy('uuid',id)
      await slider?.delete()
      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus data berhasil...!",
          data: {
            id:id
          }
        },
        errors:[],
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{},
        errors:error
      })
    }

  }

  public async publish({}:HttpContextContract){
    const sliders = await Slider.query().where('status',true).orderBy('id','desc')

    const datas: {}[]=[];

    sliders.forEach(async (item)=>{
      const row ={}
      const url = await Drive.getSignedUrl("images/sliders/"+ item.path)
      row['id']= item.id
      row['title']= item.title
      row['subtitle']=item.subtitle
      row['content']= item.content
      row['path']= Env.get("BASE_URL") + url
      datas.push(row)
    })

    return datas;
  }
}
