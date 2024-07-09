import { loginValidator, registerValidator } from '#validators/auth'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    await request.validateUsing(loginValidator)
    return {
      token: 'fake-token',
    }
  }

  async create({ request }: HttpContext) {
    await request.validateUsing(registerValidator)
  }
}
