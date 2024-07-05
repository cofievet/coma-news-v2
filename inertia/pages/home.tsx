import { Head } from '@inertiajs/react'
import React from 'react'

export default function Home(props: any) {
  const { articles } = props
  return (
    <>
      <Head title="Homepage" />

      <h1>Welcome to Inertia.js</h1>

      <div className="flex gap-10 flex-col">
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
      </div>
    </>
  )
}
