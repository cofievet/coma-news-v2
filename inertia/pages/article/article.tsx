import Article from '../../../app/models/article'

interface ArticleProps {
  article: Article
}

export default function ArticlePage(props: ArticleProps) {
  const { article } = props
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-4xl text-center font-bold article-font">{article.title}</h1>
      <div className="flex flex-col gap-0 justify-center items-center">
        <div className="secondary-font text-secondary">
          Par <span className="font-bold">{article.author}</span>
        </div>
        <div className="secondary-font text-secondary">
          Le <span>{article.createdAt.toLocaleString()}</span>
        </div>
      </div>
      <div
        className="article-text-body article-font"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  )
}
