import Article from '#models/article'

export default class ArticleViewModel {
  constructor(private article: Article) {}

  declare id: number

  declare title: string

  declare content: string

  declare resume: string

  declare source: string

  declare author: string

  declare userId: number

  declare createdAt: string

  fromDomain() {
    return {
      id: this.article.id,
      title: this.article.title,
      content: this.article.content,
      resume: this.article.resume,
      source: this.article.source,
      author: this.article.author,
      createdAt: this.article.createdAt.toLocaleString(),
    }
  }
}
