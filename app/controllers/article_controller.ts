// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http"
import Article from "../models/article.js"

export default class ArticleController {
  async render(httpContext : HttpContext) {
    const articleId = httpContext.request.params().id
    const article = await Article.query().where('id', articleId).preload('user').first()
    
    return httpContext.inertia.render('article/article', { article })
  }
}
