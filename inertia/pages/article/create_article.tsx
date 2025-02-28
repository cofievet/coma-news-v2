import { Head, useForm } from '@inertiajs/react'

import InputGroup from '~/components/input_group'

export default function ArticlePage() {
  const { data, setData, post, processing, errors } = useForm({
    source:
      // 'https://www.eurosport.fr/football/mls/2024/la-messi-cam-lexperience-intrigante-de-la-mls_sto20048094/story.shtml',
      // 'https://www.lequipe.fr/Rugby/Actualites/Deux-changements-pour-l-angleterre-contre-le-japon/1521950',
      // 'https://www.lequipe.fr/Basket/Actualites/La-nuit-des-bleus-en-nba-avec-sarr-et-coulibaly-washington-signe-une-belle-remontee-au-score-mais-perd-contre-phoenix/1532816',
      'https://www.lerugbynistere.fr/news/champions-cup-buros-out-jalibert-et-bielle-biarrey-pour-animer-la-composition-de-lubb-face-aux-sharks-1701251422.php',
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
