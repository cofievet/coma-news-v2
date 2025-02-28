// import type { HttpContext } from '@adonisjs/core/http'

import Article from '../models/article.js'
import ArticleViewModel from '../view_models/article_view_model.js'
import { HttpContext } from '@adonisjs/core/http'

export default class ArticlesController {
  async render({ inertia, params }: HttpContext) {
    const article = await Article.query().where('id', params.id).firstOrFail()

    return inertia.render('article/article', {
      article: new ArticleViewModel(article).fromDomain(),
    })
  }
}
