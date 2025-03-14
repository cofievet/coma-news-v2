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

    const dataArticle = this.generateHtml(data.source, $)
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

  generateHtml(url: string, $: cheerio.CheerioAPI) {
    
    console.log("url: " + url)
    
    if (url.includes('eurosport.fr')) {
      // Eurosport paragraphes, titles and blockquotes
      const eurosportTags = [
        '[data-testid=atom-body-paragraph]',
        '[data-testid=atom-body-h2]',
        '[data-testid=atom-body-blockquote] > div > blockquote',
      ]
      const eurosportAttrToRemove = ['data-testid', 'class']

      const title = $('h1').text()
      // Résumé de l'article
      const resume = $('h2').text()
      const author = $(
        'div[data-testid=molecule-author-banner] > div > div:nth-child(1) > a'
      ).text()

      let content = this.GetContentRecursively($, $('div[data-testid=atom-body]'))


      return {
        title,
        resume,
        author,
        content,
      }
    }

    if (url.includes('lequipe.fr')) {
      // Lequipe paragraphes, titles and blockquotes
      const lequipeTags = [
        '[class=Paragraph]',
        '[class=TextFocus__subtitle]',
        '[class=TextFocus__content]',
        '[class=Article__embed]',
      ]

      const title = $('h1').text()
      // Résumé de l'article
      const resume = $('h2[class=Article__chapo]').text()
      const author = "lequipe.fr"
  
      let content = this.GetContentRecursively($, $('div[class=article__body]'))  

      return {
        title,
        resume,
        author,
        content,
      }
    }

    
    if (url.includes('lerugbynistere.fr')) {
      // Lequipe paragraphes, titles and blockquotes
      const lerugbynistereTags = [
        '[id=article-body] p',
        '[id=article-body] h2',
      ]
      const lerugbynistereAttrToRemove = [
        'p[class=st-inarticle-paragraph]',
      ]

      const title = 'titre' // $('h1').text()
      // Résumé de l'article
      const resume = 'hello' //$('span[class=introduction]').text()
      const author = "lerugbynistere.fr"

      let content = this.GetContent($, [], [], 'div[class=article-content]')

      return {
        title,
        resume,
        author,
        content,
      }
    }

    
    if (url.includes('fr.motorsport.com')) {
      // Lequipe paragraphes, titles and blockquotes
      const lerugbynistereAttrToRemove = [
        'p[class=st-inarticle-paragraph]',
      ]

      const title = 'titre' // $('h1').text()
      // Résumé de l'article
      const resume = 'hello' //$('span[class=introduction]').text()
      const author = "lerugbynistere.fr"

      let content = this.GetContent($, [], [], 'div[class=ms-article__body]')
      // let content = this.GetContentRecursively($, $('div[class=ms-article__body]'))

      return {
        title,
        resume,
        author,
        content,
      }
    }

    return null
  }

  private GetContent($: cheerio.CheerioAPI, tagsToAdd: string[], eurosportAttrToRemove: string[], parentTag: string) {
    tagsToAdd.push('p')
    let content = ''
    const articleChildren = $(parentTag).children()
    for (const articleChild of articleChildren) {
      
      for (const tag of tagsToAdd) {
                
        const foundElements = $(articleChild).find(tag)
        for (const elementToAdd of foundElements) {          
          if (elementToAdd && $(elementToAdd).prop('outerHTML') !== '') {
            for (const attr of eurosportAttrToRemove) {
              $(elementToAdd).removeAttr(attr)
              for (const child of $(elementToAdd).children()) {
                $(child).removeAttr(attr)
              }
            }
            content = content.concat($(elementToAdd).prop('outerHTML')!)
          }
        }
      }

    }
    return content
  }

  private GetContentRecursively($: cheerio.CheerioAPI, parentElement: any) {
    const articleChildren = parentElement.children()
    for (const articleChild of articleChildren) {
      this.GetContentRecursively($, $(articleChild)) 
    }
    if ($(parentElement).prop('outerHTML') !== '') {           
      return $(parentElement).prop('outerHTML')
    }
    return ''
  }
}
