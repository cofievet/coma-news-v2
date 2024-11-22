import { Link } from '@inertiajs/react'

export default function ArticleCard(props: any) {
  const { article } = props

  return (
    <div className=" flex flex-col gap-4 rounded-md shadow-lg shadow-100 p-4 article-card">
      <div className="flex-1 flex flex-col gap-2">
        <h1 className="text-lg font-semibold">{article.title}</h1>
        <div className="flex flex-col gap-1">
          <span>{article.author}</span>
          <span>{article.source}</span>
        </div>
      </div>
      <div className="flex flex-auto">
        <Link className="button-action" href={`/articles/${article.id}`} as="button">
          Go to article
        </Link>
        {/* <button onClick={() => navigate(`/articles/${article.id}`, { state: { article: article } })}>
          Go to article 
        </button> */}
      </div>
    </div>
  )
}
