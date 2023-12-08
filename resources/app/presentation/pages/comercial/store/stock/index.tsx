import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	StockEditor,
	SubMenu,
	StockList,
	ModalDelete
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
import { removeStockStore } from '@/presentation/redux'
import toast from 'react-hot-toast'

export function Stock() {
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
			await makeRemoteDeleteStock().delete(selectedStock.id)
			dispatch(removeStockStore(selectedStock.id))
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
							{ text: 'Compra', link: MenuUtils.FRONT.STORE_STOCK },
							{ text: 'Venda', link: MenuUtils.FRONT.STORE_SALES }
						]}
					/>
				</div>
				<div className="flex flex-col gap-2 my-2">
					<fieldset>
						<legend>Cadastro de estoque</legend>
						<StockEditor
							data={selectedStock}
							onClose={handleCloseDetail}
							addStock={makeRemoteAddStock()}
							updateStock={makeRemoteUpdateStock()}
							onDelete={handleOpenFormDelete}
						/>
					</fieldset>
					<StockList
						loadStokes={makeRemoteLoadStocks()}
						onSelectStock={setSelectedStock}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
