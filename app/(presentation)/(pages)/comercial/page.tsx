'use client'

import {
	IconProduct,
	IndexPage,
	Layout,
	LayoutBody,
	SubMenu,
	Title
} from '@/(presentation)/components'
import { SubmenuUtils } from '@/utils'

export default function Comercial() {
	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial} />
				<IndexPage>
					<IconProduct /> Área comercial
				</IndexPage>
			</LayoutBody>
		</Layout>
	)
}
