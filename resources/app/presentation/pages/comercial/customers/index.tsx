import React, { useEffect, useState } from 'react'
import { CustomerModel } from '@/domain/models'
import {
	CardActions,
	CustomerEditor,
	IconEmail,
	IconPhone,
	IconPlus,
	IconSearch,
	IconUser,
	Input,
	Layout,
	LayoutBody,
	ModalDelete,
	Spinner,
	SubMenu,
	Title
} from '@/presentation/components'
import { NumberUtils, MenuUtils } from '@/utils'
import { toast } from 'react-hot-toast'
import {
	makeRemoteDeleteCustomer,
	makeRemoteUpdateCustomer,
	makeRemoteAddCustomer,
	makeRemoteLoadCustomers
} from '@/main/factories/usecases'
import { loadCustomerStore, removeCustomerStore } from '@/presentation/redux'
import { useDispatch, useSelector } from 'react-redux'

import { useAuth, useCustomers } from '@/presentation/hooks'

export function Customers() {
	const user = useSelector(useAuth())

	const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel>(
		{} as CustomerModel
	)
	const [isLoading, setIsLoading] = useState(true)
	const [showEditor, setShowEditor] = useState(false)
	const [showFormDelete, setShowFormDelete] = useState(false)
	const customers = useSelector(useCustomers())
	const dispatch = useDispatch()

	const fetchData = async () => {
		try {
			const httpResponse = await makeRemoteLoadCustomers().load()
			dispatch(loadCustomerStore(httpResponse))
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

	const handleCloseDetail = () => {
		clearSelectedCustomer()
		setShowEditor(false)
	}

	const handleOpenDetalhe = (customer?: CustomerModel) => {
		if (customer) setSelectedCustomer(customer)
		setShowEditor(true)
	}

	const handleOpenFormDelete = (customer: CustomerModel) => {
		setSelectedCustomer(customer)
		setShowFormDelete(true)
	}

	const handleCloseFormDelete = () => {
		clearSelectedCustomer()
		setShowFormDelete(false)
	}

	const handleDelete = async () => {
		try {
			await makeRemoteDeleteCustomer().delete(selectedCustomer.id)
			dispatch(removeCustomerStore(selectedCustomer.id))
			toast.success(`Cliente ${selectedCustomer.name} foi excluído`)
			handleCloseFormDelete()
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<Layout>
			{showEditor && (
				<CustomerEditor
					customer={selectedCustomer}
					show={showEditor}
					onClose={handleCloseDetail}
					addCustomer={makeRemoteAddCustomer()}
					updateCustomer={makeRemoteUpdateCustomer()}
				/>
			)}
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
					<Title
						title={`Clientes ${isLoading ? '' : `(${customers?.length})`}`}
						icon={IconUser}
					/>
					<div className="flex items-center gap-2">
						<button
							className="bg-primary px-2 py-1 rounded-md text-gray-200"
							title="Novo cliente"
							onClick={() => handleOpenDetalhe()}
						>
							<IconPlus />
						</button>
						<div className="w-full max-w-xs">
							<Input placeholder="Pesquisar por ID, nome e e-mail" icon={IconSearch} />
						</div>
					</div>
					{isLoading ? (
						<Spinner data="Carregando clientes..." />
					) : customers?.length < 1 ? (
						<div>Nenhum cliente de momento.</div>
					) : (
						<ul className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
							{customers.map((customer) => (
								<li key={customer.id} className="flex flex-col p-4 shadow">
									<div className="flex items-center gap-1">
										{customer.photo ? (
											<img
												src={customer.photo}
												alt={`Foto de perfil`}
												width={50}
												height={50}
												className="rounded-full object-cover aspect-square"
											/>
										) : (
											<IconUser size={50} />
										)}
										<div>
											<div className="font-semibold">{customer.name}</div>
											{customer.phone && (
												<div className="flex items-center gap-1 text-sm font-normal">
													<IconPhone />
													{NumberUtils.format(customer.phone)}
												</div>
											)}
										</div>
									</div>
									{customer.email && (
										<div className="flex items-center gap-1 text-sm font-normal">
											<IconEmail />
											<a href={`mailto:${customer.email}`} className="link">
												{customer.email}
											</a>
										</div>
									)}
									<CardActions
										onClickDelete={() => handleOpenFormDelete(customer)}
										onClickEdit={() => handleOpenDetalhe(customer)}
										border
										className="mt-auto"
									/>
								</li>
							))}
						</ul>
					)}
				</div>
			</LayoutBody>
		</Layout>
	)
}
