import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	ProductionStockEditor,
	SubMenu,
	ProductionStockList,
	ModalDelete
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { ProductionStockModel } from '@/domain/models'
import {
	makeRemoteAddProductionStock,
	makeRemoteDeleteProductionStock,
	makeRemoteLoadProductionStocks,
	makeRemoteUpdateProductionStock
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'
import { NotFound } from '@/presentation/pages'
import { removeProductionStockStore } from '@/presentation/redux'
import toast from 'react-hot-toast'

export function ProductionStock() {
	const dispatch = useDispatch()
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [showFormDelete, setShowFormDelete] = useState(false)

	const [selectedProductionStock, setSelectedProductionStock] =
		useState<ProductionStockModel>({} as ProductionStockModel)
	const clearSelectedProductionStock = () => {
		setSelectedProductionStock({} as ProductionStockModel)
	}

	const handleCloseDetail = () => {
		clearSelectedProductionStock()
	}

	const handleOpenFormDelete = () => {
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteProductionStock().delete(selectedProductionStock.id)
			dispatch(removeProductionStockStore(selectedProductionStock.id))
			toast.success(`O entrada foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	if (!isAdmin) return <NotFound />

	return (
		<Layout title="Compra de produtos">
			{showFormDelete && (
				<ModalDelete
					entity="entrada"
					description={`Deseja realmente excluir o estoque de ${selectedProductionStock.product?.name}`}
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
							{ text: 'Compra', link: MenuUtils.FRONT.PRODUCTION_STOCK },
							{ text: 'Venda', link: MenuUtils.FRONT.PRODUCTION_SALES }
						]}
					/>
				</div>
				<div className="flex flex-col gap-2 my-2">
					<fieldset>
						<legend>Cadastro de estoque</legend>
						<ProductionStockEditor
							data={selectedProductionStock}
							onClose={handleCloseDetail}
							addProductionStock={makeRemoteAddProductionStock()}
							updateProductionStock={makeRemoteUpdateProductionStock()}
							onDelete={handleOpenFormDelete}
						/>
					</fieldset>
					<ProductionStockList
						loadStokes={makeRemoteLoadProductionStocks()}
						onSelectProductionStock={setSelectedProductionStock}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
