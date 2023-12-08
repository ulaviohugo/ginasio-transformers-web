import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	SubMenu,
	ModalDelete,
	ProductionStockEditor,
	ProductionStockList
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { StockModel } from '@/domain/models'
import {
	makeRemoteAddStock,
	makeRemoteDeleteStock,
	makeRemoteLoadStocks,
	makeRemoteUpdateStock
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'
import { NotFound } from '@/presentation/pages'
import { removePurchaseStore } from '@/presentation/redux'
import toast from 'react-hot-toast'

export function ProductionStock() {
	const dispatch = useDispatch()
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [showFormDelete, setShowFormDelete] = useState(false)

	const [selectedPurchase, setSelectedPurchase] = useState<StockModel>({} as StockModel)
	const clearSelectedPurchase = () => {
		setSelectedPurchase({} as StockModel)
	}

	const handleCloseDetail = () => {
		clearSelectedPurchase()
	}

	const handleOpenFormDelete = () => {
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteStock().delete(selectedPurchase.id)
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
					description={`Deseja realmente excluir o estoque de ${selectedPurchase.product?.name}`}
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
							{ text: 'Entrada', link: MenuUtils.FRONT.PRODUCTION_STOCK },
							{ text: 'Saída', link: MenuUtils.FRONT.PRODUCTION_SALES }
						]}
					/>
				</div>
				<div className="flex flex-col gap-2 my-2">
					<fieldset>
						<legend>Cadastro de estoque</legend>
						<ProductionStockEditor
							data={selectedPurchase}
							onClose={handleCloseDetail}
							addPurchase={makeRemoteAddStock()}
							updatePurchase={makeRemoteUpdateStock()}
							onDelete={handleOpenFormDelete}
						/>
					</fieldset>
					<ProductionStockList
						loadStokes={makeRemoteLoadStocks()}
						onSelectStock={setSelectedPurchase}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
