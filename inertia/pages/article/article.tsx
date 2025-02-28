import Article from '../../../app/models/article';

interface ArticleProps {
  article: Article;
}

export default function ArticlePage(props: ArticleProps) {
  const { article } = props;
  const date = new Date(article.createdAt.toString());
  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    
  return (
    <>
      <h1 style={{ fontSize: "40px", fontWeight: 'bold' }}>{article.title}</h1>
      <h3>
        <a href={article.source} target='_blank' style={{ fontSize : "15px", color:'blue', textDecoration: 'underline', textDecorationColor: 'blue'}}>{article.source}</a>
        <div style={{ fontSize: "14px", paddingBottom: "10px", fontStyle: 'italic' }}>le {daysOfWeek[date.getDay()]} {date.toLocaleDateString("fr-FR")} à {date.toLocaleTimeString("fr-FR")}</div>
      </h3>
      <h2 style={{ fontSize: "20px"}}>{article.resume}</h2>
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
        style={{ padding: "20px 0px" }}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </>
  )
}
