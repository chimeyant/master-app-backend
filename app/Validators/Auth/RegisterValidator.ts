import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name:schema.string(),
    email: schema.string({},[
      rules.email(),
      rules.unique({table:'pesertas',column:'email'})
    ]),

    phone:schema.number(),
    province_uuid: schema.string(),
    regency_uuid: schema.string(),
    instansi:schema.string(),
    lokasi_uuid:schema.string(),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'name.required':"Nama Pengguna Tidak Boleh Kosong",
    'email.required':'Email Tidak Boleh Kosong',
    'email.unique':"Email telah terdaftar",
    'email.email':'Email tidak benar',
    "phone.required":"Nomor telepon tidak boleh kosong",
    'province_uuid.required':"Provinsi wajib dipilih",
    'regency_uuid.required':"Kabupaten wajib dipilih",
    'lokasi_uuid.required': 'Lokasi wajib dipilih salah satu',
    'instansi.required':"Instansi tidak boleh kosong"
  }
}
