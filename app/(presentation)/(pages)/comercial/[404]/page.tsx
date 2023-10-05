import React from 'react'
import { Metadata } from 'next'
import { Layout, LayoutBody, SubMenu } from '@/(presentation)/components'
import { SubmenuUtils } from '@/utils'

export const metadata: Metadata = {
	title: 'Página não encontrada'
}
export default function NotFound() {
	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial()} />
				<div className="flex-1 flex justify-center items-center text-lg md:text-3xl">
					Página não encontrada!
				</div>
			</LayoutBody>
		</Layout>
	)
}
