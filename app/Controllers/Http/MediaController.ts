import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from "@ioc:Adonis/Core/Application"
import Env from "@ioc:Adonis/Core/Env"
import {v4 as uuid} from "uuid"
import Drive from '@ioc:Adonis/Core/Drive'

const chunk_inpt = "file";

export default class MediaController {

  public async store({request, response}: HttpContextContract){
    const {doctype}= request.only(['doctype'])
    const file = request.file(chunk_inpt)
    const fileSize = file?.size

    try {

      if(Number(fileSize) > 2000000){
        return response.status(500).json("File maksimal untuk diupload 2Mb")
      }

      const name = `${uuid()}.${file?.extname}`
      let url;

      if(Env.get('NODE_ENV')=='development'){
        if(doctype === 'sliders'){
          await file?.move(Application.tmpPath("../storage/images/sliders"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/sliders/"+ name)
        }
        else if(doctype === 'gallery'){
          await file?.move(Application.tmpPath("../storage/images/gallery"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/gallery/"+ name)
        }
        else if(doctype==='avatars'){
          await file?.move(Application.tmpPath("../storage/images/avatars"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/avatars/"+ name)
        }
        else if(doctype==='laporans'){
          await file?.move(Application.tmpPath("../storage/images/laporans"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/laporans/"+ name)
        }
        else if(doctype==='documents'){
          await file?.move(Application.tmpPath("../storage/documents"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("documents/"+ name)
        }
        else{
          await file?.move(Application.tmpPath("../storage/images/apps"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/apps/"+ name)
        }
      }

      else{
        if(doctype === 'sliders'){
          await file?.move(Application.tmpPath("../../storage/images/sliders"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/sliders/"+ name)
        }
        else if(doctype==='avatars'){
          await file?.move(Application.tmpPath("../../storage/images/avatars"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/avatars/"+ name)
        }
        else if(doctype === 'gallery'){
          await file?.move(Application.tmpPath("../../storage/images/gallery"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/gallery/"+ name)
        }
        else if(doctype==='laporans'){
          await file?.move(Application.tmpPath("../../storage/images/laporans"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/laporans/"+ name)
        }
        else if(doctype==='documents'){
          await file?.move(Application.tmpPath("../../storage/documents"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("documents/"+ name)
        }
        else{
          await file?.move(Application.tmpPath("../../storage/images/apps"),{name:name, overwrite:true})
          url = await Drive.getSignedUrl("images/apps/"+ name)
        }
      }


      return response.json({
        status: true,
        name: name,
        slug:name,
        size:file?.size,
        type: file?.type,
        mime: file?.subtype,
        extn: file?.extname,
        path: Env.get("BASE_URL") + url
      })
    } catch (error) {
      return response.json({
        status:error
      })
    }
  }
}
