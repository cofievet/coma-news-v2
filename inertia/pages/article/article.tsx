import { useParams } from 'react-router-dom';

export default function Article(props: any) {
  const { id } = props
  return (
    <>
      <div>
            <h1>Article {id}</h1>
            {/* Render the content of the article here */}
        </div>
    </>
  )
}
