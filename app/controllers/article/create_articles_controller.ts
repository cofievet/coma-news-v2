import { createArticleValidator } from '#validators/create_article'
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import { ArticleRepository } from '#repositories/article_repository'
import { inject } from '@adonisjs/core'
import ExtractArticle from '#services/extract_article'

@inject()
export default class CreateArticlesController {
  constructor(
    private articleRepository: ArticleRepository,
    private extractArticle: ExtractArticle) {}

  render({ inertia }: HttpContext) {
    return inertia.render('article/create_article')
  }

  async execute({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createArticleValidator)
    let $ = null
    let resdata = null

    await axios
      .get(data.source, { headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Google Chrome\";v=\"101\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
    } })
      .then((res) => {
        if (res.status === 200) {
          resdata = res.data
        }
      })
      .catch((error) => {
        console.error(error)
        throw new Error('Error while fetching the source URL')
      })

    const dataArticle = this.extractArticle.generateHtml(data.source, resdata)
    if (dataArticle === null) {
      throw new Error('The source URL is not supported')
    }

    const { title, resume, author, content } = dataArticle

    const newArticle = await this.articleRepository.create({
      userId: auth.user!.id,
      source: data.source,
      author,
      content,
      resume,
      title,
    })
    return response.redirect().toRoute('article.render', { id: newArticle.id })
  }
}
