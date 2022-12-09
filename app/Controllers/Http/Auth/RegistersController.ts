 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Peserta from 'App/Models/Peserta'
import Lokasi from 'App/Models/Lokasi'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import Axios from 'axios'
import Province from 'App/Models/Province'
import Lo from 'App/Models/Lo'


export default class RegistersController {
    public async register({request, response}:HttpContextContract){
      const {name, email, phone, province_uuid, regency_uuid, lokasi_uuid,instansi,jabatan}= request.all()



      return response.json({
        code:500,
        success:false,
        response:{
          message:"Mohon maaf pendaftaran telah  kami tutup"
        }
      })




      await request.validate(RegisterValidator)

      const countPeserta = await Peserta.query().where('status',true).getCount()

      //cek kuota peserta
      if(Number(countPeserta) == 701){
        return response.json({
          code:500,
          success:false,
          response:{
            message:"Registrasi tidak berhasil, mohon maaf kouta kegiatan telah habis"
          }
        })
      }

      //limit lokasi perdaerah
      const countPerDaerah = await Peserta.query().where('regency_uuid', regency_uuid).where('status',true).getCount()

      if(Number(countPerDaerah) >=3 ){
        return response.json({
          code:500,
          success:false,
          response:{
            message:"Registrasi tidak berhasil, mohon maaf kouta kegiatan untuk daerah anda telah habis"
          }
        })
      }


      //cek kouta lokasi
      const limitkoutalokasi = await Lokasi.findBy('uuid', lokasi_uuid);
      const currentkoutalokasi = await Peserta.query().where('lokasi_uuid', lokasi_uuid).getCount()

      if(Number(limitkoutalokasi?.kuota)== Number(currentkoutalokasi)){
        return response.json({
          code:500,
          success:false,
          response:{
            message:"Registrasi tidak berhasil, mohon maaf kouta lokasi tujuan  telah habis, silahkan pilih lokasi yang lain"
          }
        })
      }

      //cek lokasi kunjung lokasi per
      /**
      const currentlokasiperdaerah = await Peserta.query().where('uuid', lokasi_uuid).where('regency_uuid', regency_uuid).getCount()

      if(Number(currentkoutalokasi)>= 1){
        return response.json({
          code:500,
          success:false,
          response:{
            message:"Registrasi tidak berhasil, mohon maaf kouta lokasi tujuan  telah habis, silahkan pilih lokasi yang lain"
          }
        })
      }
      */

      try {

        const lokasi = await Lokasi.findBy('uuid', lokasi_uuid)
        const province = await Province.findBy("uuid", province_uuid)
        const lo = await Lo.findBy("uuid", province?.loUuid)


        //simpan ke data peserta
        const peserta = new Peserta()
        peserta.noreg = await this.getnoreg()
        peserta.name = name
        peserta.email = email
        peserta.phone = phone
        peserta.provinceUuid = province_uuid
        peserta.regencyUuid = regency_uuid
        peserta.lokasiUuid = lokasi_uuid
        peserta.instansi = instansi
        peserta.jabatan= jabatan
        await peserta.save()



        const phonenumber = this.phoneFormat(peserta.phone);

        const msg = {
          apikey: 'EYN3RRrziP2EdUokpDgAhykoSK4dm7',
          nomor: phonenumber,
          pesan:
            "*CITY SANITATION SUMMIT XX* \r\n `Sanitasi Aman, Investasi Masa Depan` \r\n\r\nHalo... \r\n"+ peserta.name.toUpperCase() + "\r\n\r\nAnda telah terdaftar sebagai delegasi dalam acara City Sanitation Summit XX yang diselenggarakan pada tanggal 6-8 September 2022 berlokasi di Kabupaten Tangerang Provinsi Banten, dengan lokus kunjungan *"+ lokasi?.name +"* \r\n\r\nSelanjutnya, Anda dapat melakukan persiapan yang diperlukan: \r\n- Web portal kegiatan CSS-XX dapat Anda kunjungi di https://css.tangerangkab.go.id \r\n- Bukti pendaftaran dapat diunduh kembali di https://css.tangerangkab.go.id/registrasi-berhasil/"+ peserta.uuid + "\r\n- Buku panduan pelaksanaan serta dokumen lainnya dapat diunduh di https://css.tangerangkab.go.id/media\r\n\r\nKonfirmasi kehadiran dan informasi acara dapat menghubungi sdr/i "+ lo?.name +" - "+ lo?.phone +" \r\n\r\nSalam, \r\n\r\nPanitian CSS XX \r\nKabupaten Tangerang"
        };

        await Axios.post("http://api.senderwa.com/api/v2/send-wa", msg);

        return response.json({
          code:200,
          success:true,
          response:{
            message:"Proses registrasi berhasil...!",
            uuid: peserta.uuid,
          }
        })
      } catch (error) {
        return response.json({
          code:200,
          success:false,
          response:{
            message:"Proses registrasi tidak berhasil berhasil...!" + error
          }
        })
      }
    }

    public async registrasiBerhasil({params}){
      const {uuid}= params
      const peserta = await Peserta.findBy('uuid',uuid )
      const province = await Province.findBy("uuid", peserta?.provinceUuid)
      const lo = await Lo.findBy("uuid", province?.loUuid)

      const data ={}
      data['noreg']= peserta?.noreg
      data['name']= peserta?.name
      data['instansi']= peserta?.instansi
      data['lo']= lo;
      return data;
    }

    public async getnoreg(){
      const countpeserta = await Peserta.query().getCount()

      const nourut = Number(countpeserta)+ 1;
      const prefix = "REG-2022";
      let noreg:string="";

      const max = String(nourut)

      if(max){
        let maxlength = max.length;
        if(maxlength==1){
          noreg = prefix+ ".000"+ max
        }
        if(maxlength==2){
          noreg = prefix+ ".00"+ max
        }
        if(maxlength==3){
          noreg = prefix+ ".0"+ max
        }
        if(maxlength==4){
          noreg = prefix+ "."+ max
        }
      }else{
        noreg= prefix+ "0001"
      }

      return noreg

    }

    private  phoneFormat(phonenumber){
      let formatted:string =phonenumber.replace(/\D/g, "");

    // 2. Menghilangkan angka 0 di depan (prefix)
    //    Kemudian diganti dengan 62
    if (formatted.startsWith("0")) {
      formatted = "62" + formatted.substr(1);
    }

    if (!formatted.endsWith("")) {
      formatted;
    }

    return formatted;
    }


}
