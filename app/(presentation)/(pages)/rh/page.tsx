'use client'

import {
	IconUser,
	IndexPage,
	Layout,
	LayoutBody,
	SubMenu
} from '@/app/(presentation)/components'
import { SubmenuUtils } from '@/app/utils'

export default function Comercial() {
	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.hr} />
				<IndexPage>
					<IconUser /> Área de recursos humanos
				</IndexPage>
			</LayoutBody>
		</Layout>
	)
}
