import Article from '#models/article'
import { createArticleValidator } from '#validators/create_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateArticlesController {
  async render({ inertia }: HttpContext) {
    return inertia.render('article/create_article')
  }

  async execute({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createArticleValidator)
    data.user_id = auth.user!.id

    const newArticle = await Article.create(data)

    response.redirect().toRoute('articles.render', { id: newArticle.id })
  }
}
