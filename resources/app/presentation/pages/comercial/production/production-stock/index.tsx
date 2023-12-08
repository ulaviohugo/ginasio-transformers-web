import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	ModalDelete,
	ProductionStockEditor,
	ProductionStockList,
	SubMenu
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { StockModel } from '@/domain/models'
import {
	makeRemoteAddProductionStock,
	makeRemoteDeleteProductionStock,
	makeRemoteLoadProductionStocks,
	makeRemoteUpdateProductionStock
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'
import { NotFound } from '@/presentation/pages'
import { removeStockStore } from '@/presentation/redux'
import toast from 'react-hot-toast'

export function ProductionStock() {
	const dispatch = useDispatch()
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [showFormDelete, setShowFormDelete] = useState(false)

	const [selectedStock, setSelectedStock] = useState<StockModel>({} as StockModel)
	const clearSelectedStock = () => {
		setSelectedStock({} as StockModel)
	}

	const handleCloseDetail = () => {
		clearSelectedStock()
	}

	const handleOpenFormDelete = () => {
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteProductionStock().delete(selectedStock.id)
			dispatch(removeStockStore(selectedStock.id))
			toast.success(`O entrada foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	if (!isAdmin) return <NotFound />

	return (
		<Layout title="Entrada de produtos - Produção">
			{showFormDelete && (
				<ModalDelete
					entity="entrada"
					description={`Deseja realmente excluir o estoque de ${selectedStock.product?.name}`}
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
							data={selectedStock}
							onClose={handleCloseDetail}
							addStock={makeRemoteAddProductionStock()}
							updateStock={makeRemoteUpdateProductionStock()}
							onDelete={handleOpenFormDelete}
						/>
					</fieldset>
					<ProductionStockList
						loadStokes={makeRemoteLoadProductionStocks()}
						onSelectStock={setSelectedStock}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
