import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Fitur from "App/Models/ManajemenFitur"
import I18n from '@ioc:Adonis/Addons/I18n'
import FiturValidator from 'App/Validators/Utility/FiturValidator'

export default class FitursController {
  public async index({}: HttpContextContract) {
    const fiturs = await Fitur.query().preload("user").orderBy('date_request','desc')

    let datas:{}[]=[]

    fiturs.forEach( element =>  {
      const row ={}
      row['id']= element.id
      row['pemohon']= element.user.name
      row['title']= element.title
      row['date_request']= I18n.locale("id").formatDate(element.dateRequest)
      row['date_progress']= element.dateProgress ?   I18n.locale("utc").formatDate(element.dateProgress) :null
      row['progress']= element.progress
      row['status'] = element.status == "1" ? {color:'grey', text:"Pengajuan"} : element.status == "2"? {color:'red', text:"Dalam Proses "}: {color:'green', text:"Selesai"}
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response, auth}: HttpContextContract) {
    const {title, content} = request.all()

    //validasi form
    await request.validate(FiturValidator)

    try {
      const user = await auth.user

      const fitur = new Fitur()
      fitur.title = title
      fitur.content = content
      fitur.userId = user? user.id : ""
      await fitur.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          status:true,
          message:"Proses pengajuan fitur berhasil"
        },
        errors:[]
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        response:{},
        errors:error
      })
    }
  }

  public async show({params, request, response}: HttpContextContract) {
    const {id}= params
    const fitur = await Fitur.findBy("id",id)
    return fitur;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}= params
    const data = request.only(['title','content'])

    await request.validate(FiturValidator)

    try {
      const fitur = await Fitur.findBy("id",id)
      fitur?.merge(data)
      await fitur?.save()

      return response.json({
        code:200,
        success:true,
        response:{
          status:true,
          message:"Proses ubah data berhasil.."
        }
      })
    } catch (error) {
      return response.status(501).json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async destroy({params, request,response}: HttpContextContract) {
    const {id}= params
    try {
      const fitur = await Fitur.findBy("id",id)
      await fitur?.delete()
      return response.json({
        code:200,
        success:true,
        response:{
          status:true,
          message:"Proses hapus data berhasil...!",
          data: {id:id}
        }
      })
    } catch (error) {
      return response.status(501).json({
        code:501,
        success:false,
        errors:error
      })
    }
  }

  public async setprogress({request, response}:HttpContextContract){
    const {id, progress}= request.all()
    try {
      const fitur = await Fitur.findOrFail(id)
      fitur.progress = progress
      fitur.date_progress = new Date()
      await fitur.save()



      return response.json({
        status:true,
        message:"Proses simpan progres berhasil"
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan " + error
      })
    }
  }

  public async setselesai({request,response}:HttpContextContract){
    const {id}= request.all()

    try {
      const fitur = await Fitur.findOrFail(id)
      fitur.progress = 100
      fitur.date_progress = new Date()
      fitur.status = "3"
      await fitur.save()

      return response.json({
        status:true,
        message:"Proses selesaikan progres berhasil"
      })

    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }
}
