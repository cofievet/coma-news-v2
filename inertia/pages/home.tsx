import { Head } from '@inertiajs/react'
import ArticleCard from '../components/article_card'
import { Link } from '@inertiajs/react'

export default function Home(props: any) {
  const { articles } = props
  return (
    <>
      <Head title="Homepage" />

      <div className="title-banner">
        <h1 className="text-2xl">Last articles</h1>
        <Link className="button-action" href={`/create-article/`} as="button">
          Add new article
        </Link>
      </div>

      <div className="my-8 grid grid-cols-1 gap-2 md:grid-cols-3">
        {articles.map((article: any) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </>
  )
}
