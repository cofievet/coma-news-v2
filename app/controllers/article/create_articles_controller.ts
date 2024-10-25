import Article from '#models/article'
import { createArticleValidator } from '#validators/create_article'
import type { HttpContext } from '@adonisjs/core/http'

export default class CreateArticlesController {
  render({ inertia }: HttpContext) {
    return inertia.render('article/create_article')
  }

  async execute({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createArticleValidator)
    data.user_id = auth.user!.id
    const newArticle = await Article.create(data)
    return response.redirect().toRoute('article.render', { id: newArticle.id })
  }
}
