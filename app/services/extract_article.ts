import * as cheerio from 'cheerio'

export default class ExtractArticle {
    
    public GetContentRecursively($: cheerio.CheerioAPI, parentElement: any) {
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