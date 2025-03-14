import * as cheerio from 'cheerio'

export default class ExtractArticle {

    
  generateHtml(url: string, resdata: any) {
    
    const $ = cheerio.load(resdata)

    if (!$) {
      throw new Error('Error while fetching the source URL')
    }

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

      let content = this.GetContentRecursively($, 'div[class=article-content]')

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

      let content = this.GetContentRecursively($, 'div[class=ms-article__body]')

      return {
        title,
        resume,
        author,
        content,
      }
    }

    return null
  }

    private GetContentRecursively($: cheerio.CheerioAPI, parentElement: any) {
      const articleChildren = parentElement.children()
      for (const articleChild of articleChildren) {
        this.GetContentRecursively($, $(articleChild)) 
      }
      if ($(parentElement).prop('outerHTML') !== '' && $(parentElement).prop('outerHTML') !== null) {           
        return $(parentElement).prop('outerHTML') ?? ''
      }
      return ''
    }
}