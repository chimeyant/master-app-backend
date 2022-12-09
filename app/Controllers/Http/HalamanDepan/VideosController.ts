import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Video from 'App/Models/Video'
import VideoValidator from 'App/Validators/HalamanDepan/VideoValidator';

export default class VideosController {
  public async index({}: HttpContextContract) {
    const videos = await Video.query().orderBy('id','desc')

    const datas:{}[]=[]

    videos.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['name']= element.name
      row['video']= element.videoUrl
      datas.push(row)
    });

    return datas;
  }

  public async create({}: HttpContextContract) {}

  public async store({request, response}: HttpContextContract) {
    const {name,description, video_url} = request.all()

    await request.validate(VideoValidator)

    try {
      const video = new Video
      video.name = name
      video.description = description
      video.videoUrl = video_url
      await video.save()

      return response.status(200).json({
        code:200,
        success:true,
        response:{
          message:"Proses tambah video berhasil",
          data:video.dataview
        }
      })
    } catch (error) {
      return response.status(500).json({
        code:500,
        success: false,
        response:{},
        errors:error
      })
    }
  }

  public async show({params}: HttpContextContract) {
    const {id}= params
    const video = await Video.findBy('uuid', id)

    return video?.dataview;

  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request, response}: HttpContextContract) {
    const {id}  = params
    const {name, description, video_url} = request.all()

    await request.validate(VideoValidator)

    try {
      const video = await Video.findBy('uuid', id)
      video?.merge({name:name, description:description, videoUrl:video_url})
      await video?.save()

      return response.json({
        success:true ,
        code:200,
        response:{
          message:"Proses ubah data berhasil",
          data: video?.dataview
        }
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

  public async destroy({params, response}: HttpContextContract) {
    const {id}= params

    try {
      const video = await Video.findBy("uuid", id)
      await video?.delete()

      return response.status(200).json({
        success:true,
        code: 200,
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

  public async showLatestVideo({}:HttpContextContract){
    const video = await Video.query().orderBy("id", "desc").first()

    return video;
  }

  public async showVideos({}:HttpContextContract){
    const videos = await Video.query().limit(4).orderBy('id',"desc")

    return videos;
  }
}
