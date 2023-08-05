import React from 'react'
import { Layout, LayoutBody } from './components'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}
export default function NotFound() {
  return (
    <Layout>
      <LayoutBody>
        <div className="flex justify-center items-center h-full text-lg md:text-3xl">
          Página não encontrada!
        </div>
      </LayoutBody>
    </Layout>
  )
}