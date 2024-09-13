import { Head, useForm } from '@inertiajs/react'

import InputGroup from '~/components/input_group'

export default function ArticlePage() {
    const { data, setData, post, processing, errors } = useForm({
    title: '',
    content: '',
    resume: '',
    source: '',
    author: '',
  })

    const handleSubmit = (event: React.SyntheticEvent) => {    
        event.preventDefault()
        post('/create_article')
    }

  return (
    <>
        <Head title="Create Article" />
      <div className="p-28 flex flex-col gap-10">
        <h1 className="text-3xl title">
          Add your article
        </h1>
        <hr className="divide-gray-800" />
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
            <InputGroup
              id="title"
              type="text"
              name="title"
              value={data.title}
              field="title"
              placeholder="My beautiful article"
              error={errors?.title}
              label="Title of the article"
              onChange={setData}
            />
            <InputGroup
              id="content"
              type="textarea"
              name="content"
              value={data.content}
              field="content"
              placeholder="The content of my article"
              error={errors?.content}
              label="Content of the article"
              onChange={setData}
            />
            <InputGroup
              id="resume"
              type="textarea"
              name="resume"
              value={data.resume}
              field="resume"
              placeholder="Resume of my article"
              error={errors?.resume}
              label="Resume of the article"
              onChange={setData}
            />
            <InputGroup
              id="source"
              type="text"
              name="source"
              value={data.source}
              field="source"
              placeholder="Source of my article"
              error={errors?.source}
              label="Source of the article"
              onChange={setData}
            />
            <InputGroup
              id="author"
              type="text"
              name="author"
              value={data.author}
              field="author"
              placeholder="Author of my article"
              error={errors?.author}
              label="Author of the article"
              onChange={setData}
            />
          </div>
          <button type="submit" className="p-3 rounded cta-primary" disabled={processing}>
            Add my article
          </button>
        </form>
      </div>
    </>
  )
}
