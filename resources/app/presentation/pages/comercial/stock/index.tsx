import React from 'react'
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
} from '@/main/factories/usecases/remote'
import { SubmenuUtils } from '@/utils'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export function Stock() {
	const user = useSelector(useAuth())
	const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(
		{} as PurchaseModel
	)

	const clearSelectedPurchase = () => {
		setSelectedPurchase({} as PurchaseModel)
	}

	const handleCloseDetail = () => {
		clearSelectedPurchase()
	}

	return (
		<Layout>
			<LayoutBody>
				<SubMenu submenus={SubmenuUtils.commercial({ role: user.role })} />
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