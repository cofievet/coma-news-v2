import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async execute({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.redirect().back()
  }
}
