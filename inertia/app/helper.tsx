import { Layout } from '~/components/layout'

export function setLayout(page: any) {
  page.default.layout = page.default.layout || ((page) => <Layout children={page} />)
}
