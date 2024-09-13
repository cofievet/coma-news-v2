import type { HttpContext } from '@adonisjs/core/http'

export default class CreateArticlesController {
    async render({ inertia }: HttpContext) {

    return inertia.render('article/create_article')
  }
}