import React, { useEffect, useState } from 'react'
import { SupplierModel } from '@/domain/models'
import {
	SupplierEditor,
	Layout,
	LayoutBody,
	ModalDelete,
	SubMenu,
	SupplierList,
	SupplierFilterProps
} from '@/presentation/components'
import { MenuUtils } from '@/utils'
import { toast } from 'react-hot-toast'
import {
	makeRemoteDeleteSupplier,
	makeRemoteUpdateSupplier,
	makeRemoteAddSupplier,
	makeRemoteLoadSuppliers
} from '@/main/factories/usecases'
import { loadSupplierStore, removeSupplierStore } from '@/presentation/redux'
import { useDispatch, useSelector } from 'react-redux'

import { useAuth, useSuppliers } from '@/presentation/hooks'
import { NotFound } from '@/presentation/pages'
import { QueryParams } from '@/data/protocols'

export function Suppliers() {
	const dispatch = useDispatch()
	const user = useSelector(useAuth())
	const suppliers = useSelector(useSuppliers())
	const isAdmin = user.role == 'Admin'

	const [isLoading, setIsLoading] = useState(true)
	const [showFormDelete, setShowFormDelete] = useState(false)
	const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierModel[]>(suppliers)

	const [selectedSupplier, setSelectedSupplier] = useState<SupplierModel>(
		{} as SupplierModel
	)

	const fetchData = async (queryParams?: QueryParams) => {
		if (!isAdmin) return setIsLoading(false)
		try {
			const httpResponse = await makeRemoteLoadSuppliers().load(queryParams)
			if (!queryParams) dispatch(loadSupplierStore(httpResponse))
			setFilteredSuppliers(httpResponse)
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		setFilteredSuppliers(suppliers)
	}, [suppliers])

	const clearSelectedSupplier = () => {
		// setSelectedSupplier({} as SupplierModel)
	}

	const handleOpenFormDelete = (supplier: SupplierModel) => {
		setSelectedSupplier(supplier)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedSupplier()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteSupplier().delete(selectedSupplier.id)
			dispatch(removeSupplierStore(selectedSupplier.id))
			toast.success(`Fornecedor(a) ${selectedSupplier.name} foi excluído`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	const handleFilter = async (filter: SupplierFilterProps) => fetchData(filter)

	if (!isAdmin) return <NotFound />

	return (
		<Layout>
			{showFormDelete && (
				<ModalDelete
					entity="fornecedor"
					description={`Deseja realmente excluir ${selectedSupplier.name}?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />
					<SupplierEditor
						supplier={selectedSupplier}
						addSupplier={makeRemoteAddSupplier()}
						updateSupplier={makeRemoteUpdateSupplier()}
						onDelete={() => handleOpenFormDelete(selectedSupplier)}
					/>
					<SupplierList
						filteredSuppliers={filteredSuppliers}
						isLoading={isLoading}
						onClearFilter={fetchData}
						onFilter={handleFilter}
						onSelectSupplier={setSelectedSupplier}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
