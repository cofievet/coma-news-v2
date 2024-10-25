// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Article from '#models/article'

export default class HomeController {
  async render({ inertia }: HttpContext) {
    const articles = await Article.query().preload('user').limit(5).orderBy('created_at', 'desc')

    return inertia.render('home', { articles })
  }
}
