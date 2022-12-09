import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Axios from "axios"

export default class BeritasController {
  public async index({}: HttpContextContract) {

    const url = "https://tangerangkab.go.id/api/list-news"

    const datas:{}[] =[]

    try {
      let {data:{data}}= await Axios.get(url)

      let i = 0;
      data.forEach(element => {
        i++
        if(i <=4){
          const row ={}
          row['id']= element.id
          row['judul_berita']= element.judul_berita
          row['url_foto']= element.url_foto
          datas.push(row)
        }
      });

      return datas;
    } catch (error) {
      return []
    }


  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
