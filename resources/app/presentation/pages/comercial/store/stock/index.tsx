import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	PurchaseEditor,
	SubMenu,
	StokeList,
	ModalDelete
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
import { removePurchaseStore } from '@/presentation/redux'
import toast from 'react-hot-toast'

export function Stock() {
	const dispatch = useDispatch()
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [showFormDelete, setShowFormDelete] = useState(false)

	const [selectedPurchase, setSelectedPurchase] = useState<PurchaseModel>(
		{} as PurchaseModel
	)
	const clearSelectedPurchase = () => {
		setSelectedPurchase({} as PurchaseModel)
	}

	const handleCloseDetail = () => {
		clearSelectedPurchase()
	}

	const handleOpenDetalhe = (purchase?: PurchaseModel) => {
		if (purchase) setSelectedPurchase(purchase)
	}

	const handleCloseFormDelete = () => {
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeletePurchase().delete(selectedPurchase.id)
			dispatch(removePurchaseStore(selectedPurchase.id))
			toast.success(`O entrada foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	if (!isAdmin) return <NotFound />

	return (
		<Layout>
			{showFormDelete && (
				<ModalDelete
					entity="entrada"
					description={`Deseja realmente excluir o registo?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}
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
				<div className="flex flex-col gap-2 my-2">
					<fieldset>
						<legend>Cadastro de estoque</legend>
						<PurchaseEditor
							data={selectedPurchase}
							onClose={handleCloseDetail}
							addPurchase={makeRemoteAddPurchase()}
							updatePurchase={makeRemoteUpdatePurchase()}
							onDelete={handleOpenDetalhe}
						/>
					</fieldset>
					<StokeList
						loadStokes={makeRemoteLoadPurchases()}
						onSelectStock={setSelectedPurchase}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
