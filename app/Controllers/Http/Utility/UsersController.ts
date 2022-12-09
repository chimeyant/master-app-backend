import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App//Models/User"
import UserValidator from 'App/Validators/MasterData/UserValidator'
import UpdateProfilValidator from 'App/Validators/Utility/UpdateProfilValidator'
import Env from "@ioc:Adonis/Core/Env"
import Drive from "@ioc:Adonis/Core/Drive"




export default class UsersController {
  public async index({request,response}: HttpContextContract) {
    const {page, itemsPerPage}= request.only(['page','itemsPerPage'])

    const users = await User.query().withScopes((scopes)=> scopes.filterOn(request)).paginate(page,itemsPerPage)

    return users;
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const {name, email, password, authent,status,reset} = request.all()

    await request.validate(UserValidator)

    try {
      const user = new User()
      user.name = name
      user.email = email
      user.password = "12345678"
      user.authent = authent
      user.status = status
      await user.save()

      return response.json({
        status:true,
        message:"Tambah pengguna berhasil"
      })
    } catch (error) {
      return response.json({
        status: false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }

  }

  public async show({params, request,response}: HttpContextContract) {
    const {id}= params
    const user = await User.query().select('id','name','email','authent','status').where('id',id).first()

    return user;
  }

  public async edit({}: HttpContextContract) {}

  public async update({params, request,response}: HttpContextContract) {
    const {id}= params


    const {name,status, reset}= request.all()

    await request.validate(UserValidator)

    try {
      const user = await User.findOrFail(id)
      user.name = name
      user.status = status
      if(reset){
        user.password = "12345678"
      }
      await user?.save()

      return response.json({
        status:true,
        message:"Proses ubah data berhasil"
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async destroy({params,response}: HttpContextContract) {
    const {id}= params
    try {
      const user = await User.findBy('id',id)
      await user?.delete()
      return response.json({
        status:true,
        message:"Proses hapus data berhasil..."
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async userInfo({auth}: HttpContextContract){
    const user = await auth.user;
    const data ={}

    data['id']= user?.id
    data['name']= user?.name
    data['email']= user?.email
    data['authent']= user?.authent
    data['avatar']= user?.avatar
    data['avatar_path'] = user?.avatar ? Env.get("BASE_URL")+ await Drive.getSignedUrl( "images/avatars/"+ user?.avatar):   "/images/pencaker.png"
    return data;
  }

  public async updateProfil({request,response,auth}:HttpContextContract){
    const user = await auth.user
    const data = request.only(['name','avatar']);


    //validasi form
    await request.validate(UpdateProfilValidator)

    try {
      const profil = await User.findBy("id", user?.id)
      profil?.merge(data)
      await profil?.save()

      return response.json({
        status:true,
        message:"Proses ubah profil berhasil..."
      })
    } catch (error) {
      return response.json({
        status:false,
        message: "Opps..., terjadi kesalahan "+ error
      })
    }
  }

  public async changePwd({request,response,auth}:HttpContextContract){
    const authuser = await auth.user
    const data = request.only(['password']);
    try {
      const user = await User.findBy('id', authuser?.id)
      user?.merge(data)
      await user?.save()

      return response.json({
        status:true,
        message:"Proses ubah kata sandi berhasil..."
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "+ error
      })
    }
  }


}
