import React from 'react'
import { Metadata } from 'next'
import { HRMenu } from '../components'
import { Layout, LayoutBody } from '@/app/(presentation)/components'

export const metadata: Metadata = {
  title: 'Página não encontrada',
}
export default function NotFound() {
  return (
    <Layout>
      <LayoutBody>
        <HRMenu />
        <div className="flex justify-center items-center h-full text-lg md:text-3xl">
          Página não encontrada!
        </div>
      </LayoutBody>
    </Layout>
  )
}
