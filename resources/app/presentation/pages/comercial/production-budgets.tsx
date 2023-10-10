import { IconBudget, Layout, LayoutBody, SubMenu, Title } from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { MenuUtils } from '@/utils'
import React from 'react'
import { useSelector } from 'react-redux'

export function ProductionBudgets() {
	const user = useSelector(useAuth())
	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
					<Title title="Orçamento" icon={IconBudget} />
				</div>
			</LayoutBody>
		</Layout>
	)
}
