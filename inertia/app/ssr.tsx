import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import { setLayout } from './helper'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })

      const pageRendered = pages[`../pages/${name}.tsx`]

      setLayout(name, pageRendered)

      return pageRendered
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
