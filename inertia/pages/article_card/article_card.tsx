import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import IosShareIcon from '@mui/icons-material/IosShare'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import { red } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'
import { Link } from '@inertiajs/react'

export default function ArticleCard(props: any) {
  const { article } = props
  // const navigate = useNavigate()
  // function goToArticle(articleToGo: any) {
  //   navigate(`/article/${articleToGo.id}`, { state: { article: articleToGo } })
  // }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {article.userId}
          </Avatar>
        }
        title={article.name}
        subheader={
          <>
            <div>{article.user.name}</div>
            {/* <div>{article.createdAt}</div> */}
          </>
        }
      />
      {article.image && (
        <CardMedia component="img" height="194" image={article.image} alt={article.sourceName} />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">{`${article.resume}...`}</Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small" onClick={() => goToArticle(article)}> */}
        <Link href={`/article/${article.id}`} type='button'>Go to article</Link>
        {/* <IconButton>
          <IosShareIcon />
        </IconButton>
        <IconButton>
          <ThumbUpOffAltIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  )
}
