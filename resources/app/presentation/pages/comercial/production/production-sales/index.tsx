import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import {
	Layout,
	LayoutBody,
	ModalDelete,
	ProductionSaleEditor,
	SubMenu,
	ProductionSaleList
} from '@/presentation/components'
import { useAuth } from '@/presentation/hooks'
import { removeProductionSaleStore } from '@/presentation/redux'
import { ProductionProductSaleModel, ProductionSaleModel } from '@/domain/models'
import {
	makeRemoteAddProductionSale,
	makeRemoteDeleteProductionProductSale,
	makeRemoteLoadProductionSales,
	makeRemoteUpdateProductionProductSale
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'

export function ProductionSales() {
	const user = useSelector(useAuth())

	const dispatch = useDispatch()

	const [selectedProductSale, setSelectedProductSale] = useState<ProductionSaleModel>(
		{} as ProductionSaleModel
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
			await makeRemoteDeleteProductionProductSale().delete(selectedProductSale.id)
			dispatch(removeProductionSaleStore(selectedProductSale.id))
			toast.success(`A venda foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	const handleSelectProductionSale = (saleProduct: ProductionSaleModel) => {
		setSelectedProductSale(saleProduct)
	}

	return (
		<Layout title="Venda de produtos">
			{showFormDelete && (
				<ModalDelete
					entity="entrada"
					description={`Deseja realmente excluir a produção de ${selectedProductSale?.end_product}?`}
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
							{ text: 'Entrada', link: MenuUtils.FRONT.PRODUCTION_STOCK },
							{ text: 'Saída', link: MenuUtils.FRONT.PRODUCTION_SALES }
						]}
					/>
				</div>
				<div className="flex flex-col gap-2 mt-2">
					<ProductionSaleEditor
						data={selectedProductSale}
						addSale={makeRemoteAddProductionSale()}
						updateProductSale={makeRemoteUpdateProductionProductSale()}
						loadSales={makeRemoteLoadProductionSales()}
						onClose={clearSelectedSale}
						onDelete={handleOpenFormDelete}
					/>

					<ProductionSaleList
						loadSales={makeRemoteLoadProductionSales()}
						onSelectProductSale={handleSelectProductionSale}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
