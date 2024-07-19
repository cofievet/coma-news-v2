import User from '#models/user'
import { registerValidator } from '#validators/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegistersController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async execute({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(registerValidator)
    const user = await User.create(data)

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}
