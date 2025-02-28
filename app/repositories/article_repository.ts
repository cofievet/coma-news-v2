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
    return await Article.create({
      title: articleDto.title,
      content: articleDto.content,
      resume: articleDto.resume,
      source: articleDto.source,
      author: articleDto.author,
      userId: articleDto.userId,
    })
  }
}
