import Article from '#models/article'

interface CreateArticleDto {
  title: string
  resume: string
  author: string
  content: string
  source: string
  userId: number
}

export class ArticleRepository {
  async create(articleDto: CreateArticleDto) {
    const article = new Article()
    article.content = articleDto.content
    article.title = articleDto.title
    article.resume = articleDto.resume
    article.source = articleDto.source
    article.author = articleDto.author
    article.userId = articleDto.userId

    return await Article.create(article)
  }
}
