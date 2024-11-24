import { Layout } from '~/components/layout'

export function setLayout(name: string, page: any) {
  if (!page.default) {
    throw new Error(`Page ${name} does not have a default export`)
  }

  if (page.default.layout) {
    return
  }

  page.default.layout = <Layout children={page} />
}
