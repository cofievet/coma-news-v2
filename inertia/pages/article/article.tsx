import Article from '#models/article'
import ArticleRender from '~/components/article_render'

interface IarticleProps {
  article: Article
}

export default function ArticlePage(props: IarticleProps) {
  return (
    <>
      <div>
        <ArticleRender {...props.article} />
      </div>
    </>
  )
}
