import React from 'react'
import {
	IconUser,
	IndexPage,
	Layout,
	LayoutBody,
	SubMenu
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { NotFound } from '@/presentation/pages'
import { MenuUtils } from '@/utils'
import { useSelector } from 'react-redux'

export function HumanResource() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	if (!isAdmin) return <NotFound />
	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={MenuUtils.hrMenuItens()} />
				<IndexPage>
					<IconUser /> Área de recursos humanos
				</IndexPage>
			</LayoutBody>
		</Layout>
	)
}
