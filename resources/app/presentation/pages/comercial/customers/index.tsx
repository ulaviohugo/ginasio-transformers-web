import React, { useEffect, useState } from 'react'
import { CustomerModel } from '@/domain/models'
import {
	CardActions,
	CustomerEditor,
	IconEmail,
	IconPhone,
	IconUser,
	Layout,
	LayoutBody,
	ModalDelete,
	Spinner,
	SubMenu
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
import { NotFound } from '@/presentation/pages'

export function Customers() {
	const user = useSelector(useAuth())
	const isAdmin = user.role == 'Admin'

	const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel>(
		{} as CustomerModel
	)
	const [isLoading, setIsLoading] = useState(true)
	const [showFormDelete, setShowFormDelete] = useState(false)
	const customers = useSelector(useCustomers())
	const dispatch = useDispatch()

	const fetchData = async () => {
		if (!isAdmin) return setIsLoading(false)
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
					/>

					<fieldset>
						<legend>Filtro</legend>
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b font-semibold">
									<td className="px-1">Código</td>
									<td className="px-1">Nome</td>
									<td className="px-1">Data de nascimento</td>
									<td className="px-1">Mês aniversário</td>
									<td className="px-1">Telefone</td>
									<td className="px-1">Custo corte</td>
									<td className="px-1">Custo costura</td>
									<td className="px-1">Custo variável</td>
									<td className="px-1">Acabamento</td>
									<td className="px-1">Custo produção</td>
									<td className="px-1">Custo venda</td>
									<td className="px-1">Desconto</td>
									<td className="px-1">Total pago</td>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
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
											border
											className="mt-auto"
										/>
									</li>
								))}
							</ul>
						)}
					</fieldset>
				</div>
			</LayoutBody>
		</Layout>
	)
}
