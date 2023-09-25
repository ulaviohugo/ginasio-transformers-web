'use client'

import {
	IconSearch,
	Input,
	Layout,
	LayoutBody,
	NoData,
	PurchaseEditor,
	Spinner,
	SubMenu,
	Title,
	IconStock,
	StokeList
} from '@/(presentation)/components'
import { usePurchases } from '@/(presentation)/hooks'
import { PurchaseModel } from '@/domain/models'
import {
	makeRemoteAddPurchase,
	makeRemoteDeletePurchase,
	makeRemoteLoadPurchases,
	makeRemoteUpdatePurchase
} from '@/main/factories/usecases/remote'
import { SubmenuUtils } from '@/utils'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function Entradas() {
	const dispatch = useDispatch()
	const purchases = usePurchases()
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
				<SubMenu submenus={SubmenuUtils.commercial} />
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
