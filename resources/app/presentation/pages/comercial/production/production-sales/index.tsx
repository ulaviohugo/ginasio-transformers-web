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
import { SaleModel } from '@/domain/models'
import {
	makeRemoteAddSale,
	makeRemoteDeleteSale,
	makeRemoteLoadSales
} from '@/main/factories/usecases'
import { MenuUtils } from '@/utils'

export function ProductionSales() {
	const user = useSelector(useAuth())

	const dispatch = useDispatch()

	const [selectedSale, setSelectedSale] = useState<SaleModel>({} as SaleModel)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const clearSelectedSale = () => {
		setSelectedSale({} as SaleModel)
	}

	const handleCloseFormDelete = () => {
		clearSelectedSale()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteSale().delete(selectedSale.id)
			dispatch(removeSaleStore(selectedSale.id))
			toast.success(`A venda foi excluída`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

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
							{ text: 'Entrada', link: MenuUtils.FRONT.PRODUCTION_STOCK },
							{ text: 'Saída', link: MenuUtils.FRONT.PRODUCTION_SALES }
						]}
					/>
				</div>
				<div className="flex flex-col gap-2 mt-2">
					<fieldset>
						<legend>Cadastro de venda</legend>
						<SaleEditor
							// data={selectedSale}
							addSale={makeRemoteAddSale()}
							loadSales={makeRemoteLoadSales()}
						/>
					</fieldset>

					<SaleList loadSales={makeRemoteLoadSales()} />
				</div>
			</LayoutBody>
		</Layout>
	)
}
