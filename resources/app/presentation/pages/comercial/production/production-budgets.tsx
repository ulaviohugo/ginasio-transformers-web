import { ProductionBudgetModel } from '@/domain/models'
import { makeRemoteLoadProductionBudgets } from '@/main/factories'
import {
	IconBudget,
	Layout,
	LayoutBody,
	ProductionBudgetEditor,
	ProductionBudgetList,
	SubMenu,
	Title
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { MenuUtils } from '@/utils'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export function ProductionBudgets() {
	const user = useSelector(useAuth())

	const [selectedBudget, setSelectedBudget] = useState<ProductionBudgetModel>({} as any)

	const handleSelectBudget = async (selectedBudget: ProductionBudgetModel) => {
		setSelectedBudget(selectedBudget)
	}

	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
					<Title title="Orçamento" icon={IconBudget} />
					<ProductionBudgetEditor selectedBudget={selectedBudget} />

					<ProductionBudgetList
						loadProductionBudgets={makeRemoteLoadProductionBudgets()}
						onSelectBudget={handleSelectBudget}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
