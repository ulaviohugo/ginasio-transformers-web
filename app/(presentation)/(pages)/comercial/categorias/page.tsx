'use client'

import { Layout, LayoutBody, SubMenu, Title } from '@/app/(presentation)/components'
import { SubmenuUtils } from '@/app/utils'

export default function Categorias() {
	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.commercial} />
					<Title title={`Comercial`} />
				</div>
			</LayoutBody>
		</Layout>
	)
}
