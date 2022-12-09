import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import HotelValidator from 'App/Validators/MasterData/HotelValidator';

export default class HotelsController {
  public async index({}: HttpContextContract) {
    const hotels = await Hotel.query().orderBy('name','asc')

    const datas:{}[]=[]

    hotels.forEach(element => {
      const row= {}
      row['id']= element.uuid
      row['name']= element.name
      row['address']= element.address
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name, description, address, video_url, foto_files,website,lat,lng}= request.all()

    await request.validate(HotelValidator)

    try {
      const hotel = new Hotel()
      hotel.name = name
      hotel.description = description
      hotel.address = address
      hotel.videoUrl= video_url
      hotel.fotoFiles = JSON.stringify( foto_files)
      hotel.website = website
      hotel.lat = lat
      hotel.lng = lng
      await hotel.save()

      return response.json({
        code:200,
        success: true,
        response:{
          message:"Proses tambah hotel berhasil"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code :501,
        success:false,
        response:{
          message:null
        },
        errors:{
          message:error[0].message
        }
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const{id}= params

    const hotel = await Hotel.findBy('uuid',id)

    const data={}
    data['id']= hotel?.uuid
    data['name']= hotel?.name
    data['description']= hotel?.description
    data['address']= hotel?.address
    data['video_url']= hotel?.videoUrl
    data['foto_files']= hotel?.fotoFiles
    data['website']= hotel?.website
    data['lat']= hotel?.lat
    data['lng']= hotel?.lng

    return data;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params,request,response}: HttpContextContract) {
    const {id}= params
    const {name, description, address, video_url, foto_files,website,lat,lng}= request.all()

    await request.validate(HotelValidator)

    try {
      const hotel = await Hotel.findBy("uuid",id)
      hotel?.merge({name:name, description:description, address:address,videoUrl:video_url, fotoFiles:JSON.stringify(foto_files),website:website,lat:lat,lng:lng})

      await hotel?.save()

      return response.json({
        code:200,
        success: true,
        response:{
          message:"Proses ubah hotel berhasil"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code :501,
        success:false,
        response:{
          message:null
        },
        errors:{
          message:error[0].message
        }
      })
    }
  }

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params
    try {
      const hotel = await Hotel.findBy("uuid",id)
      await hotel?.delete()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses hapus data berhasil...!"
        }
      })
    } catch (error) {
      return response.status(501).json({
        code : 501,
        success:false,
        errors:{
          message:error[0].message
        }
      })
    }
  }
}
