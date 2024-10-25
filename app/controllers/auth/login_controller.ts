import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { loginValidator } from '#validators/register'

export default class LoginController {
  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async execute({ request, response, auth, inertia }: HttpContext) {
    console.log('test')
    const data = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(data.email, data.password)
      await auth.use('web').login(user)
      return response.redirect().toRoute('home')
    } catch (ex) {
      // TODO : 2 possibilities : manage in exceptions handler or see if we can make response instead of inertia
      return inertia.render('auth/login', { error: ex.message })
      //session.flash('auth', 'Authentication impossible')
      //return response.redirect().back()
    }
  }
}
