'use client'

import {
	IconProduct,
	IndexPage,
	Layout,
	LayoutBody,
	SubMenu,
	Title
} from '@/app/(presentation)/components'
import { SubmenuUtils } from '@/app/utils'

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
