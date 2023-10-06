import React from 'react'
import {
	IconProduct,
	IndexPage,
	Layout,
	LayoutBody,
	SubMenu
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { SubmenuUtils } from '@/utils'
import { useSelector } from 'react-redux'

export function Comercial() {
	const user = useSelector(useAuth())

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
