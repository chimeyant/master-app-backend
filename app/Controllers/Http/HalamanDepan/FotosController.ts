import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Foto from 'App/Models/Foto'
import FotoValidator from 'App/Validators/HalamanDepan/FotoValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class FotosController {
  public async index({}: HttpContextContract) {
    const fotos = await Foto.query().orderBy('id','desc')

    const datas:{}[]=[]

    fotos.forEach(async element => {
      const row ={}
      row['id']=element.uuid
      row['name']= element.name
      row['foto']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/gallery/"+ element?.filename)
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response }: HttpContextContract) {
    const {name,description, filename}= request.all()

    await request.validate(FotoValidator)

    try {
      const foto = new Foto
      foto.name = name
      foto.description = description
      foto.filename = filename
      await foto.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses tambah foto berhasil..!",
          data: {
            id:foto.uuid,
            name: foto.name,
            foto: Env.get("BASE_URL")+ await Drive.getSignedUrl("images/gallery/" + foto.filename)
          }
        },
        errors:[]
      })
    } catch (error) {
      return response.status(500).json({
        success:false,
        code:500,
        response:{

        },
        errors:error
      })
    }

  }

  public async show({params}: HttpContextContract) {
    const {id}= params


      const foto = await Foto.findBy('uuid', id)
      const data ={}
      data['id']= foto?.uuid
      data['name']= foto?.name
      data['description']= foto?.description
      data['filename']= foto?.filename
      data['foto']= Env.get("BASE_URL")+ await Drive.getSignedUrl("images/gallery/" + foto?.filename)
      return data;

  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {

  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const foto = await Foto.findBy('uuid',id)
      await foto?.delete()
      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus data berhasil...!",
          data:{
            id:id
          }
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
}
