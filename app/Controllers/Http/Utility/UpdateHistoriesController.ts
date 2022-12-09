import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UpdateHistory from 'App/Models/UpdateHistory'
import UpdateHistoryValidator from 'App/Validators/Utility/UpdateHistoryValidator'

export default class UpdateHistoriesController {
  public async index({}: HttpContextContract) {
    const updates = await UpdateHistory.query().orderBy("created_at",'desc')

    return updates;
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    const {title,version, description, status}=request.all()

    await request.validate(UpdateHistoryValidator)

    try {
      const update = new UpdateHistory()
      update.title = title
      update.version = version
      update.description = description
      update.status = status
      await update.save()

      return response.json({
        status:true,
        message:"Tambah update histori berhasil..."
      })
    } catch (error) {
      return response.json({
        status:false,
        message:"Opps..., terjadi kesalahan "
      })

    }
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
