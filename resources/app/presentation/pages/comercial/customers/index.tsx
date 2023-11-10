import React, { useEffect, useState } from 'react'
import { CustomerModel } from '@/domain/models'
import {
	CustomerEditor,
	CustomerFilterProps,
	CustomerList,
	Layout,
	LayoutBody,
	ModalDelete,
	SubMenu
} from '@/presentation/components'
import { MenuUtils } from '@/utils'
import { toast } from 'react-hot-toast'
import {
	makeRemoteDeleteCustomer,
	makeRemoteUpdateCustomer,
	makeRemoteAddCustomer,
	makeRemoteLoadCustomers
} from '@/main/factories/usecases'
import { loadCustomerStore, removeCustomerStore } from '@/presentation/redux'
import { useDispatch, useSelector } from 'react-redux'

import { useAuth } from '@/presentation/hooks'
import { NotFound } from '@/presentation/pages'
import { QueryParams } from '@/data/protocols'

export function Customers() {
	const dispatch = useDispatch()
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel>(
		{} as CustomerModel
	)
	const [isLoading, setIsLoading] = useState(true)
	const [showFormDelete, setShowFormDelete] = useState(false)

	const [filteredCustomers, setFilteredCustomers] = useState<CustomerModel[]>([])

	const fetchData = async (queryParams?: QueryParams) => {
		if (!isAdmin) return setIsLoading(false)
		try {
			const httpResponse = await makeRemoteLoadCustomers().load(queryParams)
			if (!queryParams) dispatch(loadCustomerStore(httpResponse))
			setFilteredCustomers(httpResponse)
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const clearSelectedCustomer = () => {
		setSelectedCustomer({} as CustomerModel)
	}

	const handleOpenFormDelete = (customer: CustomerModel) => {
		if (!customer?.id) return toast.error('Selecione um registo para excluir')
		setSelectedCustomer(customer)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteCustomer().delete(selectedCustomer.id)
			dispatch(removeCustomerStore(selectedCustomer.id))
			toast.success(`Cliente ${selectedCustomer.name} foi excluído`)
			handleCloseFormDelete()
			clearSelectedCustomer()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	const handleFilter = async (filter: CustomerFilterProps) => fetchData(filter)

	if (!isAdmin) return <NotFound />

	return (
		<Layout>
			{showFormDelete && (
				<ModalDelete
					entity="cliente"
					description={`Deseja realmente excluir ${selectedCustomer.name}?`}
					show={showFormDelete}
					onClose={handleCloseFormDelete}
					onSubmit={handleDelete}
				/>
			)}
			<LayoutBody>
				<div className="flex flex-col gap-2">
					<SubMenu submenus={MenuUtils.commercialMenuItens({ role: user.role })} />

					<CustomerEditor
						customer={selectedCustomer}
						addCustomer={makeRemoteAddCustomer()}
						updateCustomer={makeRemoteUpdateCustomer()}
						onDelete={() => handleOpenFormDelete(selectedCustomer)}
					/>
					<CustomerList
						isLoading={isLoading}
						onSelectCustomer={setSelectedCustomer}
						onFilter={handleFilter}
						onClearFilter={fetchData}
						filteredCustomers={filteredCustomers}
					/>
				</div>
			</LayoutBody>
		</Layout>
	)
}
