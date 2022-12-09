import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from 'App/Models/Hotel'
import Lokasi from 'App/Models/Lokasi'
import Peserta from 'App/Models/Peserta'
import Wisata from 'App/Models/Wisata'

export default class DashboardController {
  async index({response}: HttpContextContract){
    const jmllokasi = await Lokasi.query().getCount()
    const jmlhotel = await Hotel.query().getCount()
    const jmlwisata = await Wisata.query().getCount()
    const jmlpeserta = await Peserta.query().where('status',true).getCount()
    const jmlkepaladaerah = await Peserta.query().where("jabatan",'kepala-daerah').getCount()
    const jmlkepaladaerahhadir = await Peserta.query().where("jabatan",'kepala-daerah').where('checked',true).getCount()
    const jmlsekda = await Peserta.query().where("jabatan",'sekretaris-daerah').getCount()
    const jmlsekdahadir = await Peserta.query().where("jabatan",'sekretaris-daerah').where('checked',true).getCount()
    const jmlkadis = await Peserta.query().where("jabatan",'kepala-dinas').getCount()
    const jmlkadishadir = await Peserta.query().where("jabatan",'kepala-dinas').where('checked',true).getCount()
    const jmllainnya = await Peserta.query().where("jabatan",'lainnya').getCount()
    const jmllainnyahadir = await Peserta.query().where("jabatan",'lainnya').where('checked',true).getCount()
    const jmlpesertahadir = await Peserta.query().where('checked', true).getCount()
    const jmldaerahadir = await Peserta.query().knexQuery.select('regency_uuid').where('checked',true).groupBy('regency_uuid')
    const jmldaerah =  await Peserta.query().knexQuery.select('regency_uuid').groupBy('regency_uuid')

    return response.json({
      jmllokasi : jmllokasi,
      jmlhotel : jmlhotel,
      jmlwisata: jmlwisata,
      jmlpeserta: jmlpeserta,
      jmlkepaladaerah: jmlkepaladaerahhadir + "/" + jmlkepaladaerah,
      jmlsekda: jmlsekdahadir + "/"+ jmlsekda ,
      jmlkadis : jmlkadishadir+ "/"+ jmlkadis,
      jmllainnya: jmllainnyahadir + "/"+ jmllainnya,
      jmlpesertahadir : jmlpesertahadir,
      jmldaerah: jmldaerahadir.length + "/"+ jmldaerah.length
    })


  }
}
