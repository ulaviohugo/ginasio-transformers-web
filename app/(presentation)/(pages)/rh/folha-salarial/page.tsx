import { Layout, LayoutBody, SubMenu, Title } from '@/app/(presentation)/components'
import { SalaryReceiptTemplate } from '@/app/(presentation)/components/templates-pdf'
import { SubmenuUtils } from '@/app/utils'
import React from 'react'

export default function FolhaSalarial() {
	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={SubmenuUtils.hr} />
					<Title title="Folha salarial" />
					<SalaryReceiptTemplate />
				</div>
			</LayoutBody>
		</Layout>
	)
}
