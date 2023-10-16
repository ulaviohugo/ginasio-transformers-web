import {
	IconBudget,
	Layout,
	LayoutBody,
	ProductionBudgetEditor,
	SubMenu,
	Title
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { MenuUtils } from '@/utils'
import React from 'react'
import { useSelector } from 'react-redux'

export function ProductionBudgets() {
	const user = useSelector(useAuth())

	fetch('', { redirect: 'follow' })
	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
					<Title title="Orçamento" icon={IconBudget} />
					<ProductionBudgetEditor />
				</div>
			</LayoutBody>
		</Layout>
	)
}
