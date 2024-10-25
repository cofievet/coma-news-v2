import Article from '#models/article'
import { createArticleValidator } from '#validators/create_article'
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import * as cheerio from 'cheerio'

export default class CreateArticlesController {
  render({ inertia }: HttpContext) {
    return inertia.render('article/create_article')
  }

  async execute({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createArticleValidator)

    let article = new Article()

    await axios
      .get(data.source)
      .then((res) => {
        if (res.status === 200) {
          const $ = cheerio.load(res.data)
          article = this.generateHtml(data.source, $)
        }
      })
      .catch((error) => {
        console.error(error)
        throw new Error('Error while fetching the source URL')
      })

    article.userId = auth.user!.id
    const newArticle = await Article.create(article)
    return response.redirect().toRoute('article.render', { id: newArticle.id })
  }

  generateHtml(url: string, $: cheerio.CheerioAPI) {
    let article = new Article()
    article.source = url

    if (url.includes('eurosport.fr')) {
      const title = $('h1').text()
      const resume = $('h2').text()
      const author = $(
        'div[data-testid=molecule-author-banner] > div > div:nth-child(1) > a'
      ).text()

      let content = ''
      const articleChildrens = $('div[data-testid=atom-body]').children()
      for (const articleChildren of articleChildrens) {
        const elementToAdd = $(articleChildren).find('[data-testid=atom-body-paragraph]')[0]

        if (elementToAdd && $(elementToAdd).prop('outerHTML') !== '') {
          content = content.concat($(elementToAdd).prop('outerHTML')!)
        }
      }

      article.title = title
      article.resume = resume
      article.author = author
      article.content = content
    }

    return article
  }
}
