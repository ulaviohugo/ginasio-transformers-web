import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	ModalDelete,
	SaleEditor,
	SubMenu,
	SaleList
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { removeSaleStore } from '@/presentation/redux'
import { ProductSaleModel } from '@/domain/models'
import {
	makeRemoteAddSale,
	makeRemoteDeleteProductSale,
	makeRemoteLoadSales,
	makeRemoteUpdateProductSale
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'

export function Sales() {
	const user = useSelector(useAuth())

	const dispatch = useDispatch()

	const [selectedProductSale, setSelectedProductSale] = useState<ProductSaleModel>(
		{} as ProductSaleModel
	)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const clearSelectedSale = () => {
		setSelectedProductSale({} as any)
	}

	const handleOpenFormDelete = () => {
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedSale()
		setShowFormDelete(false)
	}

	const handleDeleteProductSale = async () => {
		try {
			await makeRemoteDeleteProductSale().delete(selectedProductSale.id)
			dispatch(removeSaleStore(selectedProductSale.id))
			toast.success(`A venda foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Layout title="Venda de produtos">
			{showFormDelete && (
				<ModalDelete
					entity="entrada"
					description={`Deseja realmente excluir o produto ${selectedProductSale?.product?.name} da venda?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDeleteProductSale}
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
				<div className="flex flex-col gap-2 mt-2">
					<SaleEditor
						data={selectedProductSale}
						addSale={makeRemoteAddSale()}
						updateProductSale={makeRemoteUpdateProductSale()}
						loadSales={makeRemoteLoadSales()}
						onClose={clearSelectedSale}
						onDelete={handleOpenFormDelete}
					/>

					<SaleList
						loadSales={makeRemoteLoadSales()}
						onSelectProductSale={setSelectedProductSale}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
