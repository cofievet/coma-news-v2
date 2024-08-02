// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Article from '../models/article.js'

export default class ArticlesController {
  async render({ inertia, params }: HttpContext) {
    const article = await Article.query().where('id', params.id).firstOrFail()

    return inertia.render('article/article', { article })
  }
}
