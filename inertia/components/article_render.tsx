import Article from '#models/article'

export default function ArticleRender({ title, content, createdAt, author }: Article) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl">{title}</h1>
        <h1>{author}</h1>
      </div>
      <div>{content}</div>
    </div>
  )
}
