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
import { SubmenuUtils } from '@/utils'
import { useSelector } from 'react-redux'

export default function Comercial() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	if (!isAdmin) return <NotFound />
	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.hr()} />
				<IndexPage>
					<IconUser /> Área de recursos humanos
				</IndexPage>
			</LayoutBody>
		</Layout>
	)
}
