// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from "@adonisjs/core/http"
import Article from "../models/article.js"

export default class ArticlesController {
  async render({ inertia }: HttpContext) {
    const article = await Article.query().preload('user').first()
    
    return inertia.render('article/article', { article })
  }
}
