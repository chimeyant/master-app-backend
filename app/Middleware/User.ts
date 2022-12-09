import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class User {
  public async handle({response,auth}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    if(!(auth.user?.authent=='user')){
      return response.unauthorized("Unauthorize")
    }
    await next()
  }
}
