 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
  public async login({request,response, auth}: HttpContextContract){
    const {email, password}= request.all()
    try {
      const token = await auth.use("api").attempt(email,password)
      return response.json({
        code :200,
        success:true,
        response:{
          message: "Proses login berhasil",
          token:token,
        },
        errors:[],
      });
    } catch (error) {
      return response.send("Invalid credential..!" + error)
    }
  }
}
