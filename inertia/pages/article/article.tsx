import { useParams } from 'react-router-dom';

const Article = () => {
    const { articleId } = useParams();

    return (
        <div>
            <h1>Article {articleId}</h1>
            {/* Render the content of the article here */}
        </div>
    );
};

export default Article;