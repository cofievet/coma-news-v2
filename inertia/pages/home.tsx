import { Head } from '@inertiajs/react'
import { CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'
import ArticleCard from '../pages/article_card/article_card'

export default function Home(props: any) {
  const { articles } = props
  return (
    <>
      <Head title="Homepage" />

      <h1>Welcome to Inertia.js</h1>

      <Grid container spacing={2} padding={2}>
        {articles.map((article: any) => (
          <React.Fragment key={article.id}>
            <Grid item xs={12}>
              <ArticleCard article={article} />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>

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
