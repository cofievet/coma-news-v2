import { Head, useForm } from '@inertiajs/react'

import InputGroup from '~/components/input_group'

export default function ArticlePage() {
  const { data, setData, post, processing, errors } = useForm({
    source:
      'https://www.eurosport.fr/football/mls/2024/la-messi-cam-lexperience-intrigante-de-la-mls_sto20048094/story.shtml',
  })

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    post('/create-article')
  }

  return (
    <>
      <Head title="Create Article" />
      <div className="p-28 flex flex-col gap-10">
        <h1 className="text-3xl title">Add your article</h1>
        <hr className="divide-gray-800" />
        <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col gap-12">
          <div className="flex flex-col gap-5">
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
          </div>
          <button type="submit" className="p-3 rounded cta-primary" disabled={processing}>
            Add my article
          </button>
        </form>
      </div>
    </>
  )
}
