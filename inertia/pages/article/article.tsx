import Article from '../../../app/models/article';

interface ArticleProps {
  article: Article;
}

export default function ArticlePage(props: ArticleProps) {
  const { article } = props;
  console.log("Article", article);
  return (
    <>
      <h1>{article.title}</h1>
      <h3>
        {article.source}, le {String(article.createdAt)}
      </h3>
      {/* <img
        src={article.image}
        alt={article.alt}
        style={{ display: "grid", margin: "auto" }}
        height='194'
      ></img> */}
      {/* <i
        style={{
          display: "grid",
          margin: "auto",
          width: "fit-content",
          fontSize: "x-small",
          color: "grey",
        }}
      >
        {article.alt}
      </i> */}
      <div
        style={{ padding: "20px 5px" }}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </>
  )
}
