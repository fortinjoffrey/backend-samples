import { loginValidator, registerValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)
    return payload
  }

  async create({ request }: HttpContext) {
    const data = request.all()
    await registerValidator.validate(data)
  }
}
