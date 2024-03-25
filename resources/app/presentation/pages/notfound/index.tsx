import { Layout, LayoutBody } from '@/presentation/components'
import React from 'react'

export function NotFound() {
	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col h-full justify-center items-center text-2xl">
					Não tem permissão para acessar essa página
				</div>
			</LayoutBody>
		</Layout>
	)
}
