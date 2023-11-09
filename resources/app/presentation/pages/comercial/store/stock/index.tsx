import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	PurchaseEditor,
	SubMenu,
	StokeList
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { PurchaseModel } from '@/domain/models'
import {
	makeRemoteAddPurchase,
	makeRemoteDeletePurchase,
	makeRemoteLoadPurchases,
	makeRemoteUpdatePurchase
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'
import { NotFound } from '@/presentation/pages'

export function Stock() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(
		{} as PurchaseModel
	)

	const clearSelectedPurchase = () => {
		setSelectedPurchase({} as PurchaseModel)
	}

	const handleCloseDetail = () => {
		clearSelectedPurchase()
	}

	if (!isAdmin) return <NotFound />

	return (
		<Layout>
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
					<SubMenu
						submenus={[
							{ text: 'Compra', link: MenuUtils.FRONT.STORE_STOCK },
							{ text: 'Venda', link: MenuUtils.FRONT.STORE_SALES }
						]}
					/>
				</div>
				<div className="my-2">
					<fieldset>
						<legend>Cadastro de estoque</legend>
						<PurchaseEditor
							data={selectedPurchase}
							onClose={handleCloseDetail}
							addPurchase={makeRemoteAddPurchase()}
							updatePurchase={makeRemoteUpdatePurchase()}
							stockListComponent={
								<StokeList
									loadStokes={makeRemoteLoadPurchases()}
									deleteStokes={makeRemoteDeletePurchase()}
								/>
							}
						/>
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
