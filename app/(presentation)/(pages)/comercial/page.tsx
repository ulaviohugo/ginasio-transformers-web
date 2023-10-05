'use client'

import {
	IconProduct,
	IndexPage,
	Layout,
	LayoutBody,
	SubMenu,
	Title
} from '@/(presentation)/components'
import { useAuth } from '@/(presentation)/hooks'
import { SubmenuUtils } from '@/utils'
import { useSelector } from 'react-redux'

export default function Comercial() {
	const user = useSelector(useAuth())
	const isAdmin = user?.role == 'Admin'

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial({ role: user.role })} />
				<IndexPage>
					<IconProduct /> Área comercial
				</IndexPage>
			</LayoutBody>
		</Layout>
	)
}
