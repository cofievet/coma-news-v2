import Article from '#models/article'
import { createArticleValidator } from '#validators/create_article'
import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'
import * as cheerio from 'cheerio'
import { ArticleRepository } from '../../repositories/article_repository.js'
import { inject } from '@adonisjs/core'

@inject()
export default class CreateArticlesController {
  constructor(private articleRepository: ArticleRepository) {}

  render({ inertia }: HttpContext) {
    return inertia.render('article/create_article')
  }

  async execute({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(createArticleValidator)
    let $ = null

    await axios
      .get(data.source)
      .then((res) => {
        if (res.status === 200) {
          $ = cheerio.load(res.data)
        }
      })
      .catch((error) => {
        console.error(error)
        throw new Error('Error while fetching the source URL')
      })

    if (!$) {
      throw new Error('Error while fetching the source URL')
    }
    const { title, content, resume, author } = this.generateHtml(data.source, $)

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

  generateHtml(url: string, $: cheerio.CheerioAPI) {
    let article = new Article()
    article.source = url

    if (url.includes('eurosport.fr')) {
      const eurosportTags = [
        '[data-testid=atom-body-paragraph]',
        '[data-testid=atom-body-h2]',
        '[data-testid=atom-body-blockquote] > div > blockquote',
      ]

      const title = $('h1').text()
      const resume = $('h2').text()
      const author = $(
        'div[data-testid=molecule-author-banner] > div > div:nth-child(1) > a'
      ).text()

      let content = ''
      const articleChildren = $('div[data-testid=atom-body]').children()
      for (const articleChild of articleChildren) {
        let elementToAdd = null

        for (const tag of eurosportTags) {
          if (!isNullOrUndefined(elementToAdd)) {
            break
          }

          elementToAdd = $(articleChild).find(tag)[0]
        }

        if (elementToAdd && $(elementToAdd).prop('outerHTML') !== '') {
          content = content.concat($(elementToAdd).prop('outerHTML')!)
        }
      }

      return {
        title,
        resume,
        author,
        content,
      }
    }

    return article
  }
}

function isNullOrUndefined(value: any) {
  return value === undefined || value === null
}
