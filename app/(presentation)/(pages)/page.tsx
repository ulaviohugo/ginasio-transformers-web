import { Metadata } from 'next'
import { Layout, LayoutBody } from '../components'

export const metadata: Metadata = {
  title: 'Sistema de Facuturação WO',
}

export default function Home() {
  return (
    <Layout>
      <LayoutBody>Página home</LayoutBody>
    </Layout>
  )
}
