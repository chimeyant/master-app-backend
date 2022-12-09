import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import Lokasi from 'App/Models/Lokasi'
import Peserta from 'App/Models/Peserta'
import Wisata from 'App/Models/Wisata'

export default class HomeController {
  public async index({}: HttpContextContract){
    const jmlpeserta = await Peserta.query().where('status',true).getCount()

    //cari lokasi
    const maps:{}[] =[]

    const lokasis = await Lokasi.query().orderBy('id','asc')

    lokasis.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['position']= {lat: element.lat, lng: element.lng}
      row['tooltip']= "<h4>" + element.name + "</h4><div>"+ element.address +"</div>"
      row['icon']= "/images/lokasi.png"
      row['draggable']= false
      row['visible']= true

      maps.push(row)
    });

    const hotels = await Hotel.query().orderBy('id','asc')

    hotels.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['position']= {lat: element.lat, lng: element.lng}
      row['tooltip']= "<h4>" + element.name + "</h4><div>"+ element.address +"</div>"
      row['icon']= "/images/hotel.png"
      row['draggable']= false
      row['visible']= true

      maps.push(row)
    });

    const wisatas = await Wisata.query().orderBy('id','asc')

    wisatas.forEach(element => {
      const row ={}
      row['id']= element.uuid
      row['position']= {lat: element.lat, lng: element.lng}
      row['tooltip']= "<h4>" + element.name + "</h4><div>"+ element.address +"</div>"
      row['icon']= "/images/wisata.png"
      row['draggable']= false
      row['visible']= true

      maps.push(row)
    });

    const data ={
      jmlpeserta: jmlpeserta + "/700",
      maps:maps
    }

    return data;
  }
}


