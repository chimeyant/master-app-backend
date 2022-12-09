import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Document from 'App/Models/Document'
import DocumentValidator from 'App/Validators/HalamanDepan/DocumentValidator';
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"

export default class DocumentsController {
  public async index({}: HttpContextContract) {
    const documents = await Document.query().orderBy('id', 'desc')

    const datas:{}[]=[]

    documents.forEach(async element => {
      const  row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['description']= element.description
      row['path']= Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/" + element?.filename)
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description,filename} = request.all()

    await request.validate(DocumentValidator)

    try {
      const document = new Document
      document.name = name
      document.description = description
      document.filename = filename
      await document.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses tambah dokumen berhasil..!",
          data: {
            id:document.uuid,
            name:document.name,
            description:document.description,
            path: Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ document.filename)
          },
          errors:[]
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

    const document = await Document.findBy("uuid", id)


    const data ={}
    data['id']= document?.uuid
    data['name']= document?.name
    data['description']= document?.description
    data['filename']= document?.filename

    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request, response}: HttpContextContract) {
    const {id}= params
    const {name, description, filename}= request.all()

    await request.validate(DocumentValidator)
    try {
      const document = await Document.findBy('uuid', id)
      document?.merge({name:name, description:description, filename:filename})
      await document?.save()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses ubah dokumen berhasil..!",
          data: {
            id:document?.uuid,
            name:document?.name,
            description:document?.description,
            path: Env.get("BASE_URL")+ await Drive.getSignedUrl("documents/"+ document?.filename)
          },
          errors:[]
        }
      })
    } catch (error) {
      return response.status(501).json({
        status:true,
        code:501,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const document = await Document.findBy("uuid",id)
      await document?.delete()

      return response.status(200).json({
        success:true,
        code:200,
        response:{
          message:"Proses hapus dokumen berhasil..!",
          data: {
            id:id
          },
          errors:[]
        }
      })

    } catch (error) {
      return response.status(501).json({
        code : 200,
        status:false,
        message:"Opps..., terjadi kesalahan " + error
      })
    }
  }

  public async showMedia({}:HttpContextContract){
    const documents = await Document.query().orderBy('id', 'desc')

    const datas:{}[]=[]

    documents.forEach(async element => {
      const  row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['description']= element.description
      row['path']= Env.get("BASE_URL")+ await Drive.getUrl("images/gallery") +"/"+ element?.filename
      datas.push(row)
    });

    return datas;
  }


}
