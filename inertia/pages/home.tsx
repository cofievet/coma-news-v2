import { Head } from '@inertiajs/react'
import ArticleCard from '../components/article_card'

export default function Home(props: any) {
  const { articles } = props
  return (
    <>
      <Head title="Homepage" />

      <h1 className="text-2xl">Last articles</h1>

      <div className="my-8 grid grid-cols-1 gap-2 md:grid-cols-3">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* <div className="flex gap-10 flex-col">
        {articles?.map((article: any) => (
          <React.Fragment key={article.id}>
            <div className="py-2">
              <h2 className="text-xl bold">{article.title}</h2>
              <p>{article.content}</p>
              <p>By {article.user.name}</p>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div> */}
    </>
  )
}
